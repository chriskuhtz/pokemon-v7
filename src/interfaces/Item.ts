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
] as const;
export const balltypes = [
	'master-ball',
	'poke-ball',
	'ultra-ball',
	'great-ball',
	'safari-ball',
	'net-ball',
	'dive-ball',
	'nest-ball',
	'repeat-ball',
	'timer-ball',
	'luxury-ball',
	'dusk-ball',
	'heal-ball',
	'quick-ball',
	'cherish-ball',
	'premier-ball',
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

export const herbs = ['white-herb', 'mental-herb'] as const;
export const encounterChanceItems = [
	'white-flute',
	'black-flute',
	'repel',
	'max-repel',
	'super-repel',
] as const;
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
] as const;
export const valuables = [
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
] as const;
export const mulches = [
	'growth-mulch',
	'damp-mulch',
	'stable-mulch',
	'gooey-mulch',
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
	'root-fossil',
	'claw-fossil',
	'helix-fossil',
	'dome-fossil',
	'armor-fossil',
	'skull-fossil',
	'cover-fossil',
	'plume-fossil',
	'jaw-fossil',
	'sail-fossil',
] as const;
export const keyItems = ['exp-share', 'poke-flute'] as const;
export const itemTypes = [
	...apricorns,
	...balltypes,
	...healingItemTypes,
	...ppRestorationItemTypes,
	...ppBoostItemTypes,
	...evBoostItemTypes,
	...xItemTypes,
	...runawayItemTypes,
	...encounterChanceItems,
	...evoStones,
	...heldItems,
	...valuables,
	...mulches,
	...berries,
	...fossils,
	...herbs,
	...keyItems,
	'sacred-ash',
	'rare-candy',
	'escape-rope',
	'honey',
] as const;

export type ItemType = (typeof itemTypes)[number];
export type PokeballType = (typeof balltypes)[number];
export type HealingItemType = (typeof healingItemTypes)[number];
export type PPRestoringItemType = (typeof ppRestorationItemTypes)[number];
export type PPBoostItemType = (typeof ppBoostItemTypes)[number];
export type EvBoostItemType = (typeof evBoostItemTypes)[number];
export type XItemType = (typeof xItemTypes)[number];
export type RunawayItem = (typeof runawayItemTypes)[number];
export type EncounterChanceItem = (typeof encounterChanceItems)[number];
export type BerryType = (typeof berries)[number];
export type MulchType = (typeof mulches)[number];
export type FossilType = (typeof fossils)[number];
export type ValuableType = (typeof valuables)[number];
export type ApricornType = (typeof apricorns)[number];
export type HerbType = (typeof herbs)[number];
export type KeyItemType = (typeof keyItems)[number];

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
export function isEncounterChanceItem(
	x: string | undefined
): x is EncounterChanceItem {
	return (encounterChanceItems as unknown as string[]).includes(x ?? '');
}
export function isItem(x: string | undefined): x is ItemType {
	return (itemTypes as unknown as string[]).includes(x ?? '');
}
export const hasEndOfTurnEffect = (item: ItemType): boolean => {
	if (isBerry(item) || item === 'berry-juice' || isHerb(item)) {
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
};
export const HPHealTable: Partial<Record<ItemType, number>> = {
	'oran-berry': 10,
	potion: 20,
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
export const fossilTable: Record<FossilType, PokemonName> = {
	'helix-fossil': 'omanyte',
	'dome-fossil': 'kabuto',
	'old-amber': 'aerodactyl',
	'root-fossil': 'lileep',
	'claw-fossil': 'anorith',
	'skull-fossil': 'cranidos',
	'armor-fossil': 'shieldon',
	'cover-fossil': 'tirtouga',
	'plume-fossil': 'archen',
	'jaw-fossil': 'tyrunt',
	'sail-fossil': 'amaura',
};
export const apricornTable: Record<ApricornType, PokeballType> = {
	'black-apricorn': 'dusk-ball',
	'blue-apricorn': 'net-ball',
	'green-apricorn': 'nest-ball',
	'pink-apricorn': 'luxury-ball',
	'red-apricorn': 'heal-ball',
	'white-apricorn': 'timer-ball',
	'yellow-apricorn': 'quick-ball',
};
export const getRandomItem = () => {
	return itemTypes[getRandomIndex(itemTypes.length)];
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
	'soothe-bell',
	'cleanse-tag',
	'big-malasada',
];
export const undergroundTable: ItemType[] = [
	...valuables,
	...evoStones,
	...evBoostItemTypes,
	...fossils,
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
export const typeBoostItemTable: Record<PokemonType, ItemType> = {
	fire: 'cherish-ball',
	water: 'cherish-ball',
	electric: 'cherish-ball',
	grass: 'cherish-ball',
	ice: 'cherish-ball',
	fighting: 'cherish-ball',
	poison: 'cherish-ball',
	ground: 'cherish-ball',
	flying: 'cherish-ball',
	psychic: 'cherish-ball',
	bug: 'silver-powder',
	rock: 'cherish-ball',
	ghost: 'cherish-ball',
	dragon: 'cherish-ball',
	dark: 'cherish-ball',
	steel: 'metal-coat',
	normal: 'cherish-ball',
	fairy: 'cherish-ball',
	typeless: 'cherish-ball',
};
