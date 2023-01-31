export interface UserJWTPayload {
  email: string;
  sub: number;
  iat: number;
  exp: number;
}
