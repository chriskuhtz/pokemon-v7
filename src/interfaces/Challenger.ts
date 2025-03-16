import { BattlePokemon } from './BattlePokemon';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';

export interface TrainerInfo {
	name: string;
	sprite: string;
}
export interface Challenger {
	type: 'TRAINER' | 'WILD';
	team: OwnedPokemon[];
	id: string;
	inventory: Inventory;
	trainer?: TrainerInfo;
}

export interface BattleChallenger {
	type: 'TRAINER' | 'WILD';
	team: BattlePokemon[];
	id: string;
	inventory: Inventory;
}
