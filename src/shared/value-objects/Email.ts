import { UserEmailSchema } from '@/core/schemas/@common/user/user-email.schema';

export class Email {
  public readonly value: string;

  constructor(input: string) {
    this.value = new UserEmailSchema().schema.parse(input);
  }
}
