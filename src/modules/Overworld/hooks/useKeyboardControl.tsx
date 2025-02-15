import { useEffect } from 'react';
import {
	CharacterOrientation,
	OrientationKeyMap,
} from '../../../interfaces/SaveFile';

export const useKeyboardControl = (
	registerNextInput: (x: CharacterOrientation) => void,
	handleEnterPress: () => void,
	openMenu: () => void,
	disabled: boolean
) => {
	useEffect(() => {
		if (disabled) {
			return;
		}
		function keyDownHandler(e: globalThis.KeyboardEvent) {
			const newOrientation = OrientationKeyMap[e.key];

			if (newOrientation) {
				registerNextInput(newOrientation);
			}
			if (e.key === 'Enter') {
				handleEnterPress();
			}
			if (e.key === 'm') {
				openMenu();
			}
		}

		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	}, [disabled, handleEnterPress, openMenu, registerNextInput]);
};
