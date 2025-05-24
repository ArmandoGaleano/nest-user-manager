import { ISO8601Schema } from '@/core/schemas/@common/timestamp.schema';

export class Timestamp {
  public readonly value: string;

  constructor(input: string) {
    this.value = new ISO8601Schema().schema.parse(input);
  }
}
