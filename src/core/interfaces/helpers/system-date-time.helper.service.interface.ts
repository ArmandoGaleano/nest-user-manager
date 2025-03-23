export interface ISystemDateTimeServiceHelper {
  getDate(): Date;
  getTimestamp(): number;
  hasTimestampExpired(timestamp: number);
}
