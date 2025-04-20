import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { useNavigate } from '../../hooks/useNavigate';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { useCurator } from './hooks/useCurator';

export const Curator = (): JSX.Element => {
	const { trade, possibleTradeIns } = useCurator();

	const navigate = useNavigate();
	return (
		<Page
			headline="Donate to the museum"
			goBack={() => navigate('CURATOR', 'OVERWORLD')}
		>
			<Stack mode="column">
				{possibleTradeIns.length === 0 && (
					<h3>
						If you find any rare or valuable items, i would gladly display them
						in the pewter city museum
					</h3>
				)}
				{possibleTradeIns.map((item) => (
					<Card
						onClick={() => trade(item)}
						key={item}
						icon={<ItemSprite item={item} />}
						content={<h3>Donate {item} and receive a berry as a thank you</h3>}
						actionElements={[]}
					/>
				))}
			</Stack>
		</Page>
	);
};
