declare namespace ArrayHelpers {
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
}
