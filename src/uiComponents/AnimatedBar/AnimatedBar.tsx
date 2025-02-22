import { useState, useEffect } from 'react';
import { percentageBasedColor } from '../../constants/typeColors';

export const AnimatedBar = ({
	max,
	offset,
	color,
	textColor,
}: {
	max: number;
	offset: number;
	color?: string;
	textColor?: string;
}) => {
	const [current, setCurrent] = useState<number>(max - offset);

	useEffect(() => {
		const t = setTimeout(() => {
			const actual = Math.max(max - offset, 0);

			if (current < actual) {
				if (actual - current > 50) {
					setCurrent(current + 37);
					return;
				}
				if (actual - current > 20) {
					setCurrent(current + 13);
					return;
				}
				if (actual - current > 10) {
					setCurrent(current + 7);
					return;
				}
				if (actual - current > 5) {
					setCurrent(current + 3);
					return;
				}
				setCurrent(current + 1);
			}
			if (current > actual) {
				if (current - actual > 50) {
					setCurrent(current - 37);
					return;
				}
				if (current - actual > 20) {
					setCurrent(current - 13);
					return;
				}
				if (current - actual > 10) {
					setCurrent(current - 7);
					return;
				}
				if (current - actual > 5) {
					setCurrent(current - 3);
					return;
				}
				setCurrent(current - 1);
			}
		}, 100);

		return () => clearTimeout(t);
	}, [current, max, offset]);

	const percentage = current / max;

	return (
		<div
			style={{
				zIndex: 0,
				margin: '1rem 0',
				position: 'relative',
				width: '100%',
				height: '1rem',
				border: '1px solid black',
				borderRadius: 9000,
			}}
		>
			<div
				style={{
					zIndex: 2,
					width: '100%',
					textAlign: 'center',
					position: 'absolute',
					height: '1rem',
					color: textColor,
				}}
			>
				{current}/{max}
			</div>
			<div
				style={{
					backgroundColor: color ?? percentageBasedColor(percentage).color,
					zIndex: 1,
					position: 'absolute',
					height: '1rem',
					width: `calc(100% * ${percentage})`,
					borderRadius: 9000,
				}}
			></div>
		</div>
	);
};
