import { AbilityName } from '../constants/checkLists/abilityCheckList';
import { MoveName } from '../constants/checkLists/movesCheckList';
import { PokeballType } from './Item';
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
	//primaryAilment?: PrimaryAilment;
	ball: PokeballType;
	nature: Nature;
	xp: number;
	ability: AbilityName;
	//shiny?: boolean;
	//friendship: number;
	//heldItemName?: ItemType;
	//effortValues: StatObject;
	//intrinsicValues: StatObject;
	//ppBoostedMoves: PPBoostedMove[];
}
