import { useState, useEffect } from 'react';
import { animationTimer } from '../constants/gameData';

export const useToasts = (): {
	latestToast: string | undefined;
	addToast: (x: string) => void;
} => {
	const [toasts, setToasts] = useState<string[]>([]);

	const addToast = (x: string) => {
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
