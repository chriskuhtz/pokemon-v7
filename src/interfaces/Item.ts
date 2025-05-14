import { PokemonName } from '../constants/pokemonNames';
import { getRandomIndex } from '../functions/filterTargets';
import { Nature } from './Natures';
import { PokemonType } from './PokemonType';
import { Stat } from './StatObject';

export const healingItemTypes = [
	'potion',
	'super-potion',
	'hyper-potion',
	'max-potion',
	'full-restore',
	'full-heal',
	'fresh-water',
	'antidote',
	'burn-heal',
	'paralyze-heal',
	'ice-heal',
	'awakening',
	'revive',
	'max-revive',
	'max-honey',
	'max-mushroom',
	'soda-pop',
	'lemonade',
	'moomoo-milk',
	'energy-powder',
	'energy-root',
	'heal-powder',
	'revival-herb',
	'lava-cookie',
	'berry-juice',
	'old-gateau',
	'big-malasada',
	'blue-flute',
	'red-flute',
	'yellow-flute',
	'sitrus-berry',
	'cheri-berry',
	'chesto-berry',
	'pecha-berry',
	'rawst-berry',
	'aspear-berry',
	'oran-berry',
	'persim-berry',
	'lum-berry',
	'sweet-heart',
] as const;
export const ppRestorationItemTypes = [
	'ether',
	'max-ether',
	'elixir',
	'max-elixir',
	'leppa-berry',
] as const;
export const evBoostItemTypes = [
	'hp-up',
	'calcium',
	'zinc',
	'iron',
	'protein',
	'carbos',
	'health-mochi',
	'muscle-mochi',
	'resist-mochi',
	'genius-mochi',
	'clever-mochi',
	'swift-mochi',
] as const;
export const balltypes = [
	'poke-ball',
	'great-ball',
	'ultra-ball',
	'fast-ball',
	'net-ball',
	'heavy-ball',
	'nest-ball',
	'heal-ball',
	'quick-ball',
	'dusk-ball',
	'timer-ball',
	'luxury-ball',
	'master-ball',
	'cherish-ball',
	'repeat-ball',
	'premier-ball',
	'dive-ball',
	'safari-ball',
] as const;
export const ppBoostItemTypes = ['pp-up', 'pp-max'] as const;
export const xItemTypes = [
	'x-attack',
	'x-defense',
	'x-sp-atk',
	'x-sp-def',
	'x-speed',
	'x-accuracy',
	'dire-hit',
	'guard-spec',
] as const;
export const runawayItemTypes = ['poke-doll', 'fluffy-tail'] as const;
export const apricorns = [
	'red-apricorn',
	'blue-apricorn',
	'yellow-apricorn',
	'green-apricorn',
	'pink-apricorn',
	'white-apricorn',
	'black-apricorn',
] as const;

export const herbs = ['white-herb', 'mental-herb', 'power-herb'] as const;
export const evoStones = [
	'sun-stone',
	'thunder-stone',
	'fire-stone',
	'water-stone',
	'leaf-stone',
	'ice-stone',
	'moon-stone',
	'dawn-stone',
	'dusk-stone',
	'shiny-stone',
	'black-augurite',
	'peat-block',
	'tart-apple',
	'syrupy-apple',
	'sweet-apple',
	'auspicious-armor',
	'malicious-armor',
	'chipped-pot',
	'cracked-pot',
	'scroll-of-waters',
	'scroll-of-darkness',
	'leaders-crest',
] as const;
export const heldItems = [
	'quick-claw',
	'metal-coat',
	'oval-stone',
	'adamant-orb',
	'lustrous-orb',
	'bright-powder',
	'macho-brace',
	'soothe-bell',
	'choice-band',
	'kings-rock',
	'silver-powder',
	'dragon-scale',
	'leftovers',
	'light-ball',
	'cleanse-tag',
	'soul-dew',
	'deep-sea-tooth',
	'deep-sea-scale',
	'smoke-ball',
	'focus-band',
	'lucky-egg',
	'scope-lens',
	'soft-sand',
	'hard-stone',
	'miracle-seed',
	'black-glasses',
	'black-belt',
	'magnet',
	'mystic-water',
	'sharp-beak',
	'poison-barb',
	'never-melt-ice',
	'spell-tag',
	'twisted-spoon',
	'charcoal',
	'dragon-fang',
	'silk-scarf',
	'up-grade',
	'shell-bell',
	'sea-incense',
	'lax-incense',
	'lucky-punch',
	'stick',
	'metal-powder',
	'thick-club',
	'wide-lens',
	'muscle-band',
	'wise-glasses',
	'expert-belt',
	'light-clay',
	'life-orb',
	'toxic-orb',
	'flame-orb',
	'quick-powder',
	'focus-sash',
	'metronome',
	'iron-ball',
	'lagging-tail',
	'destiny-knot',
	'black-sludge',
	'icy-rock',
	'smooth-rock',
	'heat-rock',
	'damp-rock',
	'grip-claw',
	'choice-scarf',
	'power-bracer',
	'power-belt',
	'power-lens',
	'power-band',
	'power-anklet',
	'power-weight',
	'shed-shell',
	'big-root',
	'choice-specs',
	'flame-plate',
	'splash-plate',
	'zap-plate',
	'meadow-plate',
	'icicle-plate',
	'fist-plate',
	'toxic-plate',
	'earth-plate',
	'sky-plate',
	'mind-plate',
	'insect-plate',
	'stone-plate',
	'spooky-plate',
	'draco-plate',
	'dread-plate',
	'iron-plate',
	'pixie-plate',
	'odd-incense',
	'rock-incense',
	'full-incense',
	'wave-incense',
	'rose-incense',
	'protector',
	'electirizer',
	'magmarizer',
	'dubious-disc',
	'reaper-cloth',
	'razor-fang',
	'razor-claw',
	'griseous-orb',
	'float-stone',
	'rocky-helmet',
	'air-balloon',
	'binding-band',
	'absorb-bulb',
	'cell-battery',
	'fire-gem',
	'water-gem',
	'electric-gem',
	'grass-gem',
	'ice-gem',
	'fighting-gem',
	'poison-gem',
	'ground-gem',
	'flying-gem',
	'psychic-gem',
	'bug-gem',
	'rock-gem',
	'ghost-gem',
	'dark-gem',
	'steel-gem',
	'dragon-gem',
	'normal-gem',
	'fairy-gem',
	'weakness-policy',
	'whipped-dream',
	'sachet',
	'luminous-moss',
	'snowball',
	'safety-goggles',
	'adrenaline-orb',
	'protective-pads',
	'heavy-duty-boots',
	'blunder-policy',
	'clear-amulet',
	'punching-glove',
	'covert-cloak',
	'loaded-dice',
	'terrain-extender',
	'electric-seed',
	'grassy-seed',
	'psychic-seed',
	'misty-seed',
] as const;
export const valuables = [
	'auspicious-armor',
	'malicious-armor',
	'chipped-pot',
	'cracked-pot',
	'shoal-salt',
	'shoal-shell',
	'green-shard',
	'red-shard',
	'blue-shard',
	'yellow-shard',
	'tiny-mushroom',
	'big-mushroom',
	'pearl',
	'big-pearl',
	'stardust',
	'star-piece',
	'nugget',
	'heart-scale',
	'rare-bone',
	'odd-keystone',
	'deep-sea-tooth',
	'deep-sea-scale',
	'prism-scale',
	'balm-mushroom',
	'big-nugget',
	'pearl-string',
	'comet-shard',
	'relic-copper',
	'relic-silver',
	'relic-gold',
	'relic-vase',
	'relic-band',
	'relic-statue',
	'relic-crown',
] as const;

export const mulches = [
	'growth-mulch',
	'damp-mulch',
	'stable-mulch',
	'gooey-mulch',
	'rich-mulch',
	'surprise-mulch',
	'amaze-mulch',
	'boost-mulch',
] as const;
export const berries = [
	'sitrus-berry',
	'cheri-berry',
	'chesto-berry',
	'pecha-berry',
	'rawst-berry',
	'aspear-berry',
	'leppa-berry',
	'oran-berry',
	'persim-berry',
	'lum-berry',
	'figy-berry',
	'mago-berry',
	'iapapa-berry',
	'bluk-berry',
	'nanab-berry',
	'aguav-berry',
	'wiki-berry',
	'razz-berry',
	'wepear-berry',
	'pinap-berry',
	'pomeg-berry',
	'kelpsy-berry',
	'qualot-berry',
	'hondew-berry',
	'grepa-berry',
	'tamato-berry',
	'cornn-berry',
	'rabuta-berry',
	'nomel-berry',
	'magost-berry',
	'spelon-berry',
	'durin-berry',
	'watmel-berry',
	'pamtre-berry',
	'belue-berry',
	'occa-berry',
	'passho-berry',
	'wacan-berry',
	'rindo-berry',
	'yache-berry',
	'chople-berry',
	'kebia-berry',
	'shuca-berry',
	'coba-berry',
	'payapa-berry',
	'tanga-berry',
	'charti-berry',
	'kasib-berry',
	'haban-berry',
	'colbur-berry',
	'babiri-berry',
	'chilan-berry',
	'liechi-berry',
	'ganlon-berry',
	'petaya-berry',
	'apicot-berry',
	'lansat-berry',
	'starf-berry',
	'enigma-berry',
	'micle-berry',
	'custap-berry',
	'roseli-berry',
	'kee-berry',
	'maranga-berry',
	'silver-razz-berry',
	'golden-razz-berry',
	'silver-nanab-berry',
	'golden-nanab-berry',
	'silver-pinap-berry',
	'golden-pinap-berry',
	'jaboca-berry',
	'rowap-berry',
] as const;
export const fossils = [
	'old-amber',
	'helix-fossil',
	'dome-fossil',
	'root-fossil',
	'claw-fossil',
	'armor-fossil',
	'skull-fossil',
	'cover-fossil',
	'plume-fossil',
	'jaw-fossil',
	'sail-fossil',
	'fossilized-bird',
	'fossilized-fish',
	'fossilized-drake',
	'fossilized-dino',
] as const;
export const keyItems = [
	'exp-share',
	'poke-flute',
	'oaks-parcel',
	'shiny-charm',
	'sprayduck',
	'repel',
	'max-repel',
	'super-repel',
	'lure',
	'super-lure',
	'max-lure',
] as const;

export const expCandies = [
	'exp-candy-xs',
	'exp-candy-s',
	'exp-candy-m',
	'exp-candy-l',
	'exp-candy-xl',
] as const;

export const itemTypes = [
	...apricorns,
	...balltypes,
	...healingItemTypes,
	...ppRestorationItemTypes,
	...ppBoostItemTypes,
	...evBoostItemTypes,
	...xItemTypes,
	...runawayItemTypes,
	...evoStones,
	...heldItems,
	...valuables,
	...mulches,
	...berries,
	...fossils,
	...herbs,
	...keyItems,
	...expCandies,
	'sacred-ash',
	'rare-candy',
	'escape-rope',
	'honey',
	'moomoo-cheese',
	'lumiose-galette',
	'rage-candy-bar',
	'pewter-crunchies',
	'casteliacone',
	'fresh-start-mochi',
] as const;

export type ItemType = (typeof itemTypes)[number];
export type PokeballType = (typeof balltypes)[number];
export type HealingItemType = (typeof healingItemTypes)[number];
export type PPRestoringItemType = (typeof ppRestorationItemTypes)[number];
export type PPBoostItemType = (typeof ppBoostItemTypes)[number];
export type EvBoostItemType = (typeof evBoostItemTypes)[number];
export type XItemType = (typeof xItemTypes)[number];
export type RunawayItem = (typeof runawayItemTypes)[number];
export type BerryType = (typeof berries)[number];
export type MulchType = (typeof mulches)[number];
export type FossilType = (typeof fossils)[number];
export type ValuableType = (typeof valuables)[number];
export type ApricornType = (typeof apricorns)[number];
export type HerbType = (typeof herbs)[number];
export type KeyItemType = (typeof keyItems)[number];
export type HeldItemType = (typeof heldItems)[number];

export function isPokeball(x: string | undefined): x is PokeballType {
	return (balltypes as unknown as string[]).includes(x ?? '');
}
export function isApricorn(x: string | undefined): x is ApricornType {
	return (apricorns as unknown as string[]).includes(x ?? '');
}
export function isKeyItem(x: string | undefined): x is KeyItemType {
	return (keyItems as unknown as string[]).includes(x ?? '');
}
export function isHerb(x: string | undefined): x is HerbType {
	return (herbs as unknown as string[]).includes(x ?? '');
}
export function isBerry(x: string | undefined): x is BerryType {
	return (berries as unknown as string[]).includes(x ?? '');
}
export function isMulch(x: string | undefined): x is MulchType {
	return (mulches as unknown as string[]).includes(x ?? '');
}
export function isIngredient(x: string | undefined): boolean {
	return (
		!!x &&
		[...berries, ...herbs, 'moomoo-milk', 'honey', 'tiny-mushroom'].includes(x)
	);
}
export function isCooked(x: string | undefined): boolean {
	return (
		!!x &&
		[
			'berry-juice',
			'rare-candy',
			'big-malasada',
			'moomoo-cheese',
			'casteliacone',
			'pewter-crunchies',
			'lumiose-galette',
			'rage-candy-bar',
			'lava-cookie',
			'old-gateau',
			'energy-powder',
			'heal-powder',
		].includes(x)
	);
}
export function canCauseEvolution(x: string | undefined): boolean {
	return (
		!!x &&
		[
			...evoStones,
			'metal-coat',
			'oval-stone',
			'kings-rock',
			'dragon-scale',
			'deep-sea-tooth',
			'deep-sea-scale',
			'up-grade',
			'protector',
			'electirizer',
			'magmarizer',
			'dubious-disc',
			'reaper-cloth',
			'razor-fang',
			'razor-claw',
		].includes(x)
	);
}
export function isFossil(x: string | undefined): x is FossilType {
	return (fossils as unknown as string[]).includes(x ?? '');
}
export function isValuable(x: string | undefined): x is ValuableType {
	return (valuables as unknown as string[]).includes(x ?? '');
}
export function isHealingItem(x: string | undefined): x is HealingItemType {
	return (healingItemTypes as unknown as string[]).includes(x ?? '');
}
export function isPPRestorationItem(
	x: string | undefined
): x is PPRestoringItemType {
	return (ppRestorationItemTypes as unknown as string[]).includes(x ?? '');
}
export function isEvBoostItem(x: string | undefined): x is EvBoostItemType {
	return (evBoostItemTypes as unknown as string[]).includes(x ?? '');
}
export function isPPBoostItem(x: string | undefined): x is PPBoostItemType {
	return (ppBoostItemTypes as unknown as string[]).includes(x ?? '');
}
export function isXItem(x: string | undefined): x is XItemType {
	return (xItemTypes as unknown as string[]).includes(x ?? '');
}
export function isRunawayItem(x: string | undefined): x is RunawayItem {
	return (runawayItemTypes as unknown as string[]).includes(x ?? '');
}
export function isHeldItem(x: string | undefined): x is HeldItemType {
	return (heldItems as unknown as string[]).includes(x ?? '');
}

export function isItem(x: string | undefined): x is ItemType {
	return (itemTypes as unknown as string[]).includes(x ?? '');
}
export const hasEndOfTurnEffect = (item: ItemType): boolean => {
	if (
		isBerry(item) ||
		item === 'berry-juice' ||
		item === 'leftovers' ||
		item === 'black-sludge' ||
		isHerb(item)
	) {
		return true;
	}
	return false;
};

export const HappinessChangeTable: Partial<Record<ItemType, number>> = {
	'heal-powder': -10,
	'energy-powder': -10,
	'revival-herb': -10,
	'energy-root': -10,
	'rare-candy': 10,
	'hp-up': 5,
	calcium: 5,
	zinc: 5,
	iron: 5,
	protein: 5,
	carbos: 5,
};
export const EvBoostTable: Record<
	EvBoostItemType,
	{ stat: Stat; change: number }
> = {
	'hp-up': { change: 10, stat: 'hp' },
	calcium: { change: 10, stat: 'special-attack' },
	zinc: { change: 10, stat: 'special-defense' },
	iron: { change: 10, stat: 'defense' },
	protein: { change: 10, stat: 'attack' },
	carbos: { change: 10, stat: 'speed' },
	'health-mochi': { change: 10, stat: 'hp' },
	'genius-mochi': { change: 10, stat: 'special-attack' },
	'clever-mochi': { change: 10, stat: 'special-defense' },
	'resist-mochi': { change: 10, stat: 'defense' },
	'muscle-mochi': { change: 10, stat: 'attack' },
	'swift-mochi': { change: 10, stat: 'speed' },
};
export const HPHealTable: Partial<Record<ItemType, number>> = {
	'oran-berry': 10,
	potion: 20,
	'sweet-heart': 20,
	'berry-juice': 20,
	'sitrus-berry': 30,
	'energy-powder': 50,
	'super-potion': 50,
	'fresh-water': 50,
	'soda-pop': 60,
	lemonade: 80,
	'moomoo-milk': 100,
	'energy-root': 200,
	'hyper-potion': 200,
	'max-potion': 10000,
};
export const FlavourfullBerriesTable: Partial<Record<ItemType, Nature[]>> = {
	'figy-berry': ['bold', 'modest', 'calm', 'timid'],
	'mago-berry': ['brave', 'relaxed', 'quiet', 'sassy'],
	'iapapa-berry': ['lonely', 'mild', 'gentle', 'hasty'],
	'aguav-berry': ['naughty', 'rash', 'lax', 'naive'],
	'wiki-berry': ['adamant', 'impish', 'careful', 'jolly'],
};
export const emergencyBoostBerriesTable: Partial<Record<ItemType, Stat>> = {
	'liechi-berry': 'attack',
	'ganlon-berry': 'defense',
	'petaya-berry': 'special-attack',
	'apicot-berry': 'special-defense',
	'micle-berry': 'accuracy',
	'custap-berry': 'speed',
};
/**
 * These berries make pokemon happier, but reduce their evs
 */
export const happinessBerries: Partial<Record<ItemType, Stat>> = {
	'pomeg-berry': 'hp',
	'kelpsy-berry': 'attack',
	'qualot-berry': 'defense',
	'hondew-berry': 'special-attack',
	'grepa-berry': 'special-defense',
	'tamato-berry': 'speed',
};
export const cookingBerries: BerryType[] = [
	'bluk-berry',
	'nanab-berry',
	'razz-berry',
	'wepear-berry',
	'pinap-berry',
	'cornn-berry',
	'rabuta-berry',
	'nomel-berry',
	'magost-berry',
	'spelon-berry',
	'durin-berry',
	'watmel-berry',
	'pamtre-berry',
	'belue-berry',
	'silver-razz-berry',
	'golden-razz-berry',
	'silver-nanab-berry',
	'golden-nanab-berry',
	'silver-pinap-berry',
	'golden-pinap-berry',
];

export const XItemTable: Partial<Record<XItemType, Stat>> = {
	'x-accuracy': 'accuracy',
	'x-attack': 'attack',
	'x-sp-def': 'special-defense',
	'x-sp-atk': 'special-attack',
	'x-defense': 'defense',
	'x-speed': 'speed',
};

export const fossilTable: Partial<Record<PokemonName, FossilType[]>> = {
	omanyte: ['helix-fossil'],
	kabuto: ['dome-fossil'],
	aerodactyl: ['old-amber'],
	lileep: ['root-fossil'],
	anorith: ['claw-fossil'],
	cranidos: ['skull-fossil'],
	shieldon: ['armor-fossil'],
	tirtouga: ['cover-fossil'],
	archen: ['plume-fossil'],
	tyrunt: ['jaw-fossil'],
	amaura: ['sail-fossil'],
	dracozolt: ['fossilized-bird', 'fossilized-drake'],
	dracovish: ['fossilized-fish', 'fossilized-drake'],
	arctozolt: ['fossilized-bird', 'fossilized-dino'],
	arctovish: ['fossilized-fish', 'fossilized-dino'],
};
export const apricornTable: Record<ApricornType, PokeballType> = {
	'black-apricorn': 'dusk-ball',
	'blue-apricorn': 'net-ball',
	'green-apricorn': 'nest-ball',
	'pink-apricorn': 'luxury-ball',
	'red-apricorn': 'fast-ball',
	'white-apricorn': 'heavy-ball',
	'yellow-apricorn': 'quick-ball',
};
export const getRandomItem = () => {
	return itemTypes[getRandomIndex(itemTypes.length)];
};
export const getRandomBall = () => {
	return balltypes[getRandomIndex(balltypes.length)];
};
export const pickupTable: ItemType[] = [
	...berries.filter((b) => b !== 'enigma-berry'),
	...apricorns,
	...herbs,
	'berry-juice',
	'old-gateau',
	'energy-powder',
	'energy-root',
	'lava-cookie',
	'revival-herb',
	'rare-candy',
	'big-malasada',
];
export const undergroundTable: ItemType[] = [
	...valuables,
	...evoStones,
	...evoStones,
	...heldItems,
	...expCandies,
	'hp-up',
	'calcium',
	'zinc',
	'iron',
	'protein',
	'carbos',
];
export const superEffectiveSaveTable: Record<PokemonType, ItemType> = {
	fire: 'occa-berry',
	water: 'passho-berry',
	electric: 'wacan-berry',
	grass: 'rindo-berry',
	ice: 'yache-berry',
	fighting: 'chople-berry',
	poison: 'kebia-berry',
	ground: 'shuca-berry',
	flying: 'coba-berry',
	psychic: 'payapa-berry',
	bug: 'tanga-berry',
	rock: 'charti-berry',
	ghost: 'kasib-berry',
	dragon: 'haban-berry',
	dark: 'colbur-berry',
	steel: 'babiri-berry',
	normal: 'chilan-berry',
	fairy: 'roseli-berry',
	typeless: 'odd-keystone',
};
export const typeBoostItemTable: Record<PokemonType, ItemType[]> = {
	fire: ['charcoal', 'flame-plate'],
	water: ['sea-incense', 'mystic-water', 'splash-plate', 'wave-incense'],
	electric: ['magnet', 'zap-plate'],
	grass: ['miracle-seed', 'meadow-plate', 'rose-incense'],
	ice: ['never-melt-ice', 'icicle-plate'],
	fighting: ['black-belt', 'fist-plate'],
	poison: ['poison-barb', 'toxic-plate'],
	ground: ['soft-sand', 'earth-plate'],
	flying: ['sharp-beak', 'sky-plate'],
	psychic: ['twisted-spoon', 'mind-plate', 'odd-incense'],
	bug: ['silver-powder', 'insect-plate'],
	rock: ['hard-stone', 'stone-plate', 'rock-incense'],
	ghost: ['spell-tag', 'spooky-plate'],
	dragon: ['dragon-fang', 'draco-plate'],
	dark: ['black-glasses', 'dread-plate'],
	steel: ['metal-coat', 'iron-plate'],
	normal: ['silk-scarf'],
	fairy: ['cherish-ball', 'pixie-plate'],
	typeless: ['cherish-ball'],
};
export const gemTable: Partial<Record<ItemType, PokemonType>> = {
	'fire-gem': 'fire',
	'water-gem': 'water',
	'electric-gem': 'electric',
	'grass-gem': 'grass',
	'ice-gem': 'ice',
	'fighting-gem': 'fighting',
	'poison-gem': 'poison',
	'ground-gem': 'ground',
	'flying-gem': 'flying',
	'psychic-gem': 'psychic',
	'bug-gem': 'bug',
	'rock-gem': 'rock',
	'ghost-gem': 'ghost',
	'dark-gem': 'dark',
	'steel-gem': 'steel',
	'dragon-gem': 'dragon',
	'normal-gem': 'normal',
	'fairy-gem': 'fairy',
};

export const expCandyTable: Partial<Record<ItemType, number>> = {
	'exp-candy-xs': 100,
	'exp-candy-s': 800,
	'exp-candy-m': 3000,
	'exp-candy-l': 10000,
	'exp-candy-xl': 30000,
};
