export function sortArray<T>(
  arr: T[],
  fn: (item1: T, item2: T) => number
): T[] {
  let tmp = [...arr];
  return tmp.sort(fn);
}
