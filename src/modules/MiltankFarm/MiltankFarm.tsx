import { getItemUrl } from '../../functions/getItemUrl';
import { useMiltankFarm } from '../../hooks/useMiltankFarm';
import { useNavigate } from '../../hooks/useNavigate';
import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const MiltankFarm = (): JSX.Element => {
	const { trade, tradeOptions } = useMiltankFarm();

	const navigate = useNavigate();
	return (
		<Page
			headline="Miltank Farm"
			goBack={() => navigate('MILTANK_FARM', 'OVERWORLD')}
		>
			<Stack mode="column">
				{tradeOptions.length === 0 && (
					<Card
						content={
							<h3>Gather Berries in the wild or plant them at the farm</h3>
						}
						icon={
							<img
								src={getItemUrl('sitrus-berry')}
								style={{ filter: 'grayScale(1)' }}
							/>
						}
						actionElements={[]}
					/>
				)}
				{tradeOptions.map(([b, amount]) => (
					<Card
						key={b}
						content={`Trade 1 ${b} for 1 moomoo-milk  (${amount} in bag)`}
						icon={<img src={getItemUrl(b)} />}
						onClick={() => trade(b)}
						actionElements={[<img src={getItemUrl('moomoo-milk')} />]}
					/>
				))}
			</Stack>
		</Page>
	);
};

export const miltankFarm: Occupant[] = [
	{
		type: 'ROUTER_NPC',
		to: 'MILTANK_FARM',
		dialogue: [
			'All Pokemon seem to enjoy Miltank milk',
			'And miltank love to eat berries',
			'we can trade',
		],
		x: 4,
		y: 1,
		orientation: 'DOWN',
		sprite: SpriteEnum.cowgirl,
		id: 'miltank_farmer',
		conditionFunction: (s) => s.campUpgrades['build miltank farm'],
	},
	{
		type: 'POKEMON',
		dexId: 241,
		dialogue: ['Muuh'],
		x: 5,
		y: 1,
		orientation: 'DOWN',
		id: 'miltank',
		conditionFunction: (s) => s.campUpgrades['build miltank farm'],
	},
];
