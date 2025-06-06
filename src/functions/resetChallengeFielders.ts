import { challengeFieldId, randomFieldId } from '../constants/gameData';
import { SaveFile } from '../interfaces/SaveFile';

export const resetChallengeFielders = (
	occs: SaveFile['handledOccupants']
): SaveFile['handledOccupants'] => {
	return occs.filter((h) => {
		if (h.id.includes(challengeFieldId)) {
			return false;
		}

		if (h.id.includes(randomFieldId)) {
			return false;
		}

		return true;
	});
};

export const resetEliteFour = (
	occs: SaveFile['handledOccupants']
): SaveFile['handledOccupants'] => {
	return occs.filter((h) => {
		if (h.id.includes(challengeFieldId)) {
			return false;
		}

		if (h.id.includes(randomFieldId)) {
			return false;
		}

		return true;
	});
};
