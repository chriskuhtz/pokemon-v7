import { FaHeart } from 'react-icons/fa';
import { battleSpriteSize } from '../../constants/gameData/gameData';

export const HappinessIcon = ({ value }: { value: number }) => {
	return (
		<div style={{ position: 'relative' }}>
			<FaHeart
				style={{ zIndex: 0, position: 'absolute' }}
				size={battleSpriteSize}
				color="red"
			/>
			<div
				style={{
					zIndex: 0,
					position: 'absolute',
					maxHeight: (1 - value / 255) * battleSpriteSize,
					overflow: 'hidden',
				}}
			>
				<FaHeart size={battleSpriteSize} color="gray" />
			</div>
		</div>
	);
};
