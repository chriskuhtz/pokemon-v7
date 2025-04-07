import React, { useContext, useEffect } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import {
	QuestName,
	QuestsRecord,
} from '../../constants/checkLists/questsRecord';
import { battleSpriteSize } from '../../constants/gameData';
import { typeColors } from '../../constants/typeColors';
import { getRewardItemsForQuest } from '../../functions/getRewardForQuest';
import { replaceRouteName } from '../../functions/replaceRouteName';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useQuests } from '../../hooks/useQuests';
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

	const { all } = useQuests();

	useEffect(() => {
		//Migrate new quests
		if (
			Object.entries(QuestsRecord).length >
			Object.entries(saveFile.quests).length
		) {
			const migratedQuests = Object.fromEntries(
				Object.entries(QuestsRecord).map(([qn]) => {
					const q = qn as QuestName;
					const status = saveFile.quests[q] ?? 'INACTIVE';
					return [q, status];
				})
			) as Record<QuestName, QuestStatus>;
			patchSaveFileReducer({
				quests: migratedQuests,
			});
		}
	}, [patchSaveFileReducer, saveFile.quests]);

	if (Object.values(all).filter((v) => v.status !== 'INACTIVE').length === 0) {
		return (
			<Page headline={'Quests:'} goBack={goBack}>
				Talk to the people in the camp to start quests
			</Page>
		);
	}

	const sortedQuests = [...all].sort((a, b) => {
		if (a.status === 'FULFILLED') {
			return -1;
		}
		if (b.status === 'FULFILLED') {
			return 1;
		}
		return 0;
	});
	return (
		<Page headline={'Quests:'} goBack={goBack}>
			<Stack mode="column">
				{sortedQuests.map(({ name, status }) => {
					const quest = QuestsRecord[name];
					if (status === 'INACTIVE' || status === 'COLLECTED') {
						return <React.Fragment key={name}></React.Fragment>;
					}

					return (
						<Card
							key={name}
							icon={<MdCatchingPokemon size={battleSpriteSize} />}
							content={
								<div>
									<h3>{replaceRouteName(name)}</h3>
									{status === 'FULFILLED' && <h4>ready to collect</h4>}
									<h5 style={{ display: 'flex', alignItems: 'center' }}>
										Reward:
										{Object.entries(
											getRewardItemsForQuest(name as QuestName)
										).map(([item, amount]) => (
											<React.Fragment key={item}>
												{amount} x <ItemSprite item={item as ItemType} />
											</React.Fragment>
										))}
										{quest.rewardPokemon && (
											<PokemonSprite
												name={quest.rewardPokemon.name}
												config={{ shiny: quest.rewardPokemon.shiny }}
											/>
										)}
									</h5>
									<h5>Research Points: {quest.researchPoints}</h5>
									{quest.targetPokemon && (
										<h5 style={{ display: 'flex', alignItems: 'center' }}>
											Targets:
											{quest.targetPokemon.map((p) => {
												if (
													quest.targetRoute &&
													saveFile.pokedex[p].caughtOnRoutes.includes(
														quest.targetRoute
													)
												) {
													return <PokemonSprite key={p + name} name={p} />;
												}
												if (
													!quest.targetRoute &&
													saveFile.pokedex[p].caughtOnRoutes.length > 0
												) {
													return <PokemonSprite key={p + name} name={p} />;
												}
												return <ItemSprite key={p + name} item={'poke-ball'} />;
											})}
										</h5>
									)}
								</div>
							}
							actionElements={[
								status === 'FULFILLED' && (
									<button
										style={{
											borderRadius: 9000,
											backgroundColor: typeColors['grass'],
										}}
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
								status === 'ACTIVE' && <strong>Active</strong>,
							].filter((x) => !!x)}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
