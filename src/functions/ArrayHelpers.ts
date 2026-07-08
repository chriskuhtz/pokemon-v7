/* eslint-disable @typescript-eslint/no-namespace */
export namespace ArrayHelpers {
  export const getRandomIndex = (arrayLength: number): number => {
    return Math.floor(Math.random() * arrayLength);
  };
  export function getRandomEntry<T>(array: T[]) {
    return array[getRandomIndex(array.length)];
  }
  export function getEntryWithOverflow<T>(array: T[], index: number) {
    const divider = Math.floor(index / array.length);
    const reducedIndex = index - divider * array.length;
    return array[reducedIndex];
  }

  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items An array containing the items.
   */
  export function shuffle<T>(a: T[]): T[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
