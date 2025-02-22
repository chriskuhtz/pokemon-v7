import { localStorageId } from '../constants/gameData';
import { SaveFile, SettingsObject } from '../interfaces/SaveFile';

export const getPlayerId = (): string | undefined => {
	const local = window.localStorage.getItem(localStorageId);
	const { playerId } = local ? (JSON.parse(local) as SaveFile) : {};

	return playerId;
};

export const getSettings = (): SettingsObject | undefined => {
	const local = window.localStorage.getItem(localStorageId);
	const { settings } = local ? (JSON.parse(local) as SaveFile) : {};

	return settings;
};
