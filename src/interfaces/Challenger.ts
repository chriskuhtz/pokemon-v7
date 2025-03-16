import { CampUpgrade } from '../constants/checkLists/campUpgrades';
import { QuestName } from '../constants/checkLists/questsRecord';
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
	availableAfter?: QuestName;
	requiredUpgrade?: CampUpgrade;
}

export interface BattleChallenger {
	type: 'TRAINER' | 'WILD';
	team: BattlePokemon[];
	id: string;
	inventory: Inventory;
}
