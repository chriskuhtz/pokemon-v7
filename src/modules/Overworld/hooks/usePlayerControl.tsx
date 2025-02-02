import { useEffect } from 'react';
import {
	CharacterOrientation,
	OrientationKeyMap,
} from '../../../interfaces/SaveFile';

export const usePlayerControl = (
	registerNextInput: (x: CharacterOrientation) => void
) => {
	useEffect(() => {
		function keyDownHandler(e: globalThis.KeyboardEvent) {
			const newOrientation = OrientationKeyMap[e.key];

			if (newOrientation) {
				registerNextInput(newOrientation);
			}
		}

		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	}, [registerNextInput]);
};
