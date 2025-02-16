import React from 'react';
import { baseSize } from '../../../constants/gameData';

const unmemoedClickerGrid = ({
	width,
	height,
	onClick,
}: {
	width: number;
	height: number;
	onClick: (update: { y: number; x: number }) => void;
}) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: Array.from({ length: width })
					.map(() => '1fr')
					.join(' '),
			}}
		>
			{Array.from({ length: height }).map((_, h) => {
				return Array.from({ length: width }).map((_, w) => (
					<div
						key={h + '+' + w}
						onClick={() => onClick({ y: h, x: w })}
						style={{
							width: baseSize,
							height: baseSize,
						}}
					></div>
				));
			})}
		</div>
	);
};

export const ClickerGrid = React.memo(unmemoedClickerGrid);
