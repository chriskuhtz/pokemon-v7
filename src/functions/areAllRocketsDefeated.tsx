import { SaveFile } from '../interfaces/SaveFile';
export const troubleMakersRemaining = (saveFile: SaveFile): number => {
	if (!saveFile.troubleMakers) {
		return 0;
	}
	return saveFile.troubleMakers.trainers.filter(
		(t) => !saveFile.handledOccupants.some((h) => h.id == t.id)
	).length;
};
export const areAllActiveTroubleMakersDefeated = (
	saveFile: SaveFile
): boolean => {
	return !!(saveFile.troubleMakers && troubleMakersRemaining(saveFile) === 0);
};
