import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { GenericEntity } from 'src/generic/generic.entity';
import { Country } from '../../countries/entities/country.entity';

export class Point {
  lat: number;
  lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

@Entity()
export class Address extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'address1' })
  @IsString({ always: true })
  address1: string;

  @Column({ name: 'address2' })
  @IsString({ always: true })
  address2: string;

  @Column({ name: 'address3' })
  @IsString({ always: true })
  address3: string;

  @Column({ name: 'locality' })
  @IsString({ always: true })
  locality: string;

  @Column({ name: 'administrative_area_1' })
  @IsString({ always: true })
  administrativeArea1: string;

  @Column({ name: 'administrative_area_2' })
  @IsString({ always: true })
  administrativeArea2: string;

  @Column({ name: 'postal_code' })
  @IsString({ always: true })
  postalCode: string;

  @OneToOne(type => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({
    type: 'point', name: 'latlng', transformer: {
      from: v => new Point(v.x, v.y),
      to: v => `${v.lat},${v.lng}`,
    },
    spatialFeatureType: 'point',
  })
  @IsString({ always: true })
  latLng: Point;
}
