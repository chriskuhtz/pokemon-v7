export const isSunday = () => {
	return true; // new Date().getDay() === 0;
};
export const isMonday = () => {
	return true; // new Date().getDay() === 1;
};
export const isTuesday = () => {
	return true; // new Date().getDay() === 2;
};
export const isWednesday = () => {
	return true; // new Date().getDay() === 3;
};
export const isThursday = () => {
	return true; // new Date().getDay() === 0;
};
export const isFriday = () => {
	return true; // new Date().getDay() === 0;
};
export const isSaturday = () => {
	return true; // new Date().getDay() === 0;
};

export const isOddDay = () => {
	return [1, 3, 5].includes(new Date().getDay());
};
