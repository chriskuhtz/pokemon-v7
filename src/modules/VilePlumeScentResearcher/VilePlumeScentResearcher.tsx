import { useCallback, useContext } from 'react';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

const vilePlumeProducts: Partial<
	Record<ItemType, { item: ItemType; amount: number }>
> = {
	repel: { item: 'pecha-berry', amount: 40 },
	'super-repel': { item: 'kebia-berry', amount: 80 },
	'max-repel': { item: 'rindo-berry', amount: 120 },
	lure: { item: 'chesto-berry', amount: 120 },
	'super-lure': { item: 'coba-berry', amount: 240 },
	'max-lure': { item: 'aguav-berry', amount: 360 },
	'rock-incense': { item: 'charti-berry', amount: 5 },
	'wave-incense': { item: 'passho-berry', amount: 5 },
	'rose-incense': { item: 'payapa-berry', amount: 5 },
	'full-incense': { item: 'sitrus-berry', amount: 5 },
	'lax-incense': { item: 'oran-berry', amount: 5 },
	'odd-incense': { item: 'enigma-berry', amount: 5 },
};
const productDescriptions: Partial<Record<ItemType, string>> = {
	repel: 'repels pokemon under level 20 when active, lasts forever',
	'super-repel': 'repels pokemon under level 40 when active, lasts forever',
	'max-repel': 'repels pokemon under level 60 when active, lasts forever',
	lure: 'causes random weak pokemon to attack you',
	'super-lure': 'causes random medium strong pokemon to attack you',
	'max-lure': 'causes random very strong pokemon to attack you',
};

export const useVileplumeScentResearcher = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const trade = useCallback(
		(product: ItemType) => {
			const price = vilePlumeProducts[product];

			if (!price) {
				return;
			}

			addMessage({
				message: `Traded ${price.amount} ${price.item}  for  ${product}`,
			});
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, {
					[product]: 1,
					[price.item]: -price.amount,
				}),
			});
		},
		[addMessage, patchSaveFileReducer, saveFile.bag]
	);

	return { trade };
};

export const VilePlumeScentResearcher = (): JSX.Element => {
	const { saveFile } = useContext(SaveFileContext);
	const { trade } = useVileplumeScentResearcher();

	const navigate = useNavigate();
	return (
		<Page
			headline="Trade Berries for Repels"
			goBack={() => navigate('CURATOR', 'OVERWORLD')}
		>
			<Stack mode={'column'}>
				{Object.entries(vilePlumeProducts).map(([product, price]) => (
					<Card
						disabled={saveFile.bag[price.item] < price.amount}
						onClick={() => trade(product as ItemType)}
						icon={<ItemSprite item={price.item} />}
						content={
							<div>
								<h3>
									Trade {price.amount} {price.item} for {product}
								</h3>
								<strong>{productDescriptions[product as ItemType]}</strong>
							</div>
						}
						actionElements={[<ItemSprite item={product as ItemType} />]}
					/>
				))}
			</Stack>
		</Page>
	);
};

export const vileplumeResearchers: Occupant[] = [
	{
		type: 'ROUTER_NPC',
		dialogue: [
			'Vileplume produces fascinating scents',
			'I was able to distill these scents',
			'into a spray that repels pokemon',
			'Vileplume loves berries',
			'would you like to trade?',
		],
		to: 'VILEPLUME',
		x: 15,
		y: 11,
		orientation: 'DOWN',
		sprite: SpriteEnum.scientistMale,
		id: 'vileplume researcher',
		conditionFunction: (s) =>
			s.campUpgrades['invite vileplume scent researcher'],
	},
	{
		type: 'POKEMON',
		dexId: 45,
		x: 16,
		y: 11,
		orientation: 'DOWN',
		id: 'vileplume',
		dialogue: ["It really smells 'fascinating'"],
		conditionFunction: (s) =>
			s.campUpgrades['invite vileplume scent researcher'],
	},
];
