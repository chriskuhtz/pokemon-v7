import { useContext } from 'react';
import { FaRandom } from 'react-icons/fa';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { Sprite } from '../../components/Sprite/Sprite';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { trainers } from '../../functions/makeRandomTrainer';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { useChallengeTrainer } from '../Overworld/hooks/useChallengeTrainer';

export const TrainingField = () => {
	const { setActiveTabReducer, saveFile } = useContext(SaveFileContext);
	const challenge = useChallengeTrainer();

	return (
		<Page
			goBack={() => setActiveTabReducer('OVERWORLD')}
			headline="Training Field:"
		>
			<Stack mode="column">
				<Card
					key={'random1'}
					icon={<FaRandom />}
					content={<h3>Random Opponent (Tier 1)</h3>}
					actionElements={[
						<button onClick={() => challenge({ tier: 1 })}>Challenge</button>,
					]}
				/>
				{saveFile.campUpgrades['training field 2'] && (
					<Card
						key={'random2'}
						icon={<FaRandom />}
						content={<h3>Random Opponent (Tier 2)</h3>}
						actionElements={[
							<button onClick={() => challenge({ tier: 2 })}>Challenge</button>,
						]}
					/>
				)}
				{saveFile.campUpgrades['training field 3'] && (
					<Card
						key={'random3'}
						icon={<FaRandom />}
						content={<h3>Random Opponent (Tier 3)</h3>}
						actionElements={[
							<button onClick={() => challenge({ tier: 3 })}>Challenge</button>,
						]}
					/>
				)}
				{saveFile.campUpgrades['training field 4'] && (
					<Card
						key={'random4'}
						icon={<FaRandom />}
						content={<h3>Random Opponent (Tier 4)</h3>}
						actionElements={[
							<button onClick={() => challenge({ tier: 4 })}>Challenge</button>,
						]}
					/>
				)}
				{trainers
					.filter((t) => {
						let res = true;
						if (t.availableAfter) {
							res = saveFile.quests[t.availableAfter] === 'COLLECTED';
						}
						if (t.requiredUpgrade) {
							res = !!saveFile.campUpgrades[t.requiredUpgrade];
						}

						return res;
					})
					.map((t) => {
						const defeatedBefore = saveFile.handledOccupants.some(
							(h) => h.id === t.id
						);
						return (
							<Card
								key={t.id}
								icon={
									<Sprite
										canvasKey={t.id}
										key={t.id}
										id={t.trainer?.sprite ?? '136'}
										rotating={false}
									/>
								}
								content={
									<div>
										<h3
											style={{
												display: 'grid',
												alignItems: 'center',
												gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr',
												gap: '1rem',
											}}
										>
											{t.trainer?.name}{' '}
											{t.team.map((p) => (
												<PokemonSprite key={t.id + p.name} name={p.name} />
											))}
										</h3>
										<div style={{ display: 'flex', gap: '1rem' }}>
											{t.team.map((p) => (
												<strong key={t.id + p.name + 'LVL'}>
													Lvl {calculateLevelData(p.xp).level} {p.name},
												</strong>
											))}
										</div>
										{defeatedBefore && (
											<strong color={'green'}>Defeated before</strong>
										)}
									</div>
								}
								actionElements={[
									<button onClick={() => challenge({ id: t.id })}>
										Challenge
									</button>,
								]}
							/>
						);
					})}
			</Stack>
		</Page>
	);
};
