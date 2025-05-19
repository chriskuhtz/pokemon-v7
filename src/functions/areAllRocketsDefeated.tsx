import { SaveFile } from '../interfaces/SaveFile';
export const rocketsRemaining = (saveFile: SaveFile): number => {
	if (!saveFile.rocketOperation) {
		return 0;
	}
	return saveFile.rocketOperation.trainers.filter(
		(t) => !saveFile.handledOccupants.some((h) => h.id == t.id)
	).length;
};
export const areAllActiveRocketsDefeated = (saveFile: SaveFile): boolean => {
	return !!(saveFile.rocketOperation && rocketsRemaining(saveFile) === 0);
};
