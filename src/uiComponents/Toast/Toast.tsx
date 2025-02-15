import { useMemo } from 'react';
import { ToastType } from '../../hooks/useToasts';

export const Toast = ({
	toast,
}: {
	toast: { message: string; type?: ToastType };
}) => {
	const color = useMemo(() => {
		if (toast.type === 'ERROR') {
			return `rgba(105, 16, 20,.8)`;
		}
		if (toast.type === 'SUCCESS') {
			return `rgba(4, 112, 15,.8)`;
		}
		return 'rgba(0,0,0,.8)';
	}, [toast]);
	return (
		<div
			style={{
				position: 'absolute',
				left: '.5rem',
				padding: '1rem 2rem',
				top: '.5rem',
				backgroundColor: color,
				color: 'white',
				borderRadius: '1rem',
			}}
		>
			{toast.message}
		</div>
	);
};
