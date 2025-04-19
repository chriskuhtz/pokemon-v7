import { BattlePokemon } from '../interfaces/BattlePokemon';

export const isTrapped = (p: BattlePokemon): boolean =>
	p?.secondaryAilments.some((a) => a.type === 'trap');
export const isBindingBanded = (p: BattlePokemon): boolean =>
	p?.secondaryAilments.some((a) => a.type === 'trap' && a.bindingBanded);

export const isLeechSeeded = (p: BattlePokemon): boolean =>
	p?.secondaryAilments.some((a) => a.type === 'leech-seed');

export const leechingOn = (p: BattlePokemon): number[] =>
	p?.secondaryAilments
		.filter((a) => a.type === 'leeching-on' && a.healAmount)
		.map((a) => a.healAmount)
		.filter((a) => a !== undefined) ?? [];
