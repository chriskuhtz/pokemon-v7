import React, { useContext } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';

export const TrainerCard = () => {
	const {
		saveFile: {
			sprite,
			badges,
			playerId,
			researchPoints,
			mileStones,
			rangerLevel,
			catchBoosts,
			longestStreak,
		},
	} = useContext(SaveFileContext);

	return (
		<div
			style={{
				display: 'flex',
				padding: '1rem .5rem',
				gap: '1rem',
				alignItems: 'center',
				backgroundColor: ' rgba(255, 255, 255, 0.5)',
				border: '2px solid black',
				borderRadius: '1rem',
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
				firstPlanet={
					badges.includes('boulder-badge')
						? '/badges/boulder-badge.png'
						: undefined
				}
			/>

			<div>
				<h4>{playerId}</h4>
				<h4>Research Points: {researchPoints}</h4>
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
				{longestStreak ? <h4>Longest Catch Streak: {longestStreak}</h4> : <></>}
				{rangerLevel ? <h4>Ranger Level: {rangerLevel}</h4> : <></>}
			</div>
			{catchBoosts ? (
				<div>
					<h4>Catch Boosts:</h4>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr',
							gap: '1rem',
						}}
					>
						{Object.entries(catchBoosts).map(([type, boost]) => {
							if (boost === 0) {
								return <React.Fragment key={type}></React.Fragment>;
							}
							return (
								<strong
									key={type}
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<img
										height={battleSpriteSize / 1.5}
										src={`/typeIcons/${type}.png`}
									/>
									:{(boost * 0.1).toPrecision(1)}
								</strong>
							);
						})}
					</div>
				</div>
			) : (
				<></>
			)}

			<div>
				<h4>Travelling Trainer Scores:</h4>

				{mileStones.barryDefeatedAt ? (
					<h4>Barry: {mileStones.barryDefeatedAt}</h4>
				) : (
					<></>
				)}
				{mileStones.cynthiaDefeatedAt ? (
					<h4>Cynthia: {mileStones.cynthiaDefeatedAt}</h4>
				) : (
					<></>
				)}
				{mileStones.nDefeatedAt ? <h4>N: {mileStones.nDefeatedAt}</h4> : <></>}
				{mileStones.silverDefeatedAt ? (
					<h4>silver: {mileStones.silverDefeatedAt}</h4>
				) : (
					<></>
				)}
				{mileStones.silverDefeatedAt ? (
					<h4>silver: {mileStones.silverDefeatedAt}</h4>
				) : (
					<></>
				)}
				{mileStones.hughDefeatedAt ? (
					<h4>hugh: {mileStones.hughDefeatedAt}</h4>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
