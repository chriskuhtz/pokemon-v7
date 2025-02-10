import { MoveDto } from './Move';
import { OwnedPokemonMove } from './OwnedPokemon';

export type BattleAttack = OwnedPokemonMove & {
	data: MoveDto;
	type: 'BattleAttack';
	crit?: boolean;
	multiHits?: number;
};
