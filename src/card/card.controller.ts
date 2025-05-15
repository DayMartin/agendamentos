import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Card } from './card.entity';

@ApiTags('cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Cartão criado com sucesso', type: Card })
  async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.create(createCardDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de cartões', type: [Card] })
  async findAll(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Cartão encontrado', type: Card })
  @ApiNotFoundResponse({ description: 'Cartão não encontrado' })
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Cartão atualizado', type: Card })
  @ApiNotFoundResponse({ description: 'Cartão não encontrado' })
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Cartão removido' })
  @ApiNotFoundResponse({ description: 'Cartão não encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.cardService.remove(id);
  }
}
