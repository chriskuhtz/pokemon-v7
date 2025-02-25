import { useEffect } from 'react';
import {
	CharacterOrientation,
	OrientationKeyMap,
} from '../../../interfaces/SaveFile';

export const useKeyboardControl = (
	registerNextInput: (x: CharacterOrientation) => void,
	handleEnterPress: () => void,
	openMenu: () => void,
	openQuests: () => void,
	openTeam: () => void,
	openBag: () => void,
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
			if (e.key === 'q') {
				openQuests();
			}
			if (e.key === 'b' || e.key === 'i') {
				openBag();
			}
			if (e.key === 't') {
				openTeam();
			}
		}

		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	}, [
		disabled,
		handleEnterPress,
		openBag,
		openMenu,
		openQuests,
		openTeam,
		registerNextInput,
	]);
};
