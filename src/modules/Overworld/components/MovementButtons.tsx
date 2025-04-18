import { useContext, useEffect, useState } from 'react';
import {
	FaArrowDown,
	FaArrowLeft,
	FaArrowRight,
	FaArrowUp,
} from 'react-icons/fa';
import { battleSpriteSize, fps } from '../../../constants/gameData';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { CharacterOrientation } from '../../../interfaces/SaveFile';

export const MovementButtons = ({
	setNextInput,
}: {
	setNextInput: React.Dispatch<
		React.SetStateAction<CharacterOrientation | undefined>
	>;
}) => {
	const { latestMessage } = useContext(MessageQueueContext);
	const [pressed, setPressed] = useState<CharacterOrientation | undefined>();

	useEffect(() => {
		console.log('pressed', pressed);
		const int = setInterval(() => {
			if (pressed && !latestMessage) {
				setNextInput(pressed);
			} else {
				setPressed(undefined);
			}
		}, fps);

		return () => clearInterval(int);
	}, [latestMessage, pressed, setNextInput]);
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
				role="button"
				style={{ userSelect: 'none' }}
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
				style={{ userSelect: 'none' }}
				onPointerDown={() => setPressed('LEFT')}
				onPointerOut={() => setPressed(undefined)}
				onPointerLeave={() => setPressed(undefined)}
				onMouseLeave={() => setPressed(undefined)}
				onMouseUp={() => setPressed(undefined)}
				onMouseDown={() => setPressed('LEFT')}
				size={battleSpriteSize}
			/>
			<span />{' '}
			<FaArrowRight
				style={{ userSelect: 'none' }}
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
				style={{ userSelect: 'none' }}
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
