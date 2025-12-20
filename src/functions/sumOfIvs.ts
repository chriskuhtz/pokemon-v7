import { HIDDEN_STATS } from '../constants/hiddenStats';
import { StatObject } from '../interfaces/StatObject';

export const sumOfIvs = (intrinsicValues: StatObject): number => {
	return Object.entries(intrinsicValues).reduce((sum, summand) => {
		if (HIDDEN_STATS.includes(summand[0])) {
			return sum;
		}
		return sum + summand[1];
	}, 0);
};
