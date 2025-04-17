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

const vilePlumeProducts: ItemType[] = [
	'max-repel',
	'rock-incense',
	'wave-incense',
	'rose-incense',
	'full-incense',
	'lax-incense',
	'odd-incense',
];

export const useVileplumeScentResearcher = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const enabled = saveFile.bag['pecha-berry'] > 0;

	const trade = useCallback(
		(product: ItemType) => {
			if (saveFile.bag['pecha-berry'] <= 0) {
				return;
			}

			addMessage({ message: `Traded 1 Pecha Berry for 1 ${product}` });
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, {
					[product]: 1,
					'pecha-berry': -1,
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
				vilePlumeProducts.map((product) => (
					<Card
						onClick={() => trade(product)}
						icon={<ItemSprite item={'pecha-berry'} />}
						content={<h3>Trade Pecha Berry for {product}</h3>}
						actionElements={[<ItemSprite item={product} />]}
					/>
				))
			) : (
				<h3>
					If you bring me Pecha Berries, vileplume can produce more scent based
					items
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
			'Vileplume loves pecha berries',
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
