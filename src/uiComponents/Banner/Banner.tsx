import { ReactNode } from 'react';

export const Banner = ({ children }: { children: ReactNode }) => {
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
					backgroundColor: 'black',
					color: 'white',
					display: 'flex',
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
