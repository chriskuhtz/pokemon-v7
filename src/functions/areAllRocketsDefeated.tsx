import { SaveFile } from '../interfaces/SaveFile';
export const rocketsRemaining = (saveFile: SaveFile): number => {
	if (!saveFile.currentRocketOperation) {
		return 0;
	}
	return saveFile.currentRocketOperation.trainers.filter(
		(t) => !saveFile.handledOccupants.some((h) => h.id == t.id)
	).length;
};
export const areAllActiveRocketsDefeated = (saveFile: SaveFile): boolean => {
	return !!(
		saveFile.currentRocketOperation && rocketsRemaining(saveFile) === 0
	);
};
