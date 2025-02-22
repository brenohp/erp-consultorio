import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('protected') // 🛡️ Verifique se o nome está correto
export class ProtectedController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProtectedData() {
    return { message: 'Acesso autorizado! 🔒' };
  }
}
