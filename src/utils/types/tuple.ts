/**
 * Тип Tuple, создающий кортеж указанной длины.
 * @example
 * type MyTuple = Tuple<number, 3>; // [number, number, number]
 */
export type Tuple<
  T,
  N extends number,
  R extends any[] = []
> = R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;
