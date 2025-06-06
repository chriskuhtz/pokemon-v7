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
	'leaders-crest',
	'health-mochi',
	'muscle-mochi',
	'resist-mochi',
	'genius-mochi',
	'clever-mochi',
	'swift-mochi',
	'fresh-start-mochi',
	'max-honey',
	'max-mushroom',
	'clear-amulet',
	'punching-glove',
	'covert-cloak',
	'loaded-dice',
	'terrain-extender',
	'electric-seed',
	'grassy-seed',
	'psychic-seed',
	'misty-seed',
	'orange-apricorn',
	'grey-apricorn',
	'booster-energy',
];

export const getItemUrl = (item: ItemType): string => {
	if (item.includes('ticket')) {
		return `/customItems/ticket.png`;
	}
	if (hasCustomSprite.includes(item)) {
		return `/customItems/${item}.png`;
	}

	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item}.png`;
};
