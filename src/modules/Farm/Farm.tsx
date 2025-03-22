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
								Plants take 1 hour to grow, but they dont always grow
								successfully
							</strong>
							<ul>
								<li>growth mulch: makes berries grow faster</li>
								<li>damp mulch: makes berries less likely to wither</li>
								<li>gooey mulch: produces 25% more berries</li>
								<li>
									stable mulch: berries grow 25% slower, but yield 50% more
								</li>
							</ul>
						</div>
					}
					actionElements={[]}
				/>
				{farm.plants.map((bush) => {
					const ready = bush.readyAt < new Date().getTime();

					return (
						<Card
							key={bush.id}
							icon={<BerryBushIcon bush={bush} />}
							content={
								<div>
									<h5>
										{bush.type}
										{ready && !bush.successful && `  (withered)`}
									</h5>

									{!ready && (
										<strong>
											Ready at {new Date(bush.readyAt).toLocaleTimeString()}
										</strong>
									)}
								</div>
							}
							actionElements={
								ready
									? [
											<strong onClick={() => harvest(bush.id)}>
												{bush.successful ? 'harvest' : 'remove'}
											</strong>,
									  ]
									: []
							}
						/>
					);
				})}
				{hasEmptySlots ? (
					plantables.map(([berry]) => (
						<Card
							key={berry}
							icon={<img src={getItemUrl(berry)} />}
							content={`plant a ${berry}`}
							actionElements={[
								<strong
									style={{
										border: '1px solid',
										borderRadius: '.5rem',
									}}
									onClick={() => plant(berry)}
								>
									{`no mulch`}
								</strong>,
								...mulches.map(([m]) => (
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
								)),
							]}
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
