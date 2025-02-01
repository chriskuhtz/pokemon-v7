import { ReactNode } from 'react';

export const Stack = ({
	children,
	gap,
}: {
	children: ReactNode[];
	gap?: number;
}): JSX.Element => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: `${gap ?? 0.5}rem`,
			}}
		>
			{children}
		</div>
	);
};
