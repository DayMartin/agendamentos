import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsPositive, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: 'uuid-conta-origem', description: 'ID da conta de origem' })
  @IsUUID()
  from_account_id: string;

  @ApiProperty({ example: 'uuid-conta-destino', description: 'ID da conta de destino', required: false })
  @IsUUID()
  @IsOptional()
  to_account_id?: string;

  @ApiProperty({ example: 100.50, description: 'Valor da transação' })
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 'transfer', description: 'Tipo da transação (ex: transfer, deposit, withdraw)' })
  @IsIn(['transfer', 'deposit', 'withdraw'])
  transaction_type: string;

  @ApiProperty({ example: 'Pagamento de boleto', description: 'Descrição da transação', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
