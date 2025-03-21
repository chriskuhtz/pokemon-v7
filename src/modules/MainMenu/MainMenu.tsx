import { BsBackpack4 } from 'react-icons/bs';
import { MdCatchingPokemon } from 'react-icons/md';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

import { useContext, useState } from 'react';
import { GoTasklist } from 'react-icons/go';
import { TrainerCard } from '../../components/TrainerCard/TrainerCard';
import { battleSpriteSize } from '../../constants/gameData';
import { mapsRecord } from '../../constants/maps/mapsRecord';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { useQuests } from '../../hooks/useQuests';
import { useTeleport } from '../../hooks/useTeleport';

export const MainMenu = ({
	goBack,
	reset,
}: {
	goBack: () => void;
	reset: () => void;
}): JSX.Element => {
	const [resetConfirmationInProgress, setRCIP] = useState<boolean>(false);
	const { numberOfUncollected } = useQuests();
	const navigate = useNavigate();
	const { addMessage } = useContext(MessageQueueContext);
	const { teleporter, teleportHome } = useTeleport();

	return (
		<Page headline="Main Menu:" goBack={goBack}>
			<Stack mode="column">
				<TrainerCard />
				{teleporter && (
					<Card
						onClick={() => teleportHome()}
						content={<h4>Teleport back to camp</h4>}
						icon={
							<img
								src={getPokemonSprite(teleporter.name)}
								height={battleSpriteSize}
								width={battleSpriteSize}
							/>
						}
						actionElements={[]}
					/>
				)}
				<Card
					onClick={() => navigate('MAIN', 'BAG')}
					content={<h4>Bag</h4>}
					icon={<BsBackpack4 size={battleSpriteSize} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'TEAM')}
					content={<h4>Team</h4>}
					icon={<MdCatchingPokemon size={battleSpriteSize} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'QUESTS')}
					content={<h4>Quests</h4>}
					icon={<GoTasklist size={battleSpriteSize} />}
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
								needsNoConfirmation: true,
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

				{window.localStorage.getItem('devmode') &&
					Object.keys(mapsRecord).map((m) => (
						<Card
							key={m}
							onClick={() => navigate('MAIN', `MAP_MAKER_${m}`)}
							content={<h4>Map Maker {m}</h4>}
							icon={<GoTasklist size={battleSpriteSize} />}
							actionElements={[]}
						/>
					))}
			</Stack>
		</Page>
	);
};
