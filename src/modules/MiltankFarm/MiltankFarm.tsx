import { getItemUrl } from '../../functions/getItemUrl';
import { useMiltankFarm } from '../../hooks/useMiltankFarm';
import { useNavigate } from '../../hooks/useNavigate';
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
				{tradeOptions.map((b) => (
					<Card
						key={b}
						content={`Trade 1 ${b} for 1 moomoo-milk`}
						icon={<img src={getItemUrl(b)} />}
						onClick={() => trade(b)}
						actionElements={[<img src={getItemUrl('moomoo-milk')} />]}
					/>
				))}
			</Stack>
		</Page>
	);
};
