export function partition(arr: [], predicate: Function) {
  return arr.reduce(
    (acc, arrElement, i, arr) => {
      if (predicate(arrElement, i, arr)) acc[0].push(arrElement);
      else acc[1].push(arrElement);
      return acc;
    },
    [[], []]
  );
}
