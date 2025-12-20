import { useContext } from 'react';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { GameDataContext } from '../../hooks/useGameData';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { CatchBoosts } from '../CatchBoosts/CatchBoosts';

export const TrainerCard = () => {
	const {
		saveFile: {
			sprite,
			playerId,
			researchPoints,
			mileStones,
			rangerLevel,
			longestStreak,
		},
	} = useContext(SaveFileContext);
	const gameData = useContext(GameDataContext);

	return (
		<div
			style={{
				padding: '1rem .5rem',
				backgroundColor: ' rgba(255, 255, 255, 0.5)',
				border: '2px solid black',
				borderRadius: '1rem',
			}}
		>
			<div
				style={{
					display: 'flex',
					gap: '1rem',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					flexWrap: 'wrap',
				}}
			>
				<IconSolarSystem
					sun={{
						url: `/npcs/${sprite}.png`,
						styles: {
							objectFit: 'none',
							objectPosition: '0 0',
							width: battleSpriteSize * 2,
							height: battleSpriteSize * 2,
						},
					}}
				/>

				<div>
					<h4>{playerId}</h4>
					{gameData.features.quests && (
						<h4>Research Points: {researchPoints}</h4>
					)}
					<h4>Damage Record: {mileStones.damageRecord}</h4>
					{mileStones.challengeFieldRecord ? (
						<h4>Challenge Field Record: {mileStones.challengeFieldRecord}</h4>
					) : (
						<></>
					)}
					{mileStones.randomFieldRecord ? (
						<h4>Random Field Record: {mileStones.randomFieldRecord}</h4>
					) : (
						<></>
					)}
					{longestStreak && gameData.features.catchStreaks ? (
						<h4>Longest Catch Streak: {longestStreak}</h4>
					) : (
						<></>
					)}
					{rangerLevel ? <h4>Ranger Level: {rangerLevel}</h4> : <></>}
				</div>
				<CatchBoosts />
			</div>
		</div>
	);
};
