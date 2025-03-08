import { CSSProperties, ReactNode } from 'react';

export const Chip = ({
	children,
	style,
	onClick,
}: {
	children: ReactNode;
	style?: CSSProperties;
	onClick?: () => void;
}) => {
	return (
		<div
			tabIndex={onClick ? 0 : undefined}
			role={onClick ? 'button' : undefined}
			onClick={onClick}
			onKeyDown={(e) => {
				e.stopPropagation();
				if (onClick && e.key === 'Enter') {
					onClick();
				}
			}}
			style={{
				color: 'white',
				backgroundColor: 'black',
				fontSize: 'smaller',
				borderRadius: 9000,
				padding: '0 .25rem',
				whiteSpace: 'nowrap',
				width: 'min-content',
				...style,
			}}
		>
			{children}
		</div>
	);
};
