const devmode = !!window.localStorage.getItem('devmode');
export const isSunday = () => {
	return !!devmode || new Date().getDay() === 0;
};
export const isMonday = () => {
	return !!devmode || new Date().getDay() === 1;
};
export const isTuesday = () => {
	return !!devmode || new Date().getDay() === 2;
};
export const isWednesday = () => {
	return !!devmode || new Date().getDay() === 3;
};
export const isThursday = () => {
	return !!devmode || new Date().getDay() === 4;
};
export const isFriday = () => {
	return !!devmode || new Date().getDay() === 5;
};
export const isSaturday = () => {
	return !!devmode || new Date().getDay() === 6;
};

export const isOddDay = () => {
	return [1, 3, 5].includes(new Date().getDay());
};
