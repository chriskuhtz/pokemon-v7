export const getMiddleOfThree = (array: number[]): number => {
	if (array.length !== 3) {
		throw new Error('need an array of length 3');
	}

	return array.sort()[1];
};
