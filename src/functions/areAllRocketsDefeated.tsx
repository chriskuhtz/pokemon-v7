import { SaveFile } from '../interfaces/SaveFile';

export const areAllRocketsDefeated = (saveFile: SaveFile): boolean => {
	if (!saveFile.currentRocketOperation) {
		return true;
	}
	return (
		saveFile.currentRocketOperation &&
		saveFile.currentRocketOperation.trainers.every((t) =>
			saveFile.handledOccupants.some((h) => h.id === t.id)
		)
	);
};
