import { SaveFile } from '../interfaces/SaveFile';

export const occupantHandled = (s: SaveFile, id: string): boolean => {
	return s.handledOccupants.some((h) => h.id === id);
};
