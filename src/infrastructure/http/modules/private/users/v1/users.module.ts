import { Module } from '@nestjs/common';
import { UsersV1Controller } from 'src/infrastructure/http/controllers/api/private/v1/users.controller';
import { CryptoService } from 'src/application/services/crypto/v1/crypto.service';
import { AuthService } from 'src/application/services/auth/v1/auth.service';
import { CreateUserUseCase } from 'src/application/use-cases/users/v1/create-user/create-user-use-case';
import { ReadUserUseCase } from 'src/application/use-cases/users/v1/read-user/read-user-use-case';
import { UsersV1Service } from 'src/application/services/users/v1/users.service';

@Module({
  controllers: [UsersV1Controller],
  providers: [
    CryptoService,
    AuthService,
    CreateUserUseCase,
    ReadUserUseCase,
    UsersV1Service,
  ],
  exports: [],
})
export class UsersV1Module {}
