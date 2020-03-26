import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { GenericEntity } from 'src/generic/generic.entity';
import { User } from './user.entity';
import { Request } from './request.entity';

@Entity()
export class Comment extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  requester: User;

  @ManyToOne(type => Request)
  @JoinColumn({ name: 'request_id' })
  volunteer: Request;

  @Column({ name: 'content', type: 'text' })
  @IsString({ always: true })
  content: string;
}
