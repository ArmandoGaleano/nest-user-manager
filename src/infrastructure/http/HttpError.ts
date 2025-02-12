interface HttpErrorProps<TResultError> {
  statusCode: number;
  contentType?: ContentTypeEnum;
  data?: TResultError;
}

export class HttpError<TResultError> extends Error {
  public statusCode: number;
  public contentType?: ContentTypeEnum;
  public data?: TResultError;

  constructor({ statusCode, contentType, data }: HttpErrorProps<TResultError>) {
    super(typeof data === 'string' ? data : undefined);
    this.name = 'HTTP Error';
    this.statusCode = statusCode;
    this.contentType = contentType;
    this.data = data;
  }
}
