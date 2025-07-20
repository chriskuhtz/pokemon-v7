import { useContext, useEffect, useState } from 'react';
import {
	FaArrowDown,
	FaArrowLeft,
	FaArrowRight,
	FaArrowUp,
} from 'react-icons/fa';
import { TbCircleLetterA } from 'react-icons/tb';
import { battleSpriteSize, fps } from '../../../constants/gameData/gameData';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { CharacterOrientation } from '../../../interfaces/SaveFile';

export const MovementButtons = ({
	setNextInput,
	handleEnterPress,
}: {
	setNextInput: React.Dispatch<
		React.SetStateAction<CharacterOrientation | undefined>
	>;
	handleEnterPress: () => void;
}) => {
	const { saveFile } = useContext(SaveFileContext);
	const { latestMessage } = useContext(MessageQueueContext);
	const [pressed, setPressed] = useState<CharacterOrientation | undefined>();

	useEffect(() => {
		const int = setInterval(() => {
			if (pressed && !latestMessage) {
				setNextInput(pressed);
			} else {
				setPressed(undefined);
			}
		}, fps);

		return () => clearInterval(int);
	}, [latestMessage, pressed, setNextInput]);

	if (saveFile.settings?.hideMovementButtons) {
		return <></>;
	}
	return (
		<div
			style={{
				position: 'absolute',
				bottom: '1.5rem',
				right: '1rem',
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr',
				gap: '1rem',
				alignItems: 'center',
				zIndex: 9000,
				padding: '.5rem',
				borderRadius: 9000,
				backgroundColor: 'rgba(255,255,255,.6)',
			}}
		>
			<span />
			<FaArrowUp
				onPointerDown={() => setPressed('UP')}
				onPointerOut={() => setPressed(undefined)}
				onPointerLeave={() => setPressed(undefined)}
				onMouseLeave={() => setPressed(undefined)}
				onMouseUp={() => setPressed(undefined)}
				onMouseDown={() => setPressed('UP')}
				size={battleSpriteSize}
			/>
			<span />{' '}
			<FaArrowLeft
				onPointerDown={() => setPressed('LEFT')}
				onPointerOut={() => setPressed(undefined)}
				onPointerLeave={() => setPressed(undefined)}
				onMouseLeave={() => setPressed(undefined)}
				onMouseUp={() => setPressed(undefined)}
				onMouseDown={() => setPressed('LEFT')}
				size={battleSpriteSize}
			/>
			<TbCircleLetterA size={battleSpriteSize} onClick={handleEnterPress} />
			<FaArrowRight
				onPointerDown={() => setPressed('RIGHT')}
				onPointerOut={() => setPressed(undefined)}
				onPointerLeave={() => setPressed(undefined)}
				onMouseLeave={() => setPressed(undefined)}
				onMouseUp={() => setPressed(undefined)}
				onMouseDown={() => setPressed('RIGHT')}
				size={battleSpriteSize}
			/>
			<span />
			<FaArrowDown
				onPointerDown={() => setPressed('DOWN')}
				onPointerOut={() => setPressed(undefined)}
				onPointerLeave={() => setPressed(undefined)}
				onMouseLeave={() => setPressed(undefined)}
				onMouseUp={() => setPressed(undefined)}
				onMouseDown={() => setPressed('DOWN')}
				size={battleSpriteSize}
			/>
			<span />
		</div>
	);
};
