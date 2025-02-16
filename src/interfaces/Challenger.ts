import { BattlePokemon } from './BattlePokemon';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';

export interface Challenger {
	type: 'TRAINER' | 'WILD';
	team: OwnedPokemon[];
	id: string;
	inventory: Inventory;
	fighersPerSide?: number;
}

export interface BattleChallenger {
	type: 'TRAINER' | 'WILD';
	team: BattlePokemon[];
	id: string;
	inventory: Inventory;
	fighersPerSide?: number;
}
