import { UuidSchema } from '@/core/schemas/@common/uuid.schema';

export class Uuid {
  public readonly value: string;

  constructor(input: string) {
    this.value = new UuidSchema().schema.parse(input);
  }
}
