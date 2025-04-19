export class Left<L> {
  constructor(readonly value: L) {}
}

export class Right<R> {
  constructor(readonly value: R) {}
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L, R>(l: L): Either<L, R> => new Left(l);
export const right = <L, R>(r: R): Either<L, R> => new Right(r);
