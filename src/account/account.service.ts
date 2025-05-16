// account.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(data: CreateAccountDto): Promise<Account> {
    const account = this.accountRepository.create(data);
    return this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id }, relations: ['user'] });
    if (!account) {
      throw new NotFoundException(`Conta com id ${id} não encontrada`);
    }
    return account;
  }

  async findByUserId(user_id: string): Promise<Account[]> {
    const accounts = await this.accountRepository.find({
      where: { user_id },
      relations: ['user'],
    });

    if (accounts.length === 0) {
      throw new NotFoundException(`Nenhuma conta encontrada para o usuário com id ${user_id}`);
    }
    return accounts;
  }


  async update(id: string, data: UpdateAccountDto): Promise<Account> {
    const account = await this.findOne(id);
    Object.assign(account, data);
    return this.accountRepository.save(account);
  }

  async remove(id: string): Promise<void> {
    const account = await this.findOne(id);
    await this.accountRepository.remove(account);
  }
}
