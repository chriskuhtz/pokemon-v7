import { useCallback, useContext, useMemo } from 'react';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { lettersToNumbers } from '../../constants/lettersToNumbers';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import {
	ItemType,
	MulchType,
	isApricorn,
	isBerry,
	mulches,
} from '../../interfaces/Item';
import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const useAmoongussResearcher = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const options: [ItemType, number][] = useMemo(() => {
		return Object.entries(saveFile.bag).filter(
			([item, amount]) => (isApricorn(item) || isBerry(item)) && amount > 0
		) as [ItemType, number][];
	}, [saveFile.bag]);

	const trade = useCallback(
		(item: ItemType, mulch: MulchType) => {
			if (!(isApricorn(item) || isBerry(item))) {
				return;
			}

			addMessage({ message: `Traded 1 ${item} for 1 ${mulch}` });
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, {
					[mulch]: 1,
					[item]: -1,
				}),
			});
		},
		[addMessage, patchSaveFileReducer, saveFile.bag]
	);

	return { options, trade };
};

export const AmoongussCompostResearcher = (): JSX.Element => {
	const { trade, options } = useAmoongussResearcher();

	const navigate = useNavigate();
	return (
		<Page
			headline="Trade Berries or Apricorns for Mulches"
			goBack={() => navigate('CURATOR', 'OVERWORLD')}
		>
			<Stack mode="column">
				{options.length > 0
					? options.map(([item, amount]) => {
							const nameToNumber = item
								.split('')
								.reduce((sum, summand) => sum + lettersToNumbers[summand], 0);

							const index = nameToNumber % mulches.length;
							const randomMulch = mulches[index];
							return (
								<Card
									key={item}
									onClick={() => trade(item, randomMulch)}
									icon={<ItemSprite item={item} />}
									content={
										<h3>
											Trade {item}({amount} in Bag) for {randomMulch}
										</h3>
									}
									actionElements={[<ItemSprite item={randomMulch} />]}
								/>
							);
					  })
					: [
							<h3 key="empty">
								Amoongus can break down berries or apricorns into mulch
							</h3>,
					  ]}
			</Stack>
		</Page>
	);
};

export const amoongussCompostResearchers: Occupant[] = [
	{
		type: 'ROUTER_NPC',
		dialogue: [
			'I am researching compost',
			'amoonguss is really efficient at it',
			'If you bring me plants',
			'It will turn them into mulch in no time',
		],
		to: 'AMOONGUSS',
		x: 6,
		y: 13,
		orientation: 'UP',
		sprite: SpriteEnum.scientistFemale,
		id: 'amoonguss researcher',
		conditionFunction: (s) =>
			s.campUpgrades['invite amoongus compost researcher'],
	},
	{
		type: 'POKEMON',
		dexId: 591,
		x: 7,
		y: 13,
		orientation: 'UP',
		id: 'amoonguss',
		dialogue: ["Amoonguss is 'processing' berries"],
		conditionFunction: (s) =>
			s.campUpgrades['invite amoongus compost researcher'],
	},
];
