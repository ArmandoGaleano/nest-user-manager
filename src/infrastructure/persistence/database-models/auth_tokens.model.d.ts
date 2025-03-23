interface AuthTokenModel {
  id: string;
  userId: string;
  token: string;
  revoked: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
