import { BattleAttack } from './BattleAttack';
import { OwnedPokemon } from './OwnedPokemon';
import { PokemonData } from './PokemonData';
import { StatObject } from './StatObject';

export interface BattlePokemon extends OwnedPokemon {
	stats: StatObject;
	firstMove: BattleAttack;
	secondMove?: BattleAttack;
	thirdMove?: BattleAttack;
	fourthMove?: BattleAttack;
	data: PokemonData;
	statBoosts: StatObject;
	capture_rate: number;
}
