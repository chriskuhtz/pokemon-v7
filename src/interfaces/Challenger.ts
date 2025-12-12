import { CampUpgrade } from '../constants/gameData/campUpgrades';
import { BattleTeamConfig } from '../hooks/useGetBattleTeam';
import { KumaQuestName } from '../versions/kuma/questsRecord';
import { BattlePokemon } from './BattlePokemon';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';

export interface TrainerInfo {
	id: string;
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
	availableAfter?: KumaQuestName;
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
