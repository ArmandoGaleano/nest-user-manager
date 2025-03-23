export interface IAuthService {
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, storedHash: string): Promise<boolean>;
}
