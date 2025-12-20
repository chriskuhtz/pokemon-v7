import { GameData } from '../interfaces/GameData';
import { SaveFile } from '../interfaces/SaveFile';

export const getTeamSize = (saveFile: SaveFile, gameData: GameData) => {
	if (gameData.teamSlots.sixth(saveFile)) {
		return 6;
	}
	if (gameData.teamSlots.fifth(saveFile)) {
		return 5;
	}
	if (gameData.teamSlots.fourth(saveFile)) {
		return 4;
	}
	if (gameData.teamSlots.third(saveFile)) {
		return 3;
	}
	if (gameData.teamSlots.second(saveFile)) {
		return 2;
	}

	return 1;
};
