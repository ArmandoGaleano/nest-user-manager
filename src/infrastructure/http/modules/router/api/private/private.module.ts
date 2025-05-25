import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { UsersV1Module } from './users/v1/users.module';
import { RolesV1Module } from './roles/v1/roles.module';
import { UserRolesV1Module } from './user-roles/v1/user-roles.module';

@Module({
  imports: [
    UsersV1Module,
    RolesV1Module,
    UserRolesV1Module,
    RouterModule.register([
      {
        path: 'api/private',
        children: [
          {
            path: 'v1',
            children: [
              {
                path: '/',
                module: UsersV1Module,
              },
            ],
          },
          {
            path: 'v1',
            children: [
              {
                path: '/',
                module: RolesV1Module,
              },
            ],
          },
          {
            path: 'v1',
            children: [
              {
                path: '/',
                module: UserRolesV1Module,
              },
            ],
          },
        ],
      },
    ]),
  ],
})
export class PrivateModule {}
