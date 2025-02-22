import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  patient: User;

  @ManyToOne(() => User, (user) => user.id)
  doctor: User;

  @Column()
  date: Date;

  @Column()
  status: 'scheduled' | 'completed' | 'canceled';
}
