import { BattlePokemon } from '../interfaces/BattlePokemon';
import { hasAilment } from './hasAilment';

export const isTrapped = (p: BattlePokemon): boolean => hasAilment(p, 'trap');
export const isBindingBanded = (p: BattlePokemon): boolean =>
	p?.secondaryAilments.some((a) => a.type === 'trap' && a.bindingBanded);

export const isLeechSeeded = (p: BattlePokemon): boolean =>
	hasAilment(p, 'leech-seed');

export const leechingOn = (p: BattlePokemon): number[] =>
	p?.secondaryAilments
		.filter((a) => a.type === 'leeching-on' && a.healAmount)
		.map((a) => a.healAmount)
		.filter((a) => a !== undefined) ?? [];
