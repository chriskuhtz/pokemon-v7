import { useState, useEffect } from 'react';
import { animationTimer } from '../constants/gameData';

export const useScreenTransition = (
	onTransitionEnd: () => void
): { startTransition: () => void; inTransition: boolean } => {
	const [inTransition, setScreenTransition] = useState<boolean>(false);

	const startTransition = () => setScreenTransition(true);

	useEffect(() => {
		if (!inTransition) {
			return;
		}

		const t = setTimeout(() => {
			onTransitionEnd();
			setScreenTransition(false);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [onTransitionEnd, inTransition]);

	return { startTransition, inTransition };
};
