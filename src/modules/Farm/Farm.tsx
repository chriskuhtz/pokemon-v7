import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
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
					icon={<ItemSprite item={'sitrus-berry'} />}
					content={
						<div>
							<strong>
								Plants take 1 hour to grow, but they dont always grow
								successfully
							</strong>
							<ul>
								<li>
									<strong>growth mulch: makes berries grow faster</strong>
								</li>
								<li>
									<strong>
										damp mulch: makes berries less likely to wither
									</strong>
								</li>
								<li>
									<strong>gooey mulch: produces 25% more berries</strong>
								</li>
								<li>
									<strong>
										stable mulch: berries grow 25% slower, but yield 50% more
									</strong>
								</li>
								<li>
									<strong>
										rich mulch: guaranteed success, but fewer berries
									</strong>
								</li>
								<li>
									<strong>
										surprise mulch: will grow into a different berry than
										planted
									</strong>
								</li>
								<li>
									<strong>
										amaze mulch: same as surprise, but higher yield and higher
										risk
									</strong>
								</li>
								<li>
									<strong>
										boost mulch: grow a small amount of berries 6 times faster
									</strong>
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
											<button onClick={() => harvest(bush.id)}>
												{bush.successful ? 'harvest' : 'remove'}
											</button>,
									  ]
									: []
							}
						/>
					);
				})}
				{hasEmptySlots ? (
					plantables.map(([berry, amount]) => (
						<Card
							key={berry}
							icon={<ItemSprite item={berry} />}
							content={<strong>{`plant a ${berry} (${amount} in bag)`}</strong>}
							actionElements={[
								<button onClick={() => plant(berry)}>{`plant`}</button>,
								...mulches.map(([m]) => (
									<button onClick={() => plant(berry, m)}>
										{`with ${m}`}
										<ItemSprite item={m} />
									</button>
								)),
							]}
						/>
					))
				) : (
					<Card
						icon={<ItemSprite item={'sitrus-berry'} />}
						content={`No more empty slots`}
						actionElements={[]}
					/>
				)}
			</Stack>
		</Page>
	);
};
