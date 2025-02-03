import { CSSProperties, ReactNode } from 'react';

export const Stack = ({
	children,
	gap,
	mode,
	justifyContent,
}: {
	children: ReactNode[];
	gap?: number;
	mode: 'row' | 'column';
	justifyContent?: CSSProperties['justifyContent'];
}): JSX.Element => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: mode,
				gap: `${gap ?? 0.5}rem`,
				justifyContent,
			}}
		>
			{children}
		</div>
	);
};
