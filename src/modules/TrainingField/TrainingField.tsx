import { useContext, useMemo, useState } from 'react';
import { FaRandom } from 'react-icons/fa';
import { TbSoccerField } from 'react-icons/tb';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { Sprite } from '../../components/Sprite/Sprite';
import { calculateLevelData } from '../../functions/calculateLevelData';

import { portraitMode } from '../../constants/gameData/gameData';
import { LocationContext } from '../../hooks/LocationProvider';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Challenger } from '../../interfaces/Challenger';
import { evTrainingTool } from '../../interfaces/Item';
import { SaveFile } from '../../interfaces/SaveFile';
import { Stat } from '../../interfaces/StatObject';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import {
	useChallengeTrainer,
	useEvTraining,
} from '../Overworld/hooks/useChallengeTrainer';
import {
	specialTrainers,
	tier1trainers,
	tier2trainers,
	tier3trainers,
	tier4trainers,
	tier5trainers,
} from './trainersRecord';

export const TrainingField = () => {
	const { setActiveTabReducer, saveFile, patchSaveFileReducer } =
		useContext(SaveFileContext);
	const { setLocation } = useContext(LocationContext);
	const challenge = useChallengeTrainer();
	const evChallenge = useEvTraining();
	const [filter, setFilter] = useState<number>(0);

	const filteredElements = useMemo(() => {
		if (filter === 1) {
			return [
				<Card
					key={'random1'}
					icon={<FaRandom />}
					content={<h3>Random Opponent (Tier 1)</h3>}
					actionElements={[
						<button onClick={() => challenge({ tier: 1 })}>Challenge</button>,
					]}
				/>,
				...trainerCardStack({ trainers: tier1trainers, challenge, saveFile }),
			];
		}
		if (filter === 2) {
			return [
				<Card
					key={'random2'}
					icon={<FaRandom />}
					content={<h3>Random Opponent (Tier 2)</h3>}
					actionElements={[
						<button onClick={() => challenge({ tier: 2 })}>Challenge</button>,
					]}
				/>,
				...trainerCardStack({ trainers: tier2trainers, challenge, saveFile }),
			];
		}
		if (filter === 3) {
			return [
				<Card
					key={'random3'}
					icon={<FaRandom />}
					content={<h3>Random Opponent (Tier 3)</h3>}
					actionElements={[
						<button onClick={() => challenge({ tier: 3 })}>Challenge</button>,
					]}
				/>,
				...trainerCardStack({ trainers: tier3trainers, challenge, saveFile }),
			];
		}
		if (filter === 4) {
			return [
				<Card
					key={'random4'}
					icon={<FaRandom />}
					content={<h3>Random Opponent (Tier 4)</h3>}
					actionElements={[
						<button onClick={() => challenge({ tier: 4 })}>Challenge</button>,
					]}
				/>,
				...trainerCardStack({ trainers: tier4trainers, challenge, saveFile }),
			];
		}
		if (filter === 5) {
			return [
				<Card
					key={'random5'}
					icon={<FaRandom />}
					content={<h3>Random Opponent (Tier 5)</h3>}
					actionElements={[
						<button onClick={() => challenge({ tier: 5 })}>Challenge</button>,
					]}
				/>,
				...trainerCardStack({ trainers: tier5trainers, challenge, saveFile }),
			];
		}
		if (filter === 6) {
			return [
				...trainerCardStack({ trainers: specialTrainers, challenge, saveFile }),
			];
		}
		return [
			<Card
				key={'challengeField'}
				icon={<TbSoccerField />}
				content={<h3>Go to challenge field</h3>}
				actionElements={[
					<button
						disabled={Object.values(saveFile.bag).some((v) => v > 0)}
						onClick={() => {
							patchSaveFileReducer({
								meta: { activeTab: 'OVERWORLD' },
							});
							setLocation({
								mapId: 'challengeField',
								x: 2,
								y: 1,
								orientation: 'DOWN',
								forwardFoot: 'CENTER1',
							});
						}}
					>
						{Object.values(saveFile.bag).some((v) => v > 0)
							? 'No outside items allowed'
							: 'Start'}
					</button>,
				]}
			/>,
			<Card
				key={'random_challengeField'}
				icon={<TbSoccerField />}
				content={<h3>Go to random challenge field</h3>}
				actionElements={[
					<button
						disabled={Object.values(saveFile.bag).some((v) => v > 0)}
						onClick={() => {
							patchSaveFileReducer({
								meta: { activeTab: 'OVERWORLD' },
							});
							setLocation({
								mapId: 'randomField',
								x: 2,
								y: 1,
								orientation: 'DOWN',
								forwardFoot: 'CENTER1',
							});
						}}
					>
						{Object.values(saveFile.bag).some((v) => v > 0)
							? 'No outside items allowed'
							: 'Start'}
					</button>,
				]}
			/>,
			[
				'hp',
				'attack',
				'defense',
				'special-attack',
				'special-defense',
				'speed',
			].map((v) => {
				if (!saveFile.campUpgrades['invite effort value expert']) {
					return <></>;
				}
				return (
					<Card
						key={`ev_training_${v}`}
						icon={<TbSoccerField />}
						content={
							<div>
								<h3>EV Training ({v})</h3>
								<p>
									random Pokemon that increase {v} EV (hold a{' '}
									{evTrainingTool[v as Stat]} or macho-brace for increased ev
									gain)
								</p>
							</div>
						}
						actionElements={[
							<button onClick={() => evChallenge(v as Stat)}>challenge</button>,
						]}
					/>
				);
			}),
		];
	}, [
		challenge,
		evChallenge,
		filter,
		patchSaveFileReducer,
		saveFile,
		setLocation,
	]);

	const filterButtonText: Record<number, string> = {
		0: 'Challenge Mode',
		1: 'tier 1',
		2: 'tier 2',
		3: 'tier 3',
		4: 'tier 4',
		5: 'tier 5',
		6: 'Special Trainers',
	};
	const filterButtonCondition: Record<number, boolean> = useMemo(
		() => ({
			0: true,
			1: true,
			2: saveFile.campUpgrades['training field 2'],
			3: saveFile.campUpgrades['training field 3'],
			4: saveFile.campUpgrades['training field 4'],
			5: saveFile.campUpgrades['training field 5'],
			6: true,
		}),
		[saveFile.campUpgrades]
	);
	return (
		<Page
			goBack={() => setActiveTabReducer('OVERWORLD')}
			headline="Training Field:"
		>
			<Stack mode="column">
				{(saveFile.settings?.releaseFaintedPokemon ||
					saveFile.settings?.rogueLike) && (
					<h3>
						If you lose a training battle, your Pokemon will not be released,
						nor will the game reset
					</h3>
				)}
				<Stack mode="row">
					{Array.from({ length: 7 }).map((_, index) => {
						return (
							<button
								key={index}
								style={{
									backgroundColor: filter === index ? 'black' : undefined,
									color: filter === index ? 'white' : undefined,
								}}
								onClick={() => setFilter(index)}
								disabled={!filterButtonCondition[index]}
							>
								{filterButtonText[index]}
							</button>
						);
					})}
				</Stack>
				{...filteredElements}
			</Stack>
		</Page>
	);
};

const trainerCardStack = ({
	trainers,
	saveFile,
	challenge,
}: {
	trainers: Challenger[];
	saveFile: SaveFile;
	challenge: ({ id, tier }: { id?: string; tier?: 1 | 2 | 3 | 4 | 5 }) => void;
}): React.JSX.Element[] => {
	return trainers
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
		.map((t, i) => {
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
							<h3>{t.trainer?.id} </h3>
							<div
								style={{
									display: portraitMode ? 'flex' : 'grid',
									flexDirection: 'column',
									alignItems: 'center',
									gridTemplateColumns: '1fr 1fr 1fr',
									gap: '1rem',
								}}
							>
								{t.team.map((p, j) => (
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
										}}
									>
										<PokemonSprite key={t.id + p.name + i + j} name={p.name} />
										<strong key={t.id + p.name + 'LVL' + i + j}>
											Lvl {calculateLevelData(p.xp, p.growthRate).level}{' '}
											{p.name}
										</strong>
									</div>
								))}
							</div>

							{defeatedBefore && (
								<strong color={'green'}>Defeated before</strong>
							)}
						</div>
					}
					actionElements={[
						<button onClick={() => challenge({ id: t.id })}>Challenge</button>,
					]}
				/>
			);
		});
};
