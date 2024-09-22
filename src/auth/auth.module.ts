import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './jwt.stratergy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'dummysecretfordemo',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, jwtStrategy],
  controllers: [AuthController],
  exports: [jwtStrategy, PassportModule],
})
export class AuthModule {}
