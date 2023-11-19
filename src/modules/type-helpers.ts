// type-helpers.ts

export type KeysNotStartsWith<
  Set,
  Needle extends string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = Set extends `${Needle}${infer _X}` ? never : Set;

export type KeysStartsWith<
  Set,
  Needle extends string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = Set extends `${Needle}${infer _X}` ? Set : never;
