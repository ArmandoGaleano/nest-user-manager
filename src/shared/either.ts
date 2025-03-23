export class Left<L> {
  constructor(public readonly value: L) {}

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): this is Right<unknown> {
    return false;
  }
}

export class Right<R> {
  constructor(public readonly value: R) {}

  isLeft(): this is Left<unknown> {
    return false;
  }

  isRight(): this is Right<R> {
    return true;
  }
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L, R>(l: L): Either<L, R> => new Left(l);
export const right = <L, R>(r: R): Either<L, R> => new Right(r);
