import { useContext } from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { battleSpriteSize } from '../../constants/gameData';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';
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
		},
	} = useContext(SaveFileContext);

	return (
		<Card
			content={
				<div
					style={{
						display: 'flex',
						padding: '.5rem',
						gap: '1rem',
						alignItems: 'center',
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
						{/* <h4>Money: {money}$</h4> */}
						<h4>Research Points: {researchPoints}</h4>
						<h4>Damage Record: {mileStones.damageRecord}</h4>
						{mileStones.challengeFieldRecord && (
							<h4>Challenge Field Record: {mileStones.challengeFieldRecord}</h4>
						)}
						{(rangerLevel ?? 0 > 0) && <h4>Ranger Level: {rangerLevel}</h4>}
					</div>
				</div>
			}
			icon={<BsCashCoin size={battleSpriteSize} />}
			actionElements={[]}
		/>
	);
};
