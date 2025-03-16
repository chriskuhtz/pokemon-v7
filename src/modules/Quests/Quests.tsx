import React, { useContext, useEffect } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import {
	QuestName,
	QuestsRecord,
} from '../../constants/checkLists/questsRecord';
import { battleSpriteSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { getRewardForQuest } from '../../functions/getRewardForQuest';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { ItemType } from '../../interfaces/Item';
import { QuestStatus } from '../../interfaces/Quest';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Quests = ({ goBack }: { goBack: () => void }) => {
	const { addMessage } = useContext(MessageQueueContext);
	const {
		saveFile,
		fulfillQuestReducer: fulfillQuest,
		patchSaveFileReducer,
	} = useContext(SaveFileContext);
	const { quests } = saveFile;

	useEffect(() => {
		//Migrate new quests
		if (Object.entries(QuestsRecord).length > Object.entries(quests).length) {
			const migratedQuests = Object.fromEntries(
				Object.entries(QuestsRecord).map(([qn]) => {
					const q = qn as QuestName;
					const status = quests[q] ?? 'INACTIVE';
					return [q, status];
				})
			) as Record<QuestName, QuestStatus>;
			patchSaveFileReducer({
				quests: migratedQuests,
			});
		}
	}, [patchSaveFileReducer, quests]);
	if (Object.values(quests).filter((v) => v !== 'INACTIVE').length === 0) {
		return (
			<Page headline={'Quests:'} goBack={goBack}>
				Talk to the people in the camp to start quests
			</Page>
		);
	}

	return (
		<Page headline={'Quests:'} goBack={goBack}>
			<Stack mode="column">
				{Object.entries(QuestsRecord).map(([n, quest]) => {
					const name = n as QuestName;
					const status = quests[name];
					const fulfilled = quest.conditionFunction(saveFile);
					const collected = status === 'COLLECTED';
					const active = status === 'ACTIVE' && !fulfilled;

					if (status === 'INACTIVE' || status === 'COLLECTED') {
						return <React.Fragment key={name}></React.Fragment>;
					}

					return (
						<Card
							key={name}
							icon={<MdCatchingPokemon size={battleSpriteSize} />}
							content={
								<div>
									<h3>{name}</h3>
									{fulfilled && !collected && <h4>ready to collect</h4>}
									{collected && <h4>COLLECTED</h4>}
									<h5 style={{ display: 'flex', alignItems: 'center' }}>
										Reward:
										{Object.entries(getRewardForQuest(name)).map(
											([item, amount]) => (
												<React.Fragment key={item}>
													{amount} x <img src={getItemUrl(item as ItemType)} />
												</React.Fragment>
											)
										)}
									</h5>
									<h5>Research Points: {quest.researchPoints}</h5>
								</div>
							}
							actionElements={[
								fulfilled && !collected && (
									<button
										style={{ borderRadius: 9000 }}
										onClick={() => {
											addMessage({
												message: `Earned ${quest.researchPoints} Research Points`,
												needsNoConfirmation: true,
											});
											fulfillQuest(name);
										}}
										role="button"
										tabIndex={0}
										onKeyDown={(e) => {
											e.stopPropagation();
											if (e.key === 'Enter') {
												addMessage({
													message: `Earned ${quest.researchPoints} Research Points`,
													needsNoConfirmation: true,
												});
												fulfillQuest(name as QuestName);
											}
										}}
									>
										Collect Reward
									</button>
								),
								collected && <button>Collected</button>,
								active && <button>Active</button>,
							].filter((x) => !!x)}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
