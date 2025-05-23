import React, { useContext, useMemo, useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import { MdFormatListBulleted } from 'react-icons/md';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { battleSpriteSize } from '../../constants/gameData';
import { QuestName, QuestsRecord } from '../../constants/questsRecord';
import { typeColors } from '../../constants/typeColors';
import { getRewardItemsForQuest } from '../../functions/getRewardForQuest';
import { replaceRouteName } from '../../functions/replaceRouteName';
import { useQuests } from '../../hooks/useQuests';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { ItemType } from '../../interfaces/Item';
import { questCategories, QuestCategory } from '../../interfaces/Quest';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Quests = ({ goBack }: { goBack: () => void }) => {
	const [filter, setFilter] = useState<QuestCategory | 'FULFILLED'>(
		'FULFILLED'
	);
	const { saveFile, fulfillQuestReducer: fulfillQuest } =
		useContext(SaveFileContext);

	const { all } = useQuests();

	const sortedQuests = useMemo(
		() =>
			[...all].sort((a, b) => {
				if (a.status === 'FULFILLED') {
					return -1;
				}
				if (b.status === 'FULFILLED') {
					return 1;
				}
				return 0;
			}),
		[all]
	);

	if (Object.values(all).filter((v) => v.status !== 'INACTIVE').length === 0) {
		return (
			<Page headline={'Quests:'} goBack={goBack}>
				Talk to the people in the camp to start quests
			</Page>
		);
	}

	return (
		<Page headline={'Quests:'} goBack={goBack}>
			<Stack mode="column">
				<Stack mode="row">
					{['FULFILLED', ...questCategories].map((cat) => (
						<button
							style={{
								backgroundColor: filter === cat ? 'black' : undefined,
								color: filter === cat ? 'white' : undefined,
							}}
							key={cat}
							onClick={() => setFilter(cat as QuestCategory | 'FULFILLED')}
						>
							{cat}
						</button>
					))}
				</Stack>
				{sortedQuests.map(({ name, status }) => {
					const quest = QuestsRecord[name];
					const inFilter =
						filter === 'FULFILLED'
							? status === 'FULFILLED'
							: quest.category === filter;
					if (status === 'INACTIVE' || status === 'COLLECTED' || !inFilter) {
						return <React.Fragment key={name}></React.Fragment>;
					}

					return (
						<Card
							key={name}
							icon={
								quest.kind === 'BULLETIN' ? (
									<MdFormatListBulleted size={battleSpriteSize} />
								) : (
									<IoPerson size={battleSpriteSize} />
								)
							}
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
									{quest.catchBoosts && (
										<h5>
											Catch Boosts: {Object.keys(quest.catchBoosts).join(', ')}
										</h5>
									)}
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
													saveFile.pokedex[p].caughtOnRoutes.length > 0 &&
													!quest.targetRoute
												) {
													return <PokemonSprite key={p + name} name={p} />;
												}
												if (
													quest.targetRoute &&
													saveFile.pokedex[p].seenOnRoutes.includes(
														quest.targetRoute
													)
												) {
													return (
														<PokemonSprite
															config={{ grayscale: true }}
															key={p + name}
															name={p}
														/>
													);
												}
												if (
													!quest.targetRoute &&
													saveFile.pokedex[p].seenOnRoutes.length > 0
												) {
													return (
														<PokemonSprite
															config={{ grayscale: true }}
															key={p + name}
															name={p}
														/>
													);
												}
												return <ItemSprite key={p + name} item={'poke-ball'} />;
											})}
										</h5>
									)}
									{quest.progress !== undefined && (
										<AnimatedBar
											max={quest.progress(saveFile).goal}
											offset={
												quest.progress(saveFile).goal -
												quest.progress(saveFile).current
											}
										/>
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
											fulfillQuest(name);
										}}
										role="button"
										tabIndex={0}
										onKeyDown={(e) => {
											e.stopPropagation();
											if (e.key === 'Enter') {
												fulfillQuest(name);
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
