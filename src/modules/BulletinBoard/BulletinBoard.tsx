import React, { useCallback, useContext, useMemo } from 'react';
import { MdFormatListBulleted } from 'react-icons/md';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import {
	QuestName,
	questNames,
	QuestsRecord,
} from '../../constants/gameData/questsRecord';
import { getRewardItemsForQuest } from '../../functions/getRewardForQuest';
import { replaceRouteName } from '../../functions/replaceRouteName';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { ItemType } from '../../interfaces/Item';
import { Quest } from '../../interfaces/Quest';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const BulletinBoard = ({ goBack }: { goBack: () => void }) => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { quests, campUpgrades } = saveFile;

	const acceptQuest = useCallback(
		(name: QuestName) => {
			addMessage({
				message: `Accepted Quest: ${name}`,
				needsNoConfirmation: true,
			});
			patchSaveFileReducer({
				...saveFile,
				quests: { ...saveFile.quests, [name]: 'ACTIVE' },
			});
		},
		[addMessage, patchSaveFileReducer, saveFile]
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

	const total = questNames.length;

	const numberOfCompletedQuests = useMemo(() => {
		return questNames.filter((q) => saveFile.quests[q] === 'COLLECTED').length;
	}, [saveFile.quests]);

	if (availableQuests.length === 0) {
		return (
			<Page headline={'Bulletin Board:'} goBack={goBack}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
					<strong style={{ textWrap: 'nowrap' }}>Completed Quests:</strong>
					<AnimatedBar
						max={total}
						offset={total - numberOfCompletedQuests}
						color={'blue'}
					/>
				</div>
				Talk to the people in the camp for more Quests
			</Page>
		);
	}

	return (
		<Page headline={'Bulletin Board:'} goBack={goBack}>
			<Stack mode="column">
				<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
					<strong style={{ textWrap: 'nowrap' }}>Completed Quests:</strong>
					<AnimatedBar
						max={total}
						offset={total - numberOfCompletedQuests}
						color={'blue'}
					/>
				</div>

				{availableQuests.map(({ name, quest }) => {
					return (
						<Card
							key={name}
							icon={<MdFormatListBulleted size={battleSpriteSize} />}
							content={
								<div>
									<h3>{replaceRouteName(name)}</h3>

									<h5 style={{ display: 'flex', alignItems: 'center' }}>
										Reward:
										{Object.entries(getRewardItemsForQuest(name)).map(
											([item, amount]) => (
												<React.Fragment key={item}>
													{amount} x <ItemSprite item={item as ItemType} />
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
