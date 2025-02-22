import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';


@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  patient: User;

  @ManyToOne(() => User)
  doctor: User;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' })
  status: 'scheduled' | 'completed' | 'canceled';
}