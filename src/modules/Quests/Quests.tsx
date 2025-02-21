import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdCatchingPokemon } from 'react-icons/md';
import {
	QuestName,
	QuestsRecord,
} from '../../constants/checkLists/questsRecord';
import { baseSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { ItemType } from '../../interfaces/Item';
import { SaveFile } from '../../interfaces/SaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';

export const Quests = ({
	quests,
	fulfillQuest,
	goBack,
	saveFile,
}: {
	quests: SaveFile['quests'];
	fulfillQuest: (q: QuestName) => void;
	goBack: () => void;
	saveFile: SaveFile;
}) => {
	return (
		<Page headline={'Quests:'} goBack={goBack}>
			{Object.entries(QuestsRecord).map(([name, quest]) => {
				const status = quests[name as QuestName];
				const fulfilled = quest.conditionFunction(saveFile);
				const collected = status === 'COLLECTED';
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
							</div>
						}
						actionElements={
							fulfilled && !collected
								? [
										<FaPlus
											style={{ borderRadius: 9000 }}
											size={baseSize / 2}
											onClick={() => fulfillQuest(name as QuestName)}
											role="button"
											tabIndex={0}
											onKeyDown={(e) => {
												e.stopPropagation();
												if (e.key === 'Enter') {
													fulfillQuest(name as QuestName);
												}
											}}
										/>,
								  ]
								: []
						}
					/>
				);
			})}
		</Page>
	);
};
