import { useContext } from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { battleSpriteSize } from '../../constants/gameData';
import { BaseSizeContext } from '../../hooks/useBaseSize';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';

export const TrainerCard = () => {
	const {
		saveFile: { sprite, money, badges, playerId, researchPoints },
	} = useContext(SaveFileContext);
	const { baseSize } = useContext(BaseSizeContext);
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
								width: baseSize,
								height: baseSize,
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
						<h4>Money: {money}$</h4>
						<h4>Reseach Points: {researchPoints}</h4>
					</div>
				</div>
			}
			icon={<BsCashCoin size={battleSpriteSize} />}
			actionElements={[]}
		/>
	);
};
