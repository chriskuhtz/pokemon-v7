import { PokemonName } from '../constants/pokemonNames';
import { getRandomIndex } from '../functions/filterTargets';
import { AilmentType, primaryAilments } from './Ailment';
import { Nature } from './Natures';
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
	'metal-coat',
	'oval-stone',
	'adamant-orb',
	'lustrous-orb',
	'bright-powder',
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
export type ApricornType = (typeof apricorns)[number];

export function isPokeball(x: string | undefined): x is PokeballType {
	return (balltypes as unknown as string[]).includes(x ?? '');
}
export function isApricorn(x: string | undefined): x is ApricornType {
	return (apricorns as unknown as string[]).includes(x ?? '');
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
	if (isBerry(item) || item === 'berry-juice') {
		return true;
	}
	return false;
};

//TODO: implement limits, e.g. hp up cant improve over 100
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
};
export const cookingBerries: BerryType[] = ['bluk-berry'];

export const AilmentHealTable: Partial<Record<ItemType, AilmentType[]>> = {
	'full-heal': [...primaryAilments, 'confusion'],
	'full-restore': [...primaryAilments, 'confusion'],
	'old-gateau': [...primaryAilments, 'confusion'],
	'lava-cookie': [...primaryAilments, 'confusion'],
	'lum-berry': [...primaryAilments, 'confusion'],
	antidote: ['poison', 'toxic'],
	'pecha-berry': ['poison', 'toxic'],
	'burn-heal': ['burn'],
	'rawst-berry': ['burn'],
	'paralyze-heal': ['paralysis'],
	'cheri-berry': ['paralysis'],
};

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
	'blue-apricorn': 'dive-ball',
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
	...berries,
	...apricorns,
	'berry-juice',
	'old-gateau',
	'energy-powder',
	'energy-root',
	'lava-cookie',
	'revival-herb',
	'rare-candy',
];
export const undergroundTable: ItemType[] = [
	...evoStones,
	...evBoostItemTypes,
	...fossils,
];
