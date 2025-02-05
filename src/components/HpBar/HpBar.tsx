import { useEffect, useState } from 'react';
import { typeColors } from '../../constants/typeColors';

export const HpBar = ({ max, damage }: { max: number; damage: number }) => {
	const [current, setCurrent] = useState<number>(max - damage);

	useEffect(() => {
		const t = setTimeout(() => {
			const actual = max - damage;
			if (current < actual) {
				setCurrent(current + 1);
			}
			if (current > actual) {
				setCurrent(current - 1);
			}
		}, 100);

		return () => clearTimeout(t);
	}, [current, damage, max]);

	const percentage = current / max;

	return (
		<div
			style={{ zIndex: -1, margin: '1rem 0', position: 'relative', width: 100 }}
		>
			<div
				style={{
					textAlign: 'center',
					backgroundColor: typeColors.grass,
					position: 'absolute',
					height: '1rem',
					width: 100 * percentage,
				}}
			>
				{current}/{max}
			</div>
		</div>
	);
};
