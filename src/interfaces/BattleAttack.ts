import { MoveDto } from './Move';
import { OwnedPokemon } from './OwnedPokemon';

export type BattleAttack = OwnedPokemon['firstMove'] & {
	data: MoveDto;
	type: 'BattleAttack';
};
