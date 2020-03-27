import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsISO31661Alpha2, IsString } from 'class-validator';
import { GenericEntity } from 'src/generic/generic.entity';

@Entity()
export class Country extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'name' })
  @IsString({ always: true })
  name: string;

  @Column({ name: 'code' })
  @IsISO31661Alpha2({ message: 'Please enter a valid ISO-3661-Alpha-2 Code. The value entered was $value' })
  code: string;
}
