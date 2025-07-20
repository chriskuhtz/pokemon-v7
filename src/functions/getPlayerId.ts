import { localStorageSaveFileId } from '../constants/gameData/gameData';
import { SaveFile, SettingsObject } from '../interfaces/SaveFile';

export const getPlayerId = (): string => {
	const local = window.localStorage.getItem(localStorageSaveFileId);
	const { playerId } = local ? (JSON.parse(local) as SaveFile) : {};

	return playerId ?? '';
};

export const getSettings = (): SettingsObject | undefined => {
	const local = window.localStorage.getItem(localStorageSaveFileId);
	const { settings } = local ? (JSON.parse(local) as SaveFile) : {};

	return settings;
};
