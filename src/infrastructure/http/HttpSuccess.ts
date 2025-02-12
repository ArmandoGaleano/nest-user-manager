interface HttpSuccessProps<TResult> {
  statusCode: number;
  data: TResult;
}

export class HttpSuccess<TResult> {
  public statusCode: number;
  public contentType?: ContentTypeEnum;
  public data?: TResult;

  constructor({ statusCode, data }: HttpSuccessProps<TResult>) {
    this.statusCode = statusCode;
    this.data = data;
  }
}
