import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from '../auth/dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get()
  async getAllAppointments() {
    return this.appointmentService.getAllAppointments();
  }

  @Delete(':id')
  async cancelAppointment(@Param('id') id: number) {
    return this.appointmentService.cancelAppointment(id);
  }
}
