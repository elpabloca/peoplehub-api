import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose({ name: 'id' })
  @Column({ unique: true, name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Expose({ name: 'first_name' })
  @Column({ type: 'varchar', length: 255, name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;
}
