import { CampUpgrade } from '../constants/checkLists/campUpgrades';
import { QuestName } from '../constants/checkLists/questsRecord';
import { MapId } from '../constants/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';
import { SaveFile } from './SaveFile';

export type QuestStatus = 'INACTIVE' | 'ACTIVE' | 'COLLECTED' | 'FULFILLED';

export type QuestKind = 'BULLETIN' | 'QUEST_LINE';

export interface Quest {
	rewardItems: Partial<Inventory>;
	rewardPokemon?: OwnedPokemon;
	researchPoints: number;
	conditionFunction: (saveFile: SaveFile) => boolean;
	kind: QuestKind;
	availableAfter?: QuestName;
	requiredUpgrade?: CampUpgrade;
	targetPokemon?: PokemonName[];
	targetRoute?: MapId;
}
