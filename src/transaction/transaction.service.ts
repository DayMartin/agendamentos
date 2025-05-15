import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Account } from '../account/account.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @InjectRepository(Account)
    private accountRepository: Repository<Account>,

    private dataSource: DataSource,
  ) {}

  async create(data: CreateTransactionDto): Promise<Transaction> {
    return this.dataSource.transaction(async (manager) => {
      const fromAccount = await manager.findOne(Account, { where: { id: data.from_account_id } });
      if (!fromAccount) {
        throw new NotFoundException('Conta de origem não encontrada');
      }

      if (fromAccount.balance < data.amount) {
        throw new BadRequestException('Saldo insuficiente');
      }

        let toAccount: Account | null = null;
        if (data.to_account_id) {
        toAccount = await manager.findOne(Account, { where: { id: data.to_account_id } });
        if (!toAccount) {
            throw new NotFoundException('Conta de destino não encontrada');
        }
        }


      fromAccount.balance -= data.amount;
      await manager.save(fromAccount);

      if (toAccount) {
        toAccount.balance += data.amount;
        await manager.save(toAccount);
      }

      const transaction = this.transactionRepository.create(data);
      return manager.save(transaction);
    });
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) {
      throw new NotFoundException(`Transação com id ${id} não encontrada`);
    }
    return transaction;
  }
}
