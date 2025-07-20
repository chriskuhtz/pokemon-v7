import {
	challengeFieldId,
	randomFieldId,
} from '../constants/gameData/gameData';
import { rocketCampOccupants } from '../constants/gameData/maps/occupants/rocketCampOccupants';
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
		return h.id.includes('elite4');
	});
};

export const resetRocketCampers = (
	occs: SaveFile['handledOccupants']
): SaveFile['handledOccupants'] => {
	return occs.filter((h) => {
		return !rocketCampOccupants.some((r) => r.id == h.id);
	});
};
