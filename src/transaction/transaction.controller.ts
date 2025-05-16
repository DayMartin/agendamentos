import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Transaction } from './transaction.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators/core';

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Transação criada com sucesso', type: Transaction })
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Lista de transações', type: [Transaction] })
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Transação encontrada', type: Transaction })
  @ApiNotFoundResponse({ description: 'Transação não encontrada' })
  async findOne(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.findOne(id);
  }

  @Get('from-account/:fromAccountId')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Transações encontradas', type: [Transaction] })
  @ApiNotFoundResponse({ description: 'Nenhuma transação encontrada para essa conta' })
  async findByFromAccountId(@Param('fromAccountId') fromAccountId: string): Promise<Transaction[]> {
    return this.transactionService.findByFromAccountId(fromAccountId);
  }
}
