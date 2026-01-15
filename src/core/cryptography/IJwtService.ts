export interface IJWTService {
  sign(userId: string): string;
  verify(token: string): string;
}
