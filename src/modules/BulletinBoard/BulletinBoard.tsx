import React, { useCallback, useContext, useMemo } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import {
	QuestName,
	questNames,
	QuestsRecord,
} from '../../constants/checkLists/questsRecord';
import { battleSpriteSize } from '../../constants/gameData';
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
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';

export const BulletinBoard = ({ goBack }: { goBack: () => void }) => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, putSaveFileReducer } = useContext(SaveFileContext);
	const { quests, campUpgrades } = saveFile;

	const activeQuests = useMemo(
		() =>
			Object.keys(QuestsRecord).filter(
				(q) => quests[q as QuestName] === 'ACTIVE'
			),
		[quests]
	);
	const acceptQuest = useCallback(
		(name: QuestName) => {
			if (activeQuests.length >= 5) {
				addMessage({
					message: 'You can only have 5 active Quests at the same time',
				});

				return;
			}
			addMessage({
				message: `Accepted Quest: ${name}`,
				needsNoConfirmation: true,
			});
			putSaveFileReducer({
				...saveFile,
				quests: { ...saveFile.quests, [name]: 'ACTIVE' },
			});
		},
		[activeQuests.length, addMessage, putSaveFileReducer, saveFile]
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
				<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
					<strong style={{ textWrap: 'nowrap' }}>Active Quests:</strong>
					<AnimatedBar max={5} offset={5 - activeQuests.length} inversedColor />
				</div>
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
