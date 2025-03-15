import { Inventory } from './Inventory';
import { SaveFile } from './SaveFile';

export type QuestStatus = 'INACTIVE' | 'ACTIVE' | 'COLLECTED' | 'FULFILLED';

export type QuestKind = 'GENERIC' | 'STORY';

export interface Quest {
	rewardItems: Partial<Inventory>;
	researchPoints: number;
	conditionFunction: (saveFile: SaveFile) => boolean;
	kind: QuestKind;
}
