import { useContext, useMemo } from 'react';
import { TbCircleLetterRFilled } from 'react-icons/tb';
import { battleSpriteSize, ONE_HOUR } from '../../constants/gameData';
import { typeColors } from '../../constants/typeColors';
import { rocketsRemaining } from '../../functions/areAllRocketsDefeated';
import { LocationContext } from '../../hooks/LocationProvider';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import './RocketIcon.css';

export const RocketIcon = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { location } = useContext(LocationContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const remaining = useMemo(() => rocketsRemaining(saveFile), [saveFile]);

	const handleClear = () => {
		addMessage({ message: `All Rockets defeated, Rangerlevel increased` });
		const now = new Date().getTime();
		patchSaveFileReducer({
			rocketOperation: undefined,
			rangerLevel: (saveFile.rangerLevel ?? 0) + 1,
			nextRocketOperationAt: now + Math.floor(ONE_HOUR * Math.random()),
			handledOccupants: saveFile.handledOccupants.filter(
				(h) => !h.id.includes('Rocket')
			),
		});
	};

	console.log(saveFile.rocketOperation);
	if (!saveFile.rocketOperation) {
		return <></>;
	}

	if (remaining === 0) {
		return (
			<TbCircleLetterRFilled
				className={'rocketIcon'}
				size={battleSpriteSize}
				color={typeColors['grass']}
				onClick={handleClear}
			/>
		);
	}
	if (location.mapId !== saveFile.rocketOperation.route) {
		return <></>;
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
