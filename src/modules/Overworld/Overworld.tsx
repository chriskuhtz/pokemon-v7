import { IoMdMenu } from 'react-icons/io';
import {
	CharacterLocationData,
	CharacterOrientation,
} from '../../interfaces/SaveFile';
import './Overworld.css';
import { useCharacter } from './hooks/useCharacter';
import { useOverworld } from './hooks/useOverworld';
import { usePlayerControl } from './hooks/usePlayerControl';

const playerCanvasId = 'playerCanvas';

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
	const setNextInput = useOverworld(
		playerLocation,
		setOrientation,
		setNextForwardFoot
	);
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
