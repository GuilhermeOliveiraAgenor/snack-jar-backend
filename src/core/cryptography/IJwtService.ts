export interface IJWTService {
  sign(userId: string): string;
  verify(token: string): { sub: string };
}
