import { useContext } from 'react';
import {
	TbCircleLetterAFilled,
	TbCircleLetterMFilled,
	TbCircleLetterPFilled,
	TbCircleLetterRFilled,
} from 'react-icons/tb';
import { battleSpriteSize } from '../../../constants/gameData/gameData';
import { typeColors } from '../../../constants/typeColors';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { EvilTeam } from '../../../interfaces/SaveFile';

import '../TroubleMakersIcon.css';

export const ClearTroubleMakersButton = ({
	affiliation,
}: {
	affiliation: EvilTeam;
}): JSX.Element => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const handleClear = () => {
		addMessage({
			message: `All ${
				saveFile.troubleMakers?.affiliation ?? 'rocket'
			} Members defeated, Rangerlevel increased`,
		});

		patchSaveFileReducer({
			troubleMakers: undefined,
			rangerLevel: (saveFile.rangerLevel ?? 0) + 1,
			handledOccupants: saveFile.handledOccupants.filter(
				(h) => !saveFile.troubleMakers?.trainers.some((t) => t.id === h.id)
			),
		});
	};
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
	return <></>;
};
