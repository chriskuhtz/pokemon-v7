import { PokeballType } from './Item';
import { Nature } from './Natures';

export interface OwnedPokemon {
	dexId: number;
	id: string;
	onTeam?: boolean;
	//xp: number;
	damage: number;
	ownerId: string;
	firstMove: { name: string; usedPP: number };
	//ability: Ability;
	//primaryAilment?: PrimaryAilment;
	ball: PokeballType;
	nature: Nature;
	xp: number;
	ability: string;
	//shiny?: boolean;
	//friendship: number;
	//usedPowerPoints: UsedPowerPoints;
	//heldItemName?: ItemType;
	//effortValues: StatObject;
	//ppBoostedMoves: PPBoostedMove[];
}
