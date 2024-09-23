import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private UserRepository: Repository<Users>,
  ) {
    super({
      secretOrKey: 'dummysecretfordemo',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    });
  }

  async validate(payload: JwtPayload): Promise<Users> {
    const { username } = payload;
    const user: Users = await this.UserRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
