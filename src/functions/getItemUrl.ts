import { ItemType } from '../interfaces/Item';

const customSprites: Partial<Record<ItemType, string>> = {
	'golden-razz-berry': '/customItems/golden-razz-berry.png',
	'golden-pinap-berry': '/customItems/golden-pinap-berry.png',
	'golden-nanab-berry': '/customItems/golden-nanab-berry.png',
	'silver-razz-berry': '/customItems/silver-razz-berry.png',
	'silver-pinap-berry': '/customItems/silver-pinap-berry.png',
	'silver-nanab-berry': '/customItems/silver-nanab-berry.png',
	'black-augurite': '/customItems/black-augurite.png',
	'peat-block': '/customItems/peat-block.png',
	'pewter-crunchies': '/customItems/pewter-crunchies.png',
	'moomoo-cheese': '/customItems/moomoo-cheese.png',
	'fossilized-bird': '/customItems/fossilized-bird.png',
	'fossilized-drake': '/customItems/fossilized-drake.png',
	'fossilized-dino': '/customItems/fossilized-dino.png',
	'fossilized-fish': '/customItems/fossilized-fish.png',
};
export const getItemUrl = (item: ItemType): string => {
	if (customSprites[item]) {
		return customSprites[item];
	}

	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item}.png`;
};
