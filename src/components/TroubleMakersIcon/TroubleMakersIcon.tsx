import { useContext, useMemo } from 'react';
import {
	TbCircleLetterAFilled,
	TbCircleLetterMFilled,
	TbCircleLetterPFilled,
	TbCircleLetterRFilled,
} from 'react-icons/tb';
import { battleSpriteSize, ONE_HOUR } from '../../constants/gameData';
import { typeColors } from '../../constants/typeColors';
import { troubleMakersRemaining } from '../../functions/areAllRocketsDefeated';
import { LocationContext } from '../../hooks/LocationProvider';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import './TroubleMakersIcon.css';

export const TroubleMakersIcon = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { location } = useContext(LocationContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const remaining = useMemo(() => troubleMakersRemaining(saveFile), [saveFile]);

	const handleClear = () => {
		addMessage({ message: `All Rockets defeated, Rangerlevel increased` });
		const now = new Date().getTime();
		patchSaveFileReducer({
			troubleMakers: undefined,
			rangerLevel: (saveFile.rangerLevel ?? 0) + 1,
			nextTroubleMakersAt: now + Math.floor(ONE_HOUR * Math.random()),
			handledOccupants: saveFile.handledOccupants.filter(
				(h) => !saveFile.troubleMakers?.trainers.some((t) => t.id === h.id)
			),
		});
	};

	if (!saveFile.troubleMakers) {
		return <></>;
	}

	const { affiliation } = saveFile.troubleMakers;
	if (remaining === 0) {
		if (affiliation === 'aqua') {
			return (
				<TbCircleLetterAFilled
					className={'rocketIcon'}
					size={battleSpriteSize}
					color={typeColors['grass']}
					onClick={handleClear}
				/>
			);
		}
		if (affiliation === 'galactic') {
			return (
				<TbCircleLetterPFilled
					className={'rocketIcon'}
					size={battleSpriteSize}
					color={typeColors['grass']}
					onClick={handleClear}
				/>
			);
		}
		if (affiliation === 'magma') {
			return (
				<TbCircleLetterMFilled
					className={'rocketIcon'}
					size={battleSpriteSize}
					color={typeColors['grass']}
					onClick={handleClear}
				/>
			);
		}
		return (
			<TbCircleLetterRFilled
				className={'rocketIcon'}
				size={battleSpriteSize}
				color={typeColors['grass']}
				onClick={handleClear}
			/>
		);
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
					addMessage({ message: `${remaining} Magma Members remaining` })
				}
			/>
		);
	}
	if (affiliation === 'galactic') {
		return (
			<TbCircleLetterPFilled
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
