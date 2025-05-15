import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from 'src/account/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'from_account_id' })
  from_account: Account;

  @Column()
  from_account_id: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'to_account_id' })
  to_account: Account;

  @Column({ nullable: true })
  to_account_id: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column()
  transaction_type: string; // 'deposit', 'withdraw', 'transfer'

  @Column({ default: 'completed' })
  status: string; // 'completed', 'pending', 'failed'

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
