import { QuestName, QuestsRecord } from '../constants/checkLists/questsRecord';
import { Inventory } from '../interfaces/Inventory';
import { Quest } from '../interfaces/Quest';
import { randomQuestRewards } from '../modules/Settings/Settings';

export const getRewardForQuest = (q: QuestName): Partial<Inventory> => {
	const quest = QuestsRecord[q];
	const randomizedRewards = window.localStorage.getItem(randomQuestRewards);
	const parsed = (
		randomizedRewards ? JSON.parse(randomizedRewards) : {}
	) as Record<QuestName, Quest>;

	return randomizedRewards ? parsed[q].rewardItems : quest.rewardItems;
};
