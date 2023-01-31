import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserJWTPayload } from '@operation-management/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-travel-token'),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'],
    });
  }

  async validate(payload: UserJWTPayload) {
    return { userId: payload.sub };
  }
}