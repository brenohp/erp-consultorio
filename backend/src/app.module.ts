import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- ADICIONE ESTA LINHA
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProtectedModule } from './protected/protected.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2521',
      database: 'erp_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProtectedModule,
    UserModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
