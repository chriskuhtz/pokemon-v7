export interface PrimaryAilment {
	type: 'paralysis' | 'burn' | 'freeze' | 'poison' | 'toxic' | 'sleep';
}

export function isPrimaryAilment(x: { type: string }): x is PrimaryAilment {
	return ['paralysis', 'burn', 'freeze', 'poison', 'sleep'].includes(x.type);
}

export interface SecondaryAilment {
	type: 'confusion' | 'trap' | 'infatuation' | 'dire-hit' | 'leech-seed';
	duration: number;
}

export function isSecondaryAilment(x: { type: string }): x is SecondaryAilment {
	return ['confusion', 'trap', 'infatuation', 'leech-seed'].includes(x.type);
}

export const PARA_CHANCE = 0.25;
export const PARA_SPEED_FACTOR = 0.5;
export const BURN_DAMAGE_FACTOR = 1 / 8;
export const BURN_ATTACK_REDUCTION_FACTOR = 0.5;
export const SANDSTORM_DAMAGE_FACTOR = 1 / 16;
export const POISON_DAMAGE_FACTOR = 1 / 16;
export const UNFREEZE_CHANCE = 0.1;
export const WAKEUP_CHANCE = 0.2;
export const CONFUSION_HURT_CHANCE = 0.33;
export const CONFUSION_POWER = 40;
export const TRAP_DAMAGE_FACTOR = 1 / 8;
export const LEECH_DAMAGE_FACTOR = 1 / 8;

//contact ability factors
export const STATIC_CHANCE = 0.3;
