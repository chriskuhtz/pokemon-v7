import { BsBackpack4, BsCashCoin } from 'react-icons/bs';
import { MdCatchingPokemon } from 'react-icons/md';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

import { baseSize } from '../../constants/gameData';
import { RoutesType } from '../../interfaces/Routing';
import { BadgeName } from '../../interfaces/SaveFile';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
export const MainMenu = ({
	navigate,
	goBack,
	money,
	name,
	spriteUrl,
	badges,
}: {
	navigate: (x: RoutesType) => void;
	goBack: () => void;
	money: number;
	name: string;
	badges: BadgeName[];
	spriteUrl: string;
}): JSX.Element => {
	return (
		<Page headline="Main Menu:" goBack={goBack}>
			<Stack mode="column">
				<Card
					content={
						<div
							style={{
								display: 'flex',
								padding: '.5rem',
								alignItems: 'center',
							}}
						>
							<IconSolarSystem
								sun={{
									url: spriteUrl,
									styles: {
										objectFit: 'none',
										objectPosition: '0 0',
										width: baseSize,
										height: baseSize,
									},
								}}
								firstPlanetUrl={
									badges.includes('boulder-badge')
										? '/badges/boulder-badge.png'
										: undefined
								}
							/>
							<div>
								<h4>{name}</h4>
								<h4>Money: {money}$</h4>
							</div>
						</div>
					}
					icon={<BsCashCoin size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('BAG')}
					content={<h4>Bag</h4>}
					icon={<BsBackpack4 size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('TEAM')}
					content={<h4>Team</h4>}
					icon={<MdCatchingPokemon size={baseSize / 2} />}
					actionElements={[]}
				/>
			</Stack>
		</Page>
	);
};
