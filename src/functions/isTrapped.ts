import { BattlePokemon } from '../interfaces/BattlePokemon';

export const isTrapped = (p: BattlePokemon): boolean =>
	p?.secondaryAilments.some((a) => a.type === 'trap');
