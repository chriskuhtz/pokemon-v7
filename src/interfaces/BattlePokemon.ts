import { AbilityName } from '../constants/checkLists/abilityCheckList';
import { MoveName } from '../constants/checkLists/movesCheckList';
import { SecondaryAilment } from './Ailment';
import { BattleAction, BattleAttack } from './BattleActions';
import { MoveDto } from './Move';
import { OwnedPokemon, OwnedPokemonMove } from './OwnedPokemon';
import { PokemonData } from './PokemonData';
import { StatObject } from './StatObject';

export interface BattleMove extends OwnedPokemonMove {
	data: MoveDto;
}
export interface BattlePokemon extends OwnedPokemon {
	stats: StatObject;
	evAwards: StatObject;
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
	lastReceivedDamage?: {
		damage: number;
		applicatorId: string;
		wasSuperEffective: boolean;
		wasSpecial: boolean;
		wasPhysical: boolean;
		attack: BattleAttack;
	};

	lastUsedMove?: BattleMove;
	putMimicbacktoSlot?: number;
	initAbility: AbilityName;
	biding?: {
		turn: number;
		damage: number;
	};
	participatedInBattle: boolean;
	choiceBandedMove?: MoveName;
}

export function isBattlePokemon(
	x: OwnedPokemon | BattlePokemon
): x is BattlePokemon {
	// eslint-disable-next-line no-prototype-builtins
	return x.hasOwnProperty('moveQueue');
}
