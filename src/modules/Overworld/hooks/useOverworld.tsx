import { useEffect, useState } from 'react';
import {
	CharacterLocationData,
	CharacterOrientation,
} from '../../../interfaces/SaveFile';

const fps = 16;

export const useOverworld = (
	playerLocation: CharacterLocationData,
	setOrientation: (update: CharacterOrientation) => void,
	setNextForwardFoot: () => void
) => {
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

	return setNextInput;
};
