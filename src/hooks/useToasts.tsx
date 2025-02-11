import { useEffect, useState } from 'react';
import { animationTimer } from '../constants/gameData';

export type AddToastFunction = (x: string) => void;

export const useToasts = (
	timer?: number
): {
	latestToast: string | undefined;
	addToast: AddToastFunction;
} => {
	const [toasts, setToasts] = useState<string[]>([]);

	const addToast: AddToastFunction = (x: string) => {
		setToasts((toasts) => [...toasts, x]);
	};

	useEffect(() => {
		if (toasts.length === 0) {
			return;
		}
		const t = setTimeout(() => {
			setToasts(toasts.slice(1));
		}, timer ?? animationTimer);

		return () => clearTimeout(t);
	}, [timer, toasts]);

	return { latestToast: toasts[0], addToast };
};
