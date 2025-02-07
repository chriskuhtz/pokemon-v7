import { useEffect, useState } from 'react';
import { animationTimer } from '../constants/gameData';

export type AddToastFunction = (x: string) => void;

export const useToasts = (): {
	latestToast: string | undefined;
	addToast: AddToastFunction;
} => {
	const [toasts, setToasts] = useState<string[]>([]);

	const addToast: AddToastFunction = (x: string) => {
		setToasts((toasts) => [...toasts, x]);
	};

	useEffect(() => {
		const t = setTimeout(() => {
			setToasts(toasts.slice(1));
		}, animationTimer);

		return () => clearTimeout(t);
	}, [toasts]);

	return { latestToast: toasts[0], addToast };
};
