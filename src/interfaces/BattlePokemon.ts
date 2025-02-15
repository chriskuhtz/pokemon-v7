import { SecondaryAilment } from './Ailment';
import { BattleAttack } from './BattleActions';
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
	secondaryAilments: SecondaryAilment[];
	flashFired?: boolean;
}

export function isBattlePokemon(
	x: OwnedPokemon | BattlePokemon
): x is BattlePokemon {
	// eslint-disable-next-line no-prototype-builtins
	return x.hasOwnProperty('data');
}
