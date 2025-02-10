export const isEvening = (): boolean => {
	const hours = new Date().getHours();
	return hours > 17 && hours <= 20;
};

export const isNight = (): boolean => {
	const hours = new Date().getHours();
	return hours <= 5 || hours > 20;
};
export const isMorning = (): boolean => {
	const hours = new Date().getHours();
	return hours > 5 && hours <= 9;
};
