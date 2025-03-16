import { CampUpgrade } from '../constants/checkLists/campUpgrades';
import { QuestName } from '../constants/checkLists/questsRecord';
import { Inventory } from './Inventory';
import { SaveFile } from './SaveFile';

export type QuestStatus = 'INACTIVE' | 'ACTIVE' | 'COLLECTED' | 'FULFILLED';

export type QuestKind = 'BULLETIN' | 'QUEST_LINE';

export interface Quest {
	rewardItems: Partial<Inventory>;
	researchPoints: number;
	conditionFunction: (saveFile: SaveFile) => boolean;
	kind: QuestKind;
	availableAfter?: QuestName;
	requiredUpgrade?: CampUpgrade;
}
