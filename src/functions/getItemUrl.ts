import { ItemType } from '../interfaces/Item';

const hasCustomSprite: ItemType[] = [
	'auspicious-armor',
	'malicious-armor',
	'cracked-pot',
	'chipped-pot',
	'tart-apple',
	'sweet-apple',
	'syrupy-apple',
	'exp-candy-l',
	'exp-candy-m',
	'exp-candy-s',
	'exp-candy-xl',
	'exp-candy-xs',
	'golden-razz-berry',
	'golden-pinap-berry',
	'golden-nanab-berry',
	'silver-razz-berry',
	'silver-pinap-berry',
	'silver-nanab-berry',
	'black-augurite',
	'peat-block',
	'pewter-crunchies',
	'moomoo-cheese',
	'fossilized-bird',
	'fossilized-drake',
	'fossilized-dino',
	'fossilized-fish',
	'heavy-duty-boots',
	'blunder-policy',
	'lure',
	'super-lure',
	'max-lure',
	'scroll-of-waters',
	'scroll-of-darkness',
];

export const getItemUrl = (item: ItemType): string => {
	if (hasCustomSprite.includes(item)) {
		return `/customItems/${item}.png`;
	}

	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item}.png`;
};
