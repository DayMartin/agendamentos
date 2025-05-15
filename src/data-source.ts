import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Account } from './account/account.entity';
import { Transaction } from './transaction/transaction.entity';
import { Card } from './card/card.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Account, Transaction, Card],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
