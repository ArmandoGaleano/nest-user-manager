export type HttpErrorsStatusNumberType =
  | 500
  | 404
  | 400
  | 401
  | 403
  | 405
  | 409
  | 422
  | 429
  | 503
  | 504
  | 502
  | 501
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511
  | 599
  | 598;

export type HttpErrorsMessagesType =
  | 'Internal server error'
  | 'Not found'
  | 'Bad request'
  | 'Unauthorized'
  | 'Forbidden'
  | 'Method not allowed'
  | 'Conflict'
  | 'Unprocessable entity'
  | 'Too many requests'
  | 'Service unavailable'
  | 'Gateway timeout'
  | 'Bad gateway'
  | 'Not implemented'
  | 'HTTP version not supported'
  | 'Variant also negotiates'
  | 'Insufficient storage'
  | 'Loop detected'
  | 'Not extended'
  | 'Network authentication required'
  | 'Network connect timeout error'
  | 'Network read timeout error';

export const mappedHttpErrorStatus: Record<
  HttpErrorsStatusNumberType,
  HttpErrorsMessagesType
> = {
  500: 'Internal server error',
  404: 'Not found',
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  405: 'Method not allowed',
  409: 'Conflict',
  422: 'Unprocessable entity',
  429: 'Too many requests',
  503: 'Service unavailable',
  504: 'Gateway timeout',
  502: 'Bad gateway',
  501: 'Not implemented',
  505: 'HTTP version not supported',
  506: 'Variant also negotiates',
  507: 'Insufficient storage',
  508: 'Loop detected',
  510: 'Not extended',
  511: 'Network authentication required',
  599: 'Network connect timeout error',
  598: 'Network read timeout error',
};
