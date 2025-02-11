import { CSSProperties, ReactNode } from 'react';

export const Stack = ({
	children,
	gap,
	mode,
	justifyContent,
	alignItems,
}: {
	children: ReactNode[];
	gap?: number;
	mode: 'row' | 'column';
	justifyContent?: CSSProperties['justifyContent'];
	alignItems?: CSSProperties['alignItems'];
}): JSX.Element => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: mode,
				flexWrap: 'wrap',
				gap: `${gap ?? 0.5}rem`,
				justifyContent,
				alignItems,
			}}
		>
			{children}
		</div>
	);
};
