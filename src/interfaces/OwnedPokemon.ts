import { AbilityName } from '../constants/checkLists/abilityCheckList';

import { MoveName } from '../constants/checkLists/movesCheckList';
import { MapId } from '../constants/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { PrimaryAilment } from './Ailment';
import { ItemType, PokeballType } from './Item';
import { Nature } from './Natures';
import { StatObject } from './StatObject';

export interface OwnedPokemonMove {
	name: MoveName;
	usedPP: number;
}
export interface PPBoostedMove {
	name: MoveName;
	stage: number;
}

export type PokemonGender = 'MALE' | 'FEMALE' | 'GENDERLESS';

export interface OwnedPokemon {
	name: PokemonName;
	id: string;
	onTeam?: boolean;
	damage: number;
	ownerId: string;
	firstMove: OwnedPokemonMove;
	secondMove?: OwnedPokemonMove;
	thirdMove?: OwnedPokemonMove;
	fourthMove?: OwnedPokemonMove;
	primaryAilment?: PrimaryAilment;
	ball: PokeballType;
	nature: Nature;
	xp: number;
	ability: AbilityName;
	//shiny?: boolean;
	happiness: number;
	//Overflows between 0 and 255, adds happiness at 255
	stepsWalked: number;
	heldItemName?: ItemType;
	maxHp: number;
	effortValues: StatObject;
	//intrinsicValues: StatObject;
	ppBoostedMoves: PPBoostedMove[];
	caughtOnMap: MapId;
	nickname?: string;
	gender: PokemonGender;
	weightModifier?: number;
	heightModifier?: number;
}
