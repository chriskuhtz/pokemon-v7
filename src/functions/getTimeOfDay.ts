export const timesOfDay = ['MORNING', 'DAY', 'EVENING', 'NIGHT'] as const;

export type TimeOfDay = (typeof timesOfDay)[number];

export const getTimeOfDay = (): TimeOfDay => {
	const hours = new Date().getHours();

	const fasterDays = window.localStorage.getItem('fasterDays');

	if (fasterDays) {
		if ([0, 4, 8, 12, 16, 20].includes(hours)) {
			return 'MORNING';
		}
		if ([1, 5, 9, 13, 17, 21].includes(hours)) {
			return 'DAY';
		}
		if ([2, 6, 10, 14, 18, 22].includes(hours)) {
			return 'EVENING';
		}
		return 'NIGHT';
	}

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

export function isTimeOfDay(x: string | undefined | null): x is TimeOfDay {
	return !!x && ['MORNING', 'DAY', 'EVENING', 'NIGHT'].includes(x);
}
export const defaultShaderMap: Record<TimeOfDay, string> = {
	MORNING: 'rgba(156, 98, 0,.2)',
	DAY: 'rgba(0,0,0,0)',
	EVENING: 'rgba(156, 98, 0,.2)',
	NIGHT: 'rgba(23, 44, 79,.4)',
};

export const caveShaderMap: Record<TimeOfDay, string> = {
	MORNING: 'rgba(23, 44, 79,.4)',
	DAY: 'rgba(23, 44, 79,.4)',
	EVENING: 'rgba(23, 44, 79,.4)',
	NIGHT: 'rgba(23, 44, 79,.4)',
};
