import { MoveName } from '../constants/checkLists/movesCheckList';
import { PokemonType } from './PokemonType';

export const primaryAilments = [
	'paralysis',
	'burn',
	'freeze',
	'poison',
	'toxic',
	'sleep',
] as const;

export type PrimaryAilmentType = (typeof primaryAilments)[number];
export interface PrimaryAilment {
	type: PrimaryAilmentType;
	duration?: number;
}

export function isPrimaryAilment(x: { type: string }): x is PrimaryAilment {
	return ['paralysis', 'burn', 'freeze', 'poison', 'sleep', 'toxic'].includes(
		x.type
	);
}

const secondaryAilments = [
	'confusion',
	'trap',
	'infatuation',
	'leech-seed',
	'leeching-on',
	'flash-fire',
	'color-changed',
	'guard-spec',
	'dire-hit',
	'disable',
	'raging',
	'focused',
	'mind-read',
	'nightmare',
	'cursed',
	'unburdened',
	'foresighted',
	'destiny-bonded',
	'perish-songed',
] as const;

export type SecondaryAilmentType = (typeof secondaryAilments)[number];
export interface SecondaryAilment {
	type: SecondaryAilmentType;
	duration: number;
	newType?: PokemonType; // for color change
	move?: MoveName; // For Disable
	healAmount?: number; // for leech seed
	targetId?: string;
	by?: string; // for mind read
}

export function isSecondaryAilment(x: { type: string }): x is SecondaryAilment {
	return secondaryAilments.some((s) => s === x.type);
}

export type AilmentType = PrimaryAilmentType | SecondaryAilmentType;

export const PARA_CHANCE = 0.25;
export const INFATUATION_CHANCE = 0.5;
export const PARA_SPEED_FACTOR = 0.5;
export const BURN_DAMAGE_FACTOR = 1 / 8;
export const BURN_ATTACK_REDUCTION_FACTOR = 0.5;
export const SANDSTORM_DAMAGE_FACTOR = 1 / 16;
export const HAIL_DAMAGE_FACTOR = 1 / 16;
export const DRY_SKIN_DAMAGE_FACTOR = 1 / 8;
export const SOLAR_POWER_DAMAGE_FACTOR = 1 / 8;
export const POISON_DAMAGE_FACTOR = 1 / 16;
export const UNFREEZE_CHANCE = 0.1;
export const WAKEUP_CHANCE = 0.2;
export const CONFUSION_HURT_CHANCE = 0.33;
export const CONFUSION_POWER = 40;
export const TRAP_DAMAGE_FACTOR = 1 / 8;
export const LEECH_DAMAGE_FACTOR = 1 / 8;
export const ROUGH_SKIN_FACTOR = 1 / 16;
export const RAIN_DISH_FACTOR = 1 / 16;
export const NIGHTMARE_DAMAGE_FACTOR = 1 / 4;
export const CURSE_DAMAGE_FACTOR = 1 / 4;

//contact ability factors
export const STATIC_CHANCE = 0.3;
export const POISON_POINT_CHANCE = 0.3;
export const FLAME_BODY_CHANCE = 0.3;
export const CUTE_CHARM_CHANCE = 0.3;
export const EFFECT_SPORE_CHANCE = 0.1;

//shed skin
export const SHED_SKIN_CHANCE = 0.3;

//effect factors
export const SPIKES_FACTOR = 1 / 8;
