export const isSunday = () => {
	return new Date().getDay() === 0;
};
export const isMonday = () => {
	return new Date().getDay() === 1;
};
export const isTuesday = () => {
	return new Date().getDay() === 2;
};
export const isWednesday = () => {
	return new Date().getDay() === 3;
};
export const isThursday = () => {
	return new Date().getDay() === 0;
};
export const isFriday = () => {
	return new Date().getDay() === 0;
};
export const isSaturday = () => {
	return new Date().getDay() === 0;
};

export const isOddDay = () => {
	return [1, 3, 5].includes(new Date().getDay());
};
