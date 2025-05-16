import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Card } from './card.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators/core';

@ApiTags('cards')
@Controller('cards')
@UseGuards(JwtAuthGuard)

export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Cartão criado com sucesso', type: Card })
  async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.create(createCardDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Lista de cartões', type: [Card] })
  async findAll(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Cartão encontrado', type: Card })
  @ApiNotFoundResponse({ description: 'Cartão não encontrado' })
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Cartão atualizado', type: Card })
  @ApiNotFoundResponse({ description: 'Cartão não encontrado' })
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Cartão removido' })
  @ApiNotFoundResponse({ description: 'Cartão não encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.cardService.remove(id);
  }
}
