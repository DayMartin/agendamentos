import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsIn, IsNumber, Min } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ example: 'uuid-do-usuario', description: 'ID do usuário dono da conta' })
  @IsUUID()
  user_id: string;

  @ApiProperty({ example: 'corrente', description: 'Tipo da conta' })
  @IsIn(['corrente', 'poupanca', 'investimento'])
  account_type: string;

  @ApiProperty({ example: '1234567890', description: 'Número da conta' })
  @IsNotEmpty()
  account_number: string;

  @ApiProperty({ example: 0, description: 'Saldo inicial' })
  @IsNumber()
  @Min(0)
  balance: number;
}

