import { SecondaryAilment } from './Ailment';
import { BattleAction } from './BattleActions';
import { DamageClass, MoveDto } from './Move';
import { OwnedPokemon, OwnedPokemonMove } from './OwnedPokemon';
import { PokemonData } from './PokemonData';
import { StatObject } from './StatObject';

export interface BattleMove extends OwnedPokemonMove {
	data: MoveDto;
}
export interface BattlePokemon extends OwnedPokemon {
	stats: StatObject;
	firstMove: BattleMove;
	secondMove?: BattleMove;
	thirdMove?: BattleMove;
	fourthMove?: BattleMove;
	data: PokemonData;
	statBoosts: StatObject;
	capture_rate: number;
	secondaryAilments: SecondaryAilment[];
	moveQueue: BattleAction[];
	status:
		| 'ONFIELD'
		| 'BENCH'
		| 'CATCHING_1'
		| 'CATCHING_2'
		| 'CATCHING_3'
		| 'CAUGHT'
		| 'FAINTED';
	roundsInBattle: number;
	caughtBefore: boolean;
	lastReceivedDamage?: {
		damageClass: DamageClass['name'];
		damage: number;
		applicatorId: string;
	};
}

export function isBattlePokemon(
	x: OwnedPokemon | BattlePokemon
): x is BattlePokemon {
	// eslint-disable-next-line no-prototype-builtins
	return x.hasOwnProperty('moveQueue');
}
