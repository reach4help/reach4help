import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { GenericEntity } from 'src/generic/generic.entity';
import { User } from './user.entity';

export enum RequestStatus {
  // When first created
  PENDING_CAV_ASSIGNMENT = 'pending_cav_assignment',
  // When CAV has been assigned but still needs to confirm assignment
  PENDING_CAV_ACCEPTANCE = 'pending_cav_acceptance',
  // When CAV has been assigned and has accepted
  CAV_ACCEPTED = 'accepted',
  // When the CAV has stated "ive done this"
  PENDING_PIN_CONFIRMATION = 'pending_pin_confirmation',
  // When the PIN has agreed "this has been done"
  COMPLETED = 'completed', //

  // Additional flow states
  REVIEWED = 'reviewed',
  CANCELED = 'canceled',
  REJECTED = 'rejected',
}

@Entity()
export class Request extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'requester_user_id' })
  requester: User;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'volunteer_user_id' })
  volunteer: User;

  @Column({ name: 'content', type: 'text' })
  @IsString({ always: true })
  content: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.PENDING_CAV_ASSIGNMENT,
  })
  status: RequestStatus;
}
