import { Inventory } from './Inventory';
import { SaveFile } from './SaveFile';

export const questNames = ['catch-pikachu'] as const;
export type QuestName = (typeof questNames)[number];
export type QuestStatus = 'INACTIVE' | 'ACTIVE' | 'COLLECTED';

export interface Quest {
	rewardItems: Partial<Inventory>;
	conditionFunction: (saveFile: SaveFile) => boolean;
}
export const QuestsRecord: Record<QuestName, Quest> = {
	'catch-pikachu': {
		rewardItems: { 'quick-ball': 5 },
		conditionFunction: (s) => {
			return s.pokemon.some((p) => p.dexId === 25);
		},
	},
};
