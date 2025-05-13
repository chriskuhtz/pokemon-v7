import { useCallback, useContext, useMemo } from 'react';
import { ItemInfoButton } from '../../components/AbilityInfoButton/AbilityInfoButton';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { ItemType, berries, heldItems } from '../../interfaces/Item';
import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const useTravellingMerchant = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const availableTrades: {
		give: ItemType;
		receive: ItemType;
		disabled: boolean;
		amount: number;
	}[] = useMemo(() => {
		const ber = [...berries, ...berries, ...berries];

		return heldItems
			.filter((h) => h !== 'lucky-egg')
			.map((h, i) => ({
				receive: h,
				give: ber[i],
				amount: saveFile.bag[ber[i]],
				disabled: saveFile.bag[ber[i]] <= 0,
			}));
	}, [saveFile.bag]);

	const trade = useCallback(
		(give: ItemType, receive: ItemType) => {
			addMessage({ message: `Traded 1 ${give} for 1 ${receive}` });
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, {
					[receive]: 1,
					[give]: -1,
				}),
			});
		},
		[addMessage, patchSaveFileReducer, saveFile.bag]
	);

	return { availableTrades, trade };
};

export const TravellingMerchant = (): JSX.Element => {
	const { trade, availableTrades } = useTravellingMerchant();

	const navigate = useNavigate();
	return (
		<Page
			headline="Trade Berries for battle items"
			goBack={() => navigate('TRAVELLING_MERCHANT', 'OVERWORLD')}
		>
			<Stack mode="column">
				{availableTrades.map(({ give, receive, disabled, amount }) => {
					return (
						<Card
							key={give + receive}
							disabled={disabled}
							onClick={() => trade(give, receive)}
							icon={<ItemSprite item={give} />}
							content={
								<h3>
									Trade {give}({amount} in Bag) for {receive}
								</h3>
							}
							actionElements={[
								<ItemSprite item={receive} />,
								<ItemInfoButton itemName={receive} />,
							]}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};

const baseTravellingMerchant: Occupant[] = [
	{
		type: 'ROUTER_NPC',
		dialogue: [
			'I stop in a different spot every day',
			'and search for the tastiest berries',
			'Do you want to trade some of this junk for berries?',
		],
		to: 'TRAVELLING_MERCHANT',
		x: 2,
		y: 1,
		orientation: 'DOWN',
		sprite: SpriteEnum.hiker,
		id: 'travelling-merchant',
		conditionFunction: () => true,
	},
	{
		type: 'OBSTACLE',
		src: './mapObjects/trailer.png',
		x: 1,
		y: 1,
		id: 'trailer',
		conditionFunction: () => true,
	},
];

const day = new Date().getDay();

export const travellingMerchantRouteN1: Occupant[] =
	day === 0
		? baseTravellingMerchant.map((h, i) => ({ ...h, x: 38 + i, y: 35 }))
		: [];
export const travellingMerchantRouteN1E1: Occupant[] =
	day === 1
		? baseTravellingMerchant.map((h, i) => ({ ...h, x: 10 + i, y: 2 }))
		: [];
export const travellingMerchantRouteE1: Occupant[] =
	day === 2
		? baseTravellingMerchant.map((h, i) => ({ ...h, x: 32 + i, y: 5 }))
		: [];
export const travellingMerchantRouteS1E1: Occupant[] =
	day === 3
		? baseTravellingMerchant.map((h, i) => ({ ...h, x: 24 + i, y: 8 }))
		: [];
export const travellingMerchantRouteS1W1: Occupant[] =
	day === 4
		? baseTravellingMerchant.map((h, i) => ({ ...h, x: 25 + i, y: 22 }))
		: [];
export const travellingMerchantRouteW1: Occupant[] =
	day === 5
		? baseTravellingMerchant.map((h, i) => ({ ...h, x: 41 + i, y: 47 }))
		: [];
export const travellingMerchantRouteN1W1: Occupant[] =
	day === 6
		? baseTravellingMerchant.map((h, i) => ({ ...h, x: 37 + i, y: 38 }))
		: [];
