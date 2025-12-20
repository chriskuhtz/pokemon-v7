import { useContext, useMemo } from 'react';
import {
	TbCircleLetterAFilled,
	TbCircleLetterGFilled,
	TbCircleLetterMFilled,
	TbCircleLetterRFilled,
} from 'react-icons/tb';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { typeColors } from '../../constants/typeColors';
import { troubleMakersRemaining } from '../../functions/areAllRocketsDefeated';
import { LocationContext } from '../../hooks/LocationProvider';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import './TroubleMakersIcon.css';
import { ClearTroubleMakersButton } from './components/ClearTroubleMakersButton';

export const TroubleMakersIcon = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { location } = useContext(LocationContext);
	const { saveFile } = useContext(SaveFileContext);

	const remaining = useMemo(() => troubleMakersRemaining(saveFile), [saveFile]);

	if (!saveFile.troubleMakers) {
		return <></>;
	}

	const { affiliation } = saveFile.troubleMakers;
	if (remaining === 0) {
		<ClearTroubleMakersButton affiliation={affiliation} />;
	}
	if (location.mapId !== saveFile.troubleMakers.route) {
		return <></>;
	}

	if (affiliation === 'aqua') {
		return (
			<TbCircleLetterAFilled
				size={battleSpriteSize}
				color={typeColors['fighting']}
				onClick={() =>
					addMessage({ message: `${remaining} Aqua Members remaining` })
				}
			/>
		);
	}
	if (affiliation === 'magma') {
		return (
			<TbCircleLetterMFilled
				size={battleSpriteSize}
				color={typeColors['fighting']}
				onClick={() =>
					addMessage({
						message: `${remaining} Magma Members remaining`,
					})
				}
			/>
		);
	}
	if (affiliation === 'galactic') {
		return (
			<TbCircleLetterGFilled
				size={battleSpriteSize}
				color={typeColors['fighting']}
				onClick={() =>
					addMessage({ message: `${remaining} galactic Members remaining` })
				}
			/>
		);
	}

	return (
		<TbCircleLetterRFilled
			size={battleSpriteSize}
			color={typeColors['fighting']}
			onClick={() =>
				addMessage({ message: `${remaining} Rocket Trainers remaining` })
			}
		/>
	);
};
