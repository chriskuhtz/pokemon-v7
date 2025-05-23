import { CampUpgrade } from '../constants/campUpgrades';
import { QuestName } from '../constants/questsRecord';
import { BattleTeamConfig } from '../hooks/useGetBattleTeam';
import { BattlePokemon } from './BattlePokemon';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';

export interface TrainerInfo {
	name: string;
	sprite: string;
	profilePicture?: string;
	spriteGeneration?: 1;
}
export interface Challenger {
	type: 'TRAINER' | 'WILD';
	team: OwnedPokemon[];
	id: string;
	inventory: Inventory;
	trainer?: TrainerInfo;
	availableAfter?: QuestName;
	requiredUpgrade?: CampUpgrade;
	rewardItems?: Partial<Inventory>;
	battleTeamConfig?: BattleTeamConfig;
}

export interface BattleChallenger {
	type: 'TRAINER' | 'WILD';
	team: BattlePokemon[];
	id: string;
	inventory: Inventory;
}
