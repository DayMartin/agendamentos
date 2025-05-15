// account.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Conta criada com sucesso', type: Account })
  async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de contas', type: [Account] })
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Conta encontrada', type: Account })
  @ApiNotFoundResponse({ description: 'Conta não encontrada' })
  async findOne(@Param('id') id: string): Promise<Account> {
    return this.accountService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Conta atualizada', type: Account })
  @ApiNotFoundResponse({ description: 'Conta não encontrada' })
  async updateAccount(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<Account> {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Conta removida' })
  @ApiNotFoundResponse({ description: 'Conta não encontrada' })
  async removeAccount(@Param('id') id: string): Promise<void> {
    return this.accountService.remove(id);
  }
}
