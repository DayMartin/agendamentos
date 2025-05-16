// account.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators/core';

@ApiTags('accounts')
@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova conta para um usuário' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Conta criada com sucesso', type: Account })
  async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar contas' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Lista de contas', type: [Account] })
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma conta por id' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Conta encontrada', type: Account })
  @ApiNotFoundResponse({ description: 'Conta não encontrada' })
  async findOne(@Param('id') id: string): Promise<Account> {
    return this.accountService.findOne(id);
  }

  @Get('user/:user_id')
  @ApiOperation({ summary: 'Buscas contas de um usuário' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Contas do usuário encontradas', type: [Account] })
  @ApiNotFoundResponse({ description: 'Contas não encontradas para esse usuário' })
  async findByUserId(@Param('user_id') user_id: string): Promise<Account[]> {
    return this.accountService.findByUserId(user_id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados de uma conta' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Conta atualizada', type: Account })
  @ApiNotFoundResponse({ description: 'Conta não encontrada' })
  async updateAccount(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<Account> {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma conta' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Conta removida' })
  @ApiNotFoundResponse({ description: 'Conta não encontrada' })
  async removeAccount(@Param('id') id: string): Promise<void> {
    return this.accountService.remove(id);
  }
}
