import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  
async register(registerDto: RegisterDto) {
  const { name, email, password, role } = registerDto;

  // Verifica se o e-mail já existe no banco
  const existingUser = await this.userService.findByEmail(email);
  if (existingUser) {
    throw new ConflictException('Email já cadastrado');
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria usuário no banco de dados
  const user = await this.userService.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Retorna o token de acesso
  const payload = { sub: user.id, email: user.email, role: user.role };
  return {
    access_token: this.jwtService.sign(payload),
  };
}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar usuário no banco de dados
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar token JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}
