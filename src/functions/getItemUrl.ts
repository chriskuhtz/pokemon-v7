import { ItemType } from '../interfaces/Item';

const customSprites: Partial<Record<ItemType, string>> = {
	'golden-razz-berry': '/mapObjects/pokeball.png',
	'golden-pinap-berry': '/mapObjects/pokeball.png',
	'golden-nanab-berry': '/mapObjects/pokeball.png',
	'silver-razz-berry': '/mapObjects/pokeball.png',
	'silver-pinap-berry': '/mapObjects/pokeball.png',
	'silver-nanab-berry': '/mapObjects/pokeball.png',
};
export const getItemUrl = (item: ItemType): string => {
	if (customSprites[item]) {
		return customSprites[item];
	}

	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item}.png`;
};
