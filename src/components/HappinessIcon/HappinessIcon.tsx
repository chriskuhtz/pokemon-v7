import { FaHeart } from 'react-icons/fa';
import { baseSize } from '../../constants/gameData';

export const HappinessIcon = ({ value }: { value: number }) => {
	return (
		<div style={{ position: 'relative' }}>
			<FaHeart
				style={{ zIndex: 0, position: 'absolute' }}
				size={baseSize / 2}
				color="red"
			/>
			<div
				style={{
					zIndex: 0,
					position: 'absolute',
					maxHeight: (1 - value / 255) * (baseSize / 2),
					overflow: 'hidden',
				}}
			>
				<FaHeart size={baseSize / 2} color="gray" />
			</div>
		</div>
	);
};
