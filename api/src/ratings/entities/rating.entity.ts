import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { User } from '../../users/entities/user.entity';
import { Request } from '../../requests/entities/request.entity';
import { IsInt, Max, Min } from 'class-validator';

@Entity()
export class Rating extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(type => Request)
  @JoinColumn({ name: 'request_id' })
  Request: Request;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'to_user_id' })
  toUser: User;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'from_user_id' })
  fromUser: User;

  @Column({ name: 'rating', type: 'int' })
  @Min(1, { message: 'This field must be an integer with a min of $constraint1, but was actually $value' })
  @Max(5, { message: 'This field must be an integer with a max of $constraint1, but was actually $value' })
  @IsInt({ message: 'This field must be an integer, but was actually $value' })
  rating: string;
}
