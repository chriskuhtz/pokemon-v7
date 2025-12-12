import { useContext, useMemo } from 'react';
import { QuestStatus } from '../interfaces/Quest';
import { KumaQuestName, KumaQuestsRecord } from '../versions/kuma/questsRecord';
import { SaveFileContext } from './useSaveFile';

export const useQuests = (): {
	all: { name: KumaQuestName; status: QuestStatus }[];
	numberOfUncollected: number;
} => {
	const { saveFile } = useContext(SaveFileContext);

	const quests = useMemo(
		() =>
			Object.entries(KumaQuestsRecord).map(([name, quest]) => {
				const status = saveFile.quests[name as KumaQuestName];

				const fulfilled =
					quest.conditionFunction(saveFile) && status === 'ACTIVE';
				if (fulfilled) {
					return { name, status: 'FULFILLED' };
				}

				return { name, status };
			}) as { name: KumaQuestName; status: QuestStatus }[],
		[saveFile]
	);

	return {
		all: quests,
		numberOfUncollected: quests.filter((q) => q.status === 'FULFILLED').length,
	};
};
