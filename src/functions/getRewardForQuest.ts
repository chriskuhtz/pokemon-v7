import { Inventory } from '../interfaces/Inventory';
import { Quest } from '../interfaces/Quest';
import { randomQuestRewards } from '../modules/Settings/Settings';
import { KumaQuestName, KumaQuestsRecord } from '../versions/kuma/questsRecord';

export const getRewardItemsForQuest = (
	q: KumaQuestName
): Partial<Inventory> => {
	const quest = KumaQuestsRecord[q];
	const randomizedRewards = window.localStorage.getItem(randomQuestRewards);
	const parsed = (
		randomizedRewards ? JSON.parse(randomizedRewards) : {}
	) as Record<KumaQuestName, Quest>;

	if (randomizedRewards && parsed[q]) {
		return parsed[q].rewardItems;
	}

	return quest.rewardItems;
};
