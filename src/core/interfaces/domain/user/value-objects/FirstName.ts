import { UserFirstNameSchema } from '@/core/schemas/@common/user/user-first-name.schema';

export class FirstName {
  public readonly value: string;

  constructor(input: string) {
    this.value = new UserFirstNameSchema().schema.parse(input);
  }
}
