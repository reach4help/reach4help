import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { IsDate } from 'class-validator';

export enum AuthenticationType {
  FACEBOOK = 'facebook'
}

@Entity()
export class Authentication extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: AuthenticationType,
  })
  type: AuthenticationType;

  @Column({
    name: 'access_tokens_hash',
    type: 'text',
  })
  accessTokensHash: string;

  @Column({
    name: 'expiration_time',
    type: 'timestamp with time zone',
  })
  @IsDate()
  expirationTime: string;

  @Column({
    name: 'last_activity',
    type: 'timestamp with time zone',
  })
  @IsDate()
  lastActivity: string;
}
