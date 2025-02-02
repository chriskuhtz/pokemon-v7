import { ReactNode } from 'react';

export const Stack = ({
	children,
	gap,
	mode,
}: {
	children: ReactNode[];
	gap?: number;
	mode: 'row' | 'column';
}): JSX.Element => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: mode,
				gap: `${gap ?? 0.5}rem`,
			}}
		>
			{children}
		</div>
	);
};
