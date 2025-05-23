import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
