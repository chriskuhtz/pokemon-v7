import { AbilityName } from '../constants/checkLists/abilityCheckList';
import { MoveName } from '../constants/checkLists/movesCheckList';
import { PrimaryAilment } from './Ailment';
import { ItemType, PokeballType } from './Item';
import { Nature } from './Natures';

export interface OwnedPokemonMove {
	name: MoveName;
	usedPP: number;
}
export interface OwnedPokemon {
	dexId: number;
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
	//effortValues: StatObject;
	//intrinsicValues: StatObject;
	//ppBoostedMoves: PPBoostedMove[];
}
