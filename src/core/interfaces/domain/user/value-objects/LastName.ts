import { UserLastNameSchema } from '@/core/schemas/@common/user/user-last-name';

export class LastName {
  public readonly value: string;

  constructor(input: string) {
    this.value = new UserLastNameSchema().schema.parse(input);
  }
}
