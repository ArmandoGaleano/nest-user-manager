import { UserBirthdateSchema } from '@/core/schemas/@common/user/user-birthdate.schema';

export class Birthdate {
  public readonly value: string;

  constructor(input: string) {
    this.value = new UserBirthdateSchema().schema.parse(input);
  }
}
