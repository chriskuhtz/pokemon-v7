import { getItemUrl } from '../../functions/getItemUrl';
import { useNavigate } from '../../hooks/useNavigate';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { BerryBushIcon } from './components/BerryBushIcon';
import { useFarm } from './hooks/useFarm';

export const Farm = (): JSX.Element => {
	const { hasEmptySlots, farm, harvest, plant, plantables, mulches } =
		useFarm();

	const navigate = useNavigate();
	return (
		<Page headline="Farm" goBack={() => navigate('FARM', 'OVERWORLD')}>
			<Stack mode="column">
				<Card
					icon={<img src={getItemUrl('sitrus-berry')} />}
					content={
						<div>
							<strong>
								Berries take 10 minutes to progress to the next growth stage,
								but they have a chance to wither between each step
							</strong>
							<ul>
								<li>growth mulch: makes berries grow faster</li>
								<li>damp mulch: makes berries less likely to wither</li>
								<li>growth mulch: produces 25% more berries</li>
								<li>
									growth mulch: berries grow 25% slower, but yield 50% more
								</li>
							</ul>
						</div>
					}
					actionElements={[]}
				/>
				{farm.plants.map((bush) => (
					<Card
						key={bush.id}
						icon={<BerryBushIcon status={bush.status} />}
						content={
							<div>
								<h5>{bush.type}</h5>
								<p>
									<strong>{bush.status}</strong>
								</p>
								<p>Status: {bush.status}</p>
							</div>
						}
						actionElements={
							bush.status === 'READY' || bush.status === 'WITHERED'
								? [<strong onClick={() => harvest(bush.id)}>harvest</strong>]
								: []
						}
					/>
				))}
				{hasEmptySlots ? (
					plantables.map(([berry]) => (
						<Card
							key={berry}
							icon={<img src={getItemUrl(berry)} />}
							content={`plant a ${berry}`}
							actionElements={mulches.map(([m]) => (
								<strong
									style={{
										border: '1px solid',
										borderRadius: '.5rem',
									}}
									onClick={() => plant(berry, m)}
								>
									{`with ${m}`}
									<img src={getItemUrl(m)} />
								</strong>
							))}
						/>
					))
				) : (
					<Card
						icon={<img src={getItemUrl('sitrus-berry')} />}
						content={`No more empty slots`}
						actionElements={[]}
					/>
				)}
			</Stack>
		</Page>
	);
};
