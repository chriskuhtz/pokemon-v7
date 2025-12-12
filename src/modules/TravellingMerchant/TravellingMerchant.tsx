import { useCallback, useContext, useMemo } from 'react';
import { ItemInfoButton } from '../../components/ItemInfoButton/ItemInfoButton';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { ItemType, berries, heldItems } from '../../interfaces/Item';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { Occupant } from '../../interfaces/Occupant';

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

		return heldItems.map((h, i) => ({
			receive: h,
			give: h === 'lucky-egg' ? 'enigma-berry' : ber[i],
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
						<div
							key={give + receive}
							style={{
								display: 'flex',
								gap: '.5rem',
								alignItems: 'center',
							}}
						>
							<div style={{ flexGrow: 1 }}>
								<Card
									disabled={disabled}
									onClick={() => trade(give, receive)}
									icon={<ItemSprite item={give} />}
									content={
										<h3>
											Trade {give}({amount} in Bag) for {receive}
										</h3>
									}
									actionElements={[<ItemSprite item={receive} />]}
								/>
							</div>
							<ItemInfoButton itemName={receive} />
						</div>
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

export const travellingMerchantRouteN1: Occupant[] = baseTravellingMerchant.map(
	(h, i) => ({
		...h,
		x: 38 + i,
		y: 35,
		conditionFunction: () => true,
	})
);

export const travellingMerchantRouteN1E1: Occupant[] =
	baseTravellingMerchant.map((h, i) => ({
		...h,
		x: 10 + i,
		y: 2,
		conditionFunction: () => true,
	}));

export const travellingMerchantRouteE1: Occupant[] = baseTravellingMerchant.map(
	(h, i) => ({
		...h,
		x: 32 + i,
		y: 5,
		conditionFunction: () => true,
	})
);

export const travellingMerchantRouteS1E1: Occupant[] =
	baseTravellingMerchant.map((h, i) => ({
		...h,
		x: 16 + i,
		y: 8,
		conditionFunction: () => true,
	}));

export const travellingMerchantRouteS1: Occupant[] = baseTravellingMerchant.map(
	(h, i) => ({
		...h,
		x: 21 + i,
		y: 4,
		conditionFunction: () => true,
	})
);

export const travellingMerchantRouteS1W1: Occupant[] =
	baseTravellingMerchant.map((h, i) => ({
		...h,
		x: 25 + i,
		y: 22,
		conditionFunction: () => true,
	}));

export const travellingMerchantRouteW1: Occupant[] = baseTravellingMerchant.map(
	(h, i) => ({
		...h,
		x: 34 + i,
		y: 47,
		conditionFunction: () => true,
	})
);
