import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from '../auth/dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const newAppointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(newAppointment);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async cancelAppointment(id: number): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}
