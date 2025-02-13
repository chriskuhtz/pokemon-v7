import { BattlePokemon } from './BattlePokemon';
import { PokeballType } from './Item';
import { MoveDto } from './Move';
import { OwnedPokemonMove } from './OwnedPokemon';

export type BattleAttack = OwnedPokemonMove & {
	data: MoveDto;
	type: 'BattleAttack';
	crit?: boolean;
	multiHits?: number;
};
export interface CatchProcessInfo {
	pokemon: BattlePokemon;
	ball: PokeballType;
	type: 'CatchProcessInfo';
}
export type ChargeUp = OwnedPokemonMove & {
	type: 'ChargeUp';
	data: MoveDto;
	crit?: boolean;
};

export type BattleAction = CatchProcessInfo | BattleAttack | ChargeUp;
