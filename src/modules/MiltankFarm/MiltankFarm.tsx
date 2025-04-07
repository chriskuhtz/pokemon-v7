import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { useMiltankFarm } from '../../hooks/useMiltankFarm';
import { useNavigate } from '../../hooks/useNavigate';
import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const MiltankFarm = (): JSX.Element => {
	const { trade, tradeOptions, ready } = useMiltankFarm();

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
						icon={<ItemSprite item={'sitrus-berry'} grayscale />}
						actionElements={[]}
					/>
				)}
				{ready ? (
					tradeOptions.map(([b, amount]) => (
						<Card
							key={b}
							content={`Trade 1 ${b} for 1 moomoo-milk  (${amount} in bag)`}
							icon={<ItemSprite item={b} />}
							onClick={() => trade(b)}
							actionElements={[<ItemSprite item={'moomoo-milk'} />]}
						/>
					))
				) : (
					<Card
						icon={<ItemSprite item={'moomoo-milk'} grayscale />}
						content={
							<strong>Miltank needs some more time to produce new Milk</strong>
						}
						actionElements={[]}
					/>
				)}
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
		x: 6,
		y: 11,
		orientation: 'DOWN',
		sprite: SpriteEnum.cowgirl,
		id: 'miltank_farmer',
		conditionFunction: (s) => s.campUpgrades['build miltank farm'],
	},
	{
		type: 'POKEMON',
		dexId: 241,
		dialogue: ['Muuh'],
		x: 7,
		y: 11,
		orientation: 'DOWN',
		id: 'miltank',
		conditionFunction: (s) => s.campUpgrades['build miltank farm'],
	},
];
