import { localStorageId } from '../constants/gameData';
import { SaveFile } from '../interfaces/SaveFile';

export const getPlayerId = (): string | undefined => {
	const local = window.localStorage.getItem(localStorageId);
	const { playerId } = local ? (JSON.parse(local) as SaveFile) : {};

	return playerId;
};
