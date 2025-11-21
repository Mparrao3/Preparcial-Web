import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';

@Entity('travel_plans')
export class TravelPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  countryCode: string;

  @Column()
  title: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relación opcional para integridad referencial, 
  // aunque el requerimiento pide validar existencia manualmente.
  // La incluimos para aprovechar el ORM si se desea.
  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryCode' })
  country: Country;
}
