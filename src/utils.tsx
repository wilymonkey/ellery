export function sleep(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

type Ok<T> = {
  ok: true;
  value: T;
};

type Fail<E = Error> = {
  ok: false;
  error: E;
};

export class Result<T, E = Error> {
  private constructor(private readonly outcome: Ok<T> | Fail<E>) { }

  static ok<T>(value: T): Result<T, never> {
    return new Result({ ok: true, value });
  }

  static fail<E>(error: E): Result<never, E> {
    return new Result({ ok: false, error });
  }

  static async tryAsync<T, E = Error>(
    fn: () => Promise<T>
  ): Promise<Result<T, E>> {
    try {
      const value = await fn();
      return Result.ok(value);
    } catch (error) {
      return Result.fail(error as E);
    }
  }

  unwrapOr(defaultValue: T): T {
    return this.outcome.ok ? this.outcome.value : defaultValue;
  }

  match<U>(onOk: (value: T) => U, onFail: (error: E) => U): U {
    return this.outcome.ok
      ? onOk(this.outcome.value as T)
      : onFail(this.outcome.error as E);
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    return this.outcome.ok ? Result.ok(fn(this.outcome.value)) : (this as any);
  }
}
