import { HttpError } from './HttpError';
import { HttpSuccess } from './HttpSuccess';

type HttpResponseProps<TResult, TResultError> = {
  HttpSuccess?: HttpSuccess<TResult>;
  HttpError?: HttpError<TResultError>;
};

export class HttpResponse<TResult = undefined, TResultError = undefined> {
  private HttpSuccess?: HttpResponseProps<TResult, TResultError>['HttpSuccess'];
  private HttpError?: HttpResponseProps<TResult, TResultError>['HttpError'];

  get result(): HttpSuccess<TResult> | HttpError<TResultError> {
    if (!this.HttpSuccess && !this.HttpError) {
      throw new Error('HttpResponse must have a result');
    }

    if (this.HttpSuccess) {
      return this.HttpSuccess;
    }

    return this.HttpError as HttpError<TResultError>;
  }

  constructor(private props: HttpResponseProps<TResult, TResultError>) {
    this.HttpSuccess = props.HttpSuccess;
    this.HttpError = props.HttpError;
  }
}
