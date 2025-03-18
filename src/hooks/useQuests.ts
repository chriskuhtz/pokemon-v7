import { useContext, useMemo } from 'react';
import { QuestName, QuestsRecord } from '../constants/checkLists/questsRecord';
import { QuestStatus } from '../interfaces/Quest';
import { SaveFileContext } from './useSaveFile';

export const useQuests = (): {
	all: { name: QuestName; status: QuestStatus }[];
	numberOfUncollected: number;
} => {
	const { saveFile } = useContext(SaveFileContext);

	const quests = useMemo(
		() =>
			Object.entries(QuestsRecord).map(([name, quest]) => {
				const status = saveFile.quests[name as QuestName];

				const fulfilled =
					quest.conditionFunction(saveFile) && status === 'ACTIVE';
				if (fulfilled) {
					return { name, status: 'FULFILLED' };
				}

				return { name, status };
			}) as { name: QuestName; status: QuestStatus }[],
		[saveFile]
	);

	return {
		all: quests,
		numberOfUncollected: quests.filter((q) => q.status === 'FULFILLED').length,
	};
};
