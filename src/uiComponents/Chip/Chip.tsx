import { CSSProperties } from 'react';

export const Chip = ({
	children,
	style,
	onClick,
}: {
	children: React.JSX.Element;
	style?: CSSProperties;
	onClick?: () => void;
}) => {
	return (
		<div
			onClick={onClick}
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
