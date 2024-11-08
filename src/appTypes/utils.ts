type IsNonArrayObject<T> = T extends object ? (T extends any[] ? false : true) : false;

export type ArrayElements<T> = T extends Array<infer U> ? U : never;

export type UnionTypes<T> =
  | T
  | { [K in keyof T]: IsNonArrayObject<T[K]> extends true ? UnionTypes<T[K]> : never }[keyof T];

export type UnionToIntersection<U> = (U extends object ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

export type FlattenFields<T> = UnionToIntersection<UnionTypes<T>>;

export type FlattenFieldKeys<T> = keyof FlattenFields<T>;

export type FieldValidator<S, F extends string> = {
  [K in F]: K extends S ? K : never;
}[F];
