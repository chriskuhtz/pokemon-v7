import { ReactNode } from 'react';

export const FloatyMenu = ({
	children,
	top,
	left,
	zIndex = 1,
}: {
	children: ReactNode;
	top: number;
	left: number;
	zIndex?: number;
}) => {
	return (
		<div
			style={{
				position: 'absolute',
				top,
				left,
				zIndex,
				padding: '1rem',
				borderRadius: 8,
				backgroundColor: 'rgba(255,255,255,.9)',
				width: 'min-content',
				color: 'black',
			}}
		>
			{children}
		</div>
	);
};
