import { CampUpgrade } from '../constants/gameData/campUpgrades';
import { MapId } from '../constants/gameData/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { KumaQuestName } from '../versions/kuma/questsRecord';
import { BadgeName } from './Badge';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';
import { CatchBoosts, SaveFile } from './SaveFile';

export type QuestStatus = 'INACTIVE' | 'ACTIVE' | 'COLLECTED' | 'FULFILLED';

export type QuestKind = 'BULLETIN' | 'QUEST_LINE';

export const questCategories = [
	'EXPLORATION',
	'RESEARCH',
	'BATTLE',
	'TRAINING',
	'POKEDEX',
	'GYM LEADER',
	'TRAVELLING TRAINER',
] as const;
export type QuestCategory = (typeof questCategories)[number];

export interface Quest {
	//meta
	kind: QuestKind;
	category: QuestCategory;
	availableAfter?: KumaQuestName;
	requiredUpgrade?: CampUpgrade;
	progress?: (s: SaveFile) => { current: number; goal: number };
	//rewards
	rewardItems: Partial<Inventory>;
	rewardPokemon?: OwnedPokemon;
	researchPoints: number;
	rangerLevels?: number;
	catchBoosts?: Partial<CatchBoosts>;
	campUpgrade?: CampUpgrade;
	badge?: BadgeName;
	//conditions
	conditionFunction: (saveFile: SaveFile) => boolean;
	targetPokemon?: PokemonName[];
	targetRoute?: MapId;
}
