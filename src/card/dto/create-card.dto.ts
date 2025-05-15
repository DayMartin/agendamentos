import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsDateString, IsIn } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: 'uuid-da-conta', description: 'ID da conta associada ao cartão' })
  @IsUUID()
  account_id: string;

  @ApiProperty({ example: '1234-5678-9012-3456', description: 'Número do cartão' })
  @IsNotEmpty()
  card_number: string;

  @ApiProperty({ example: 'credit', description: 'Tipo do cartão (credit ou debit)' })
  @IsIn(['credit', 'debit'])
  card_type: string;

  @ApiProperty({ example: '2027-12-31', description: 'Data de validade do cartão (YYYY-MM-DD)' })
  @IsDateString()
  expiry_date: string;
}
