import React, { ReactNode, useEffect, useState } from 'react';
import { ArrayHelpers } from '../functions/ArrayHelpers';

export interface ScreenTransition {
	onRemoval: () => void;
}
export const ScreenTransitionContext = React.createContext(
	{} as {
		activateTransition: (x: ScreenTransition) => void;
	}
);

const emptySquares = Array.from({ length: 36 }).map((_, i) =>
	i === 0 ? 1 : 0
);

export const ScreenTransitionProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [squares, setSquares] = useState<number[]>([...emptySquares]);
	const [transition, setTransition] = useState<ScreenTransition>();

	useEffect(() => {
		if (!transition) {
			setSquares(emptySquares);
			return;
		}
		setTimeout(() => {
			const emptySquares = squares.filter((s) => s === 0);
			const indexesOfEmptySquares = squares
				.map((s, i) => {
					return s ? undefined : i;
				})
				.filter((entry) => entry !== undefined);

			const indexOfAnEmptySquare = ArrayHelpers.getRandomEntry(
				indexesOfEmptySquares
			);
			if (transition && emptySquares.length > 0) {
				setSquares(
					squares.map((s, i) => {
						if (i === indexOfAnEmptySquare) {
							return 1;
						}
						return s;
					})
				);
			} else if (transition) {
				transition.onRemoval();
				setTransition(undefined);
			}
		}, 50);
	}, [squares, transition]);

	return (
		<ScreenTransitionContext.Provider
			value={{
				activateTransition: setTransition,
			}}
		>
			{children}
			<div
				style={{
					position: 'absolute',
					pointerEvents: 'none',
					top: 0,
					zIndex: 9000,
					width: '100dvw',
					height: '100dvh',
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
					gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
					alignItems: 'stretch',
					justifyItems: 'stretch',
				}}
			>
				{squares.map((s, i) => (
					<div
						key={i}
						style={{ backgroundColor: s && transition ? 'black' : undefined }}
					></div>
				))}
			</div>
		</ScreenTransitionContext.Provider>
	);
};
