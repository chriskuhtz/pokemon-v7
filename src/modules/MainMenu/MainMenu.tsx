import { BsBackpack4, BsCashCoin } from 'react-icons/bs';
import { MdCatchingPokemon } from 'react-icons/md';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

import { useContext, useState } from 'react';
import { GoTasklist } from 'react-icons/go';
import { baseSize } from '../../constants/gameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { useQuests } from '../../hooks/useQuests';
import { BadgeName } from '../../interfaces/Badge';
import { Banner } from '../../uiComponents/Banner/Banner';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';

export const MainMenu = ({
	goBack,
	money,
	name,
	spriteUrl,
	badges,
	reset,
}: {
	goBack: () => void;
	money: number;
	name: string;
	badges: BadgeName[];
	spriteUrl: string;
	reset: () => void;
}): JSX.Element => {
	const [resetConfirmationInProgress, setRCIP] = useState<boolean>(false);
	const { numberOfUncollected } = useQuests();
	const navigate = useNavigate();
	const { latestMessage, addMessage } = useContext(MessageQueueContext);

	return (
		<Page headline="Main Menu:" goBack={goBack}>
			{latestMessage && (
				<Banner>
					<h3>{latestMessage.message}</h3>
				</Banner>
			)}
			<Stack mode="column">
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
									url: spriteUrl,
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
								<h4>{name}</h4>
								<h4>Money: {money}$</h4>
							</div>
						</div>
					}
					icon={<BsCashCoin size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'BAG')}
					content={<h4>Bag</h4>}
					icon={<BsBackpack4 size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'TEAM')}
					content={<h4>Team</h4>}
					icon={<MdCatchingPokemon size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'QUESTS')}
					content={<h4>Quests</h4>}
					icon={<GoTasklist size={baseSize / 2} />}
					actionElements={
						numberOfUncollected > 0
							? [<strong>Uncollected: {numberOfUncollected}</strong>]
							: []
					}
				/>
				{resetConfirmationInProgress ? (
					<button
						onClick={() =>
							addMessage({
								message: 'Resetting Your Save File',
								onRemoval: () => reset(),
							})
						}
						style={{ backgroundColor: 'darkred', color: 'white' }}
					>
						<h3>Are you sure? Click again to confirm</h3>
					</button>
				) : (
					<button
						onClick={() => setRCIP(true)}
						style={{ backgroundColor: 'darkred', color: 'white' }}
					>
						Delete Savefile and reset
					</button>
				)}
				<Card
					onClick={() => navigate('MAIN', 'FARM')}
					content={<h4>FARM</h4>}
					icon={<GoTasklist size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'FOSSIL_REVIVER')}
					content={<h4>FOSSIL REVIVER</h4>}
					icon={<GoTasklist size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'MAP_MAKER_CAMP')}
					content={<h4>Map Maker Camp</h4>}
					icon={<GoTasklist size={baseSize / 2} />}
					actionElements={[]}
				/>{' '}
				<Card
					onClick={() => navigate('MAIN', 'MAP_MAKER_ROUTEN1')}
					content={<h4>Map Maker RouteN1</h4>}
					icon={<GoTasklist size={baseSize / 2} />}
					actionElements={[]}
				/>
			</Stack>
		</Page>
	);
};
