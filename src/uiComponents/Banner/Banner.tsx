import { CSSProperties, ReactNode } from 'react';

export const Banner = ({
	children,
	flexDirection,
	backgroundColor,
}: {
	children: ReactNode;
	flexDirection?: CSSProperties['flexDirection'];
	backgroundColor?: string;
}) => {
	return (
		<div
			style={{
				display: 'flex',
				height: '100dvh',
				alignItems: 'center',
				justifyContent: 'stretch',
				position: 'absolute',
				top: 0,
			}}
		>
			<div
				style={{
					backgroundColor: backgroundColor ?? 'rgba(0,0,0,.8)',
					color: 'white',
					display: 'flex',
					flexDirection: flexDirection ?? 'row',
					alignItems: 'center',
					width: '100vw',
					padding: '0 2rem',
					justifyContent: 'space-evenly',
				}}
			>
				{children}
			</div>
		</div>
	);
};
