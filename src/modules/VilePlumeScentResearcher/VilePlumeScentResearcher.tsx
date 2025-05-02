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

const vilePlumeProducts: Partial<
	Record<ItemType, { item: ItemType; amount: number }>
> = {
	repel: { item: 'pecha-berry', amount: 20 },
	'super-repel': { item: 'kebia-berry', amount: 40 },
	'max-repel': { item: 'rindo-berry', amount: 60 },
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
	'max-repel': 'repels all pokemon when active, lasts forever',
};

export const useVileplumeScentResearcher = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const enabled = saveFile.bag['pecha-berry'] > 0;

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

	return { enabled, trade };
};

export const VilePlumeScentResearcher = (): JSX.Element => {
	const { trade, enabled } = useVileplumeScentResearcher();

	const navigate = useNavigate();
	return (
		<Page
			headline="Trade Berries for Repels"
			goBack={() => navigate('CURATOR', 'OVERWORLD')}
		>
			{enabled ? (
				Object.entries(vilePlumeProducts).map(([product, price]) => (
					<Card
						onClick={() => trade(product as ItemType)}
						icon={<ItemSprite item={price.item} />}
						content={
							<div>
								<h3>
									Trade ${price.amount} ${price.item} for {product}
								</h3>
								<strong>{productDescriptions[product as ItemType]}</strong>
							</div>
						}
						actionElements={[<ItemSprite item={product as ItemType} />]}
					/>
				))
			) : (
				<h3>
					If you bring me Berries, vileplume can produce more scent based items
				</h3>
			)}
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
