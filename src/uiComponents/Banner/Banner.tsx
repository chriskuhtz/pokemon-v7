import { CSSProperties, ReactNode } from 'react';

export const Banner = ({
	children,
	flexDirection,
	backgroundColor,
	onClick,
}: {
	children: ReactNode;
	flexDirection?: CSSProperties['flexDirection'];
	backgroundColor?: string;
	onClick?: () => void;
}) => {
	return (
		<div
			style={{
				display: 'flex',
				height: '100dvh',
				alignItems: 'center',
				justifyContent: 'stretch',
				position: 'absolute',
				maxWidth: '100dvw',
				overflow: 'hidden',
				top: 0,
				left: 0,
				zIndex: 9000,
			}}
		>
			<div
				onClick={onClick}
				onKeyDown={(e) => {
					if (onClick && e.key === 'Enter') {
						onClick();
					}
				}}
				style={{
					backgroundColor: backgroundColor ?? 'rgba(0,0,0,.8)',
					color: 'white',
					display: 'flex',
					flexDirection: flexDirection ?? 'row',
					alignItems: 'center',
					width: '100dvw',

					padding: '0 2rem',
					justifyContent: 'space-evenly',
				}}
			>
				{children}
			</div>
		</div>
	);
};
