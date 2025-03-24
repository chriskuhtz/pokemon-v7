import { useCallback, useContext } from 'react';
import { getItemUrl } from '../../functions/getItemUrl';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';

export const useVileplumeScentResearcher = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const enabled = saveFile.inventory['pecha-berry'] > 0;
	const trade = useCallback(() => {
		if (saveFile.inventory['pecha-berry'] <= 0) {
			return;
		}

		addMessage({ message: 'Traded 1 Pecha Berry for 1 Max Repel' });
		patchSaveFileReducer({
			inventory: joinInventories(saveFile.inventory, {
				'max-repel': 1,
				'pecha-berry': -1,
			}),
		});
	}, [addMessage, patchSaveFileReducer, saveFile.inventory]);

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
				<Card
					onClick={() => trade()}
					icon={<img src={getItemUrl('pecha-berry')} />}
					content={<h3>Trade Pecha Berry for Max Repel</h3>}
					actionElements={[<img src={getItemUrl('max-repel')} />]}
				/>
			) : (
				<h3>If you bring me Pecha Berries, vileplume can produce more repel</h3>
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
			'would you like to trade some for my spray',
		],
		to: 'VILEPLUME',
		x: 1,
		y: 3,
		orientation: 'RIGHT',
		sprite: SpriteEnum.scientistMale,
		id: 'vileplume researcher',
		conditionFunction: (s) =>
			s.campUpgrades['invite vileplume scent researcher'],
	},
	{
		type: 'POKEMON',
		dexId: 45,
		x: 1,
		y: 4,
		orientation: 'RIGHT',
		id: 'vileplume',
		dialogue: ["It really smells 'fascinating'"],
		conditionFunction: (s) =>
			s.campUpgrades['invite vileplume scent researcher'],
	},
];
