import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { authCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private UsersRepository: Repository<Users>,
    private JwtService: JwtService,
  ) {}

  async signup(authCredentialsDto: authCredentialsDto): Promise<void> {
    return Users.createUser(authCredentialsDto);
  }

  async signin(
    authCredentialsDto: authCredentialsDto,
  ): Promise<{ accessToken: String }> {
    const { username, password } = authCredentialsDto;
    const user = await this.UsersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.JwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Check login credentials');
    }
  }
}
