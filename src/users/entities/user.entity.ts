import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Post } from 'src/posts/entities/post.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ unique: true })
  id: number;

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

  @Expose({ name: 'user_id' })
  @OneToMany(() => Post, (post) => post.userId)
  posts: Post[];
}
