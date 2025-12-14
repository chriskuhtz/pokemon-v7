import { GameData } from '../interfaces/GameData';
import { Inventory } from '../interfaces/Inventory';
import { SaveFile } from '../interfaces/SaveFile';

export const getTotalInventoryAmount = (inventory: Inventory): number => {
	return Object.values(inventory).reduce((sum, summand) => sum + summand, 0);
};
export const getBagLimit = (saveFile: SaveFile, gameData: GameData): number => {
	const {
		carryingCapacity: { base, second, third, fourth },
	} = gameData;
	if (fourth?.condition(saveFile)) {
		return fourth.amount;
	}
	if (third?.condition(saveFile)) {
		return third.amount;
	}
	if (second?.condition(saveFile)) {
		return second.amount;
	}
	return base.amount;
};
export const isBagOverloaded = (s: SaveFile, gameData: GameData): boolean => {
	return getTotalInventoryAmount(s.bag) > getBagLimit(s, gameData);
};
