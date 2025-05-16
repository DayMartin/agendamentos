import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Maria Silva', description: 'Nome do usuário' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({ example: 'maria@email.com', description: 'Email do usuário' })
  @IsEmail({}, { message: 'Deve ser um email válido' })
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @ApiProperty({ example: '44468598740', description: 'CPF do usuário' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @MinLength(11, { message: 'O CPF deve ter no mínimo 6 caracteres' })
  cpf: string;

  @ApiProperty({ example: '11991845698', description: 'Número de celular do usuário' })
  @IsNotEmpty({ message: 'O Número de celular é obrigatório' })
  @MinLength(11, { message: 'O número de celular deve conter 11 caracteres ddd+número' })
  phone: string;
}
