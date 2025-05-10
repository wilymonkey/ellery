export function sleep(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

namespace Option {
  type Some<T> = { readonly kind: 'some'; readonly value: T };
  type None = { readonly kind: 'none' };

  interface OptionMethods<T> {
    map<U>(fn: (value: T) => U): Option<U>;
    flatMap<U>(fn: (value: T) => Option<U>): Option<U>;
    unwrapOr(defaultValue: T): T;
    fromNullable<T>(value: T | null | undefined): Option<T>;
    isSome(): this is Some<T>;
    isNone(): this is None;
  }

  export type Option<T> = (Some<T> | None) & OptionMethods<T>;

  export function some<T>(value: T): Option<T> {
    const someObj: Some<T> = { kind: 'some', value };
    return Object.assign(someObj, createMethods<T>(someObj));
  }

  export function none<T = never>(): Option<T> {
    const noneObj: None = { kind: 'none' };
    return Object.assign(noneObj, createMethods<T>(noneObj));
  }

  function createMethods<T>(option: Some<T> | None): OptionMethods<T> {
    return {
      map<U>(fn: (value: T) => U): Option<U> {
        return option.kind === 'some' ? some(fn(option.value)) : none();
      },

      flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
        return option.kind === 'some' ? fn(option.value) : none();
      },

      unwrapOr(defaultValue: T): T {
        return option.kind === 'some' ? option.value : defaultValue;
      },

      fromNullable<T>(value: T | null | undefined): Option<T> {
        return value == null ? none() : some(value);
      },

      isSome(): this is Some<T> {
        return option.kind === 'some';
      },

      isNone(): this is None {
        return option.kind === 'none';
      }
    };
  }
}


export namespace Result {
  type Ok<T> = {
    ok: true;
    value: T;
    error?: never;
  };

  type Failure<E = Error> = {
    ok: false;
    value?: never;
    error: E;
  };

  interface ResultMethods<T> {
  }

  export type Result<T, E = Error> = Ok<T> | Failure<E>;

  export function ok<T>(value: T): Ok<T> {
    const someObj: Ok<T> = { ok: true, value };
    return Object.assign(someObj, createMethods<T>(someObj));
  }

  export function error<E = Failure>(): Option<T> {
    const noneObj: None = { kind: 'none' };
    return Object.assign(noneObj, createMethods<T>(noneObj));
  }

  interface ResultMethods<T, E> {
    map<U>(fn: (value: T) => U): Option<U>;
    flatMap<U>(fn: (value: T) => Option<U>): Option<U>;
    unwrapOr(defaultValue: T): T;
    fromNullable<T>(value: T | null | undefined): Option<T>;
    isSome(): this is Some<T>;
    isNone(): this is None;
  }


  function createMethods<T>(option: Some<T> | None): OptionMethods<T> {
    return {
      map<U>(fn: (value: T) => U): Option<U> {
        return option.kind === 'some' ? some(fn(option.value)) : none();
      },

      flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
        return option.kind === 'some' ? fn(option.value) : none();
      },

      unwrapOr(defaultValue: T): T {
        return option.kind === 'some' ? option.value : defaultValue;
      },

      fromNullable<T>(value: T | null | undefined): Option<T> {
        return value == null ? none() : some(value);
      },

      isSome(): this is Some<T> {
        return option.kind === 'some';
      },

      isNone(): this is None {
        return option.kind === 'none';
      }
    };
  }

  export function success<T>(value: T): Ok<T> {
    return { ok: true, value };
  }

  export function failure<E = Failure>(error: E): Failure<E> {
    return { ok: false, error };
  }

  export async function tryCatch<T>(fn: () => Promise<T>): Promise<Result<T>> {
    try {
      return success(await fn());
    } catch (error) {
      return failure(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
