import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, BadRequestException, UnauthorizedException, UseGuards, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso', type: User })
  @ApiBadRequestResponse({ description: 'Erro ao criar usuário' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException('Não foi possível criar o usuário.');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Consultar uma lista de usuários' })
  @ApiOkResponse({ description: 'Lista de usuários', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por id' })
  @ApiOkResponse({ description: 'Usuário encontrado', type: User })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados do usuário' })
  @ApiOkResponse({ description: 'Usuário atualizado', type: User })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'Erro ao atualizar usuário' })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userService.update(id, updateUserDto);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Não foi possível atualizar o usuário.');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiOkResponse({ description: 'Usuário removido' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  async removeUser(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }

}
