import { CSSProperties, ReactNode } from 'react';

export const Stack = ({
	children,
	gap,
	mode,
	justifyContent,
	alignItems,
	overflow,
	flexWrap,
}: {
	children: ReactNode[];
	gap?: number;
	mode: 'row' | 'column';
	justifyContent?: CSSProperties['justifyContent'];
	alignItems?: CSSProperties['alignItems'];
	overflow?: CSSProperties['overflow'];
	flexWrap?: CSSProperties['flexWrap'];
}): JSX.Element => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: mode,
				flexWrap: flexWrap ?? 'wrap',
				gap: `${gap ?? 0.5}rem`,
				maxWidth: '100%',
				justifyContent,
				alignItems,
				overflow,
			}}
		>
			{children}
		</div>
	);
};
