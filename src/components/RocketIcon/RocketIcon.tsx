import { useContext, useMemo } from 'react';
import { TbCircleLetterRFilled } from 'react-icons/tb';
import { battleSpriteSize, ONE_HOUR } from '../../constants/gameData';
import { typeColors } from '../../constants/typeColors';
import { rocketsRemaining } from '../../functions/areAllRocketsDefeated';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import './RocketIcon.css';

export const RocketIcon = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const remaining = useMemo(() => rocketsRemaining(saveFile), [saveFile]);

	const handleClear = () => {
		addMessage({ message: `All Rockets defeated, Rangerlevel increased` });
		const now = new Date().getTime();
		patchSaveFileReducer({
			currentRocketOperation: undefined,
			rangerLevel: (saveFile.rangerLevel ?? 0) + 1,
			nextRocketOperationAt: now + Math.floor(ONE_HOUR * Math.random()),
			handledOccupants: saveFile.handledOccupants.filter(
				(h) => !h.id.includes('Rocket Grunt')
			),
		});
	};

	if (!saveFile.currentRocketOperation) {
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
	if (saveFile.location.mapId !== saveFile.currentRocketOperation.route) {
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

// //check if all rockets defeated

// const allRocketsDefeated = areAllActiveRocketsDefeated(update);

// if (allRocketsDefeated) {
//

// 	update.currentRocketOperation = undefined;
// 	update.rangerLevel = (update.rangerLevel ?? 0) + 1;
// 	update.nextRocketOperationAt = now + ONE_HOUR;
// 	update.handledOccupants = update.handledOccupants.filter(
// 		(h) => !h.id.includes('Rocket Grunt')
// 	);
// }
