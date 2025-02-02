import { useEffect, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import {
	CharacterLocationData,
	CharacterOrientation,
} from '../../interfaces/SaveFile';
import './Overworld.css';
import { useCharacter } from './hooks/useCharacter';
import { usePlayerControl } from './hooks/usePlayerControl';

const playerCanvasId = 'playerCanvas';
const fps = 16;

export const Overworld = ({
	openMenu,
	playerLocation,
	setOrientation,
	setNextForwardFoot,
}: {
	openMenu: () => void;
	playerLocation: CharacterLocationData;
	setOrientation: (update: CharacterOrientation) => void;
	setNextForwardFoot: () => void;
}) => {
	const [nextInput, setNextInput] = useState<
		CharacterOrientation | undefined
	>();

	useEffect(() => {
		const int = setInterval(() => {
			if (
				!nextInput &&
				!['CENTER1', 'CENTER2'].includes(playerLocation.forwardFoot)
			) {
				setNextForwardFoot();
			}
			if (nextInput === playerLocation.orientation) {
				setNextForwardFoot();
			}
			if (nextInput && nextInput !== playerLocation.orientation) {
				setOrientation(nextInput);
			}
			setNextInput(undefined);
		}, 1000 / fps);

		return () => clearInterval(int);
	}, [
		nextInput,
		playerLocation.forwardFoot,
		playerLocation.orientation,
		setNextForwardFoot,
		setOrientation,
	]);
	//PLAYER
	useCharacter(playerCanvasId, playerLocation);
	usePlayerControl(setNextInput);

	return (
		<div className="overworld">
			<IoMdMenu
				style={{ position: 'absolute', top: '1.5rem', left: '1rem' }}
				onClick={openMenu}
				size={30}
			/>
			<canvas id={playerCanvasId} height={64} width={64} />
		</div>
	);
};
