import { BattleAttack } from './BattleAttack';
import { OwnedPokemon } from './OwnedPokemon';
import { PokemonData } from './PokemonData';
import { StatObject } from './StatObject';

export interface BattlePokemon extends OwnedPokemon {
	stats: StatObject;
	firstMove: BattleAttack;
	data: PokemonData;
}
