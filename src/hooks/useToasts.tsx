import { useEffect, useState } from 'react';
import { animationTimer } from '../constants/gameData';

export type ToastType = 'STANDARD' | 'ERROR' | 'SUCCESS';
export type AddToastFunction = (x: string, type?: ToastType) => void;

export const useToasts = (
	timer?: number
): {
	latestToast: { message: string; type?: ToastType } | undefined;
	addToast: AddToastFunction;
} => {
	const [toasts, setToasts] = useState<{ message: string; type?: ToastType }[]>(
		[]
	);

	const addToast: AddToastFunction = (message, type) => {
		setToasts((toasts) => [...toasts, { message, type }]);
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
