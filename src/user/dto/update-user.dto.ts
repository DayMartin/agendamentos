import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Maria Silva' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'maria@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'novaSenha123' })
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ example: '48569853645' })
  @MinLength(11)
  @IsOptional()
  cpf?: string;

  @ApiPropertyOptional({ example: '15996596875' })
  @MinLength(11)
  @IsOptional()
  phone?: string;
}
