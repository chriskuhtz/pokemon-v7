import React, { useContext } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import {
	QuestName,
	QuestsRecord,
} from '../../constants/checkLists/questsRecord';
import { baseSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { ItemType } from '../../interfaces/Item';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Quests = ({ goBack }: { goBack: () => void }) => {
	const { saveFile, fulfillQuestReducer: fulfillQuest } =
		useContext(SaveFileContext);
	const { quests } = saveFile;

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
				{Object.entries(QuestsRecord).map(([name, quest]) => {
					const status = quests[name as QuestName];
					const fulfilled = quest.conditionFunction(saveFile);
					const collected = status === 'COLLECTED';
					const active = status === 'ACTIVE' && !fulfilled;

					if (status === 'INACTIVE') {
						return <React.Fragment key={name}></React.Fragment>;
					}

					return (
						<Card
							key={name}
							icon={<MdCatchingPokemon size={baseSize / 2} />}
							content={
								<div>
									<h3>{name}</h3>
									{fulfilled && !collected && <h4>ready to collect</h4>}
									{collected && <h4>COLLECTED</h4>}
									<h5 style={{ display: 'flex', alignItems: 'center' }}>
										Reward:
										{Object.entries(quest.rewardItems).map(([item, amount]) => (
											<React.Fragment key={item}>
												{amount} x <img src={getItemUrl(item as ItemType)} />
											</React.Fragment>
										))}
									</h5>
									<h5>Research Points: {quest.researchPoints}</h5>
								</div>
							}
							actionElements={[
								fulfilled && !collected && (
									<button
										style={{ borderRadius: 9000 }}
										onClick={() => fulfillQuest(name as QuestName)}
										role="button"
										tabIndex={0}
										onKeyDown={(e) => {
											e.stopPropagation();
											if (e.key === 'Enter') {
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
