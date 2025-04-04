import React, { useCallback, useContext, useMemo } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import {
	QuestName,
	QuestsRecord,
} from '../../constants/checkLists/questsRecord';
import { battleSpriteSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { getRewardItemsForQuest } from '../../functions/getRewardForQuest';
import { replaceRouteName } from '../../functions/replaceRouteName';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { ItemType } from '../../interfaces/Item';
import { Quest } from '../../interfaces/Quest';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';

export const BulletinBoard = ({ goBack }: { goBack: () => void }) => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, putSaveFileReducer } = useContext(SaveFileContext);
	const { quests, campUpgrades } = saveFile;

	// const activeQuests = useMemo(
	// 	() =>
	// 		Object.keys(QuestsRecord).filter(
	// 			(q) => quests[q as QuestName] === 'ACTIVE'
	// 		),
	// 	[quests]
	// );
	const acceptQuest = useCallback(
		(name: QuestName) => {
			//refactor quest limit
			// if (activeQuests.length >= 3) {
			// 	addMessage({
			// 		message: 'You can only have 3 active Quests at the same time',
			// 	});

			// 	return;
			// }
			addMessage({
				message: `Accepted Quest: ${name}`,
				needsNoConfirmation: true,
			});
			putSaveFileReducer({
				...saveFile,
				quests: { ...saveFile.quests, [name]: 'ACTIVE' },
			});
		},
		[addMessage, putSaveFileReducer, saveFile]
	);

	const availableQuests: { name: QuestName; quest: Quest }[] = useMemo(
		() =>
			Object.entries(QuestsRecord)
				.map(([id, questData]) => {
					if (
						questData.availableAfter &&
						quests[questData.availableAfter] !== 'COLLECTED'
					) {
						return;
					}
					if (
						questData.requiredUpgrade &&
						!campUpgrades[questData.requiredUpgrade]
					) {
						return;
					}
					if (
						questData.kind === 'BULLETIN' &&
						quests[id as QuestName] === 'INACTIVE'
					) {
						return { name: id as QuestName, quest: questData };
					}
				})
				.filter((q) => q !== undefined),
		[campUpgrades, quests]
	);

	if (availableQuests.length === 0) {
		return (
			<Page headline={'Bulletin Board:'} goBack={goBack}>
				Talk to the people in the camp for more Quests
			</Page>
		);
	}

	return (
		<Page headline={'Bulletin Board:'} goBack={goBack}>
			<Stack mode="column">
				{availableQuests.map(({ name, quest }) => {
					return (
						<Card
							key={name}
							icon={<MdCatchingPokemon size={battleSpriteSize} />}
							content={
								<div>
									<h3>{replaceRouteName(name)}</h3>

									<h5 style={{ display: 'flex', alignItems: 'center' }}>
										Reward:
										{Object.entries(getRewardItemsForQuest(name)).map(
											([item, amount]) => (
												<React.Fragment key={item}>
													{amount} x <img src={getItemUrl(item as ItemType)} />
												</React.Fragment>
											)
										)}{' '}
										{quest.rewardPokemon && (
											<PokemonSprite name={quest.rewardPokemon.name} />
										)}
									</h5>
									<h5>Research Points: {quest.researchPoints}</h5>
								</div>
							}
							actionElements={[
								<button onClick={() => acceptQuest(name)}>Accept Quest</button>,
							]}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
