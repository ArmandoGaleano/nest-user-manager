import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UsersV1Module } from './v1/users.module';

@Module({
  imports: [
    UsersV1Module,
    RouterModule.register([
      {
        path: 'api/private',
        module: PrivateUserModule,
        children: [
          {
            path: 'v1',
            module: UsersV1Module,
          },
        ],
      },
    ]),
  ],
})
export class PrivateUserModule {}
