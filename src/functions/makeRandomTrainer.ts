import { Challenger } from '../interfaces/Challenger';
import { SaveFile } from '../interfaces/SaveFile';
import {
	tier1trainers,
	tier2trainers,
	tier3trainers,
	tier4trainers,
	tier5trainers,
	trainers,
} from '../modules/TrainingField/trainersRecord';

export const makeRandomTrainer = (
	saveFile: SaveFile,
	tier?: 1 | 2 | 3 | 4 | 5
): Challenger => {
	let all = trainers;

	if (tier === 1) {
		all = tier1trainers;
	}
	if (tier === 2) {
		all = tier2trainers;
	}
	if (tier === 3) {
		all = tier3trainers;
	}
	if (tier === 4) {
		all = tier4trainers;
	}
	if (tier === 5) {
		all = tier5trainers;
	}
	return ArrayHelpers.getRandomEntry(
		all.filter((t) => {
			let res = true;
			if (t.availableAfter) {
				res = saveFile.quests[t.availableAfter] === 'COLLECTED';
			}
			if (t.requiredUpgrade) {
				res = saveFile.campUpgrades[t.requiredUpgrade];
			}

			return res;
		})
	);
};
