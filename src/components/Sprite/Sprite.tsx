import { baseSize } from '../../constants/gameData';
import { useRotate } from '../../hooks/useRotate';
import { useDrawCharacter } from '../../modules/Overworld/hooks/useDrawCharacter';

export const Sprite = ({
	id,
	onClick,
}: {
	id: string;
	onClick: () => void;
}) => {
	const orientation = useRotate();
	useDrawCharacter(
		id,
		{
			x: 0,
			y: 0,
			forwardFoot: 'CENTER1',
			orientation,
			mapId: 'testMap',
		},
		id
	);

	return (
		<canvas
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					onClick();
				}
			}}
			width={baseSize}
			height={baseSize}
			onClick={onClick}
			id={id}
		></canvas>
	);
};
