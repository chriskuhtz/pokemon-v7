export type TimeOfDay = 'MORNING' | 'DAY' | 'EVENING' | 'NIGHT';

export const getTimeOfDay = (): TimeOfDay => {
	const hours = new Date().getHours();

	if (hours > 5 && hours <= 9) {
		return 'MORNING';
	}
	if (hours > 16 && hours <= 20) {
		return 'EVENING';
	}
	if (hours <= 5 || hours > 20) {
		return 'NIGHT';
	}

	return 'DAY';
};

export const OverworldShaderMap: Record<TimeOfDay, string> = {
	MORNING: 'rgba(156, 98, 0,.2)',
	DAY: 'rgba(0,0,0,0)',
	EVENING: 'rgba(156, 98, 0,.2)',
	NIGHT: 'rgba(23, 44, 79,.4)',
};
