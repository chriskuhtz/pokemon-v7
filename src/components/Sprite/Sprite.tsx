import { baseSize } from '../../constants/gameData';
import { useRotate } from '../../hooks/useRotate';
import { useDrawCharacter } from '../../modules/Overworld/hooks/useDrawCharacter';

export const Sprite = ({
	id,
	onClick,
	rotating,
}: {
	id: string;
	onClick?: () => void;
	rotating: boolean;
}) => {
	const orientation = useRotate();
	useDrawCharacter(
		id,
		{
			x: 0,
			y: 0,
			forwardFoot: 'CENTER1',
			orientation: rotating ? orientation : 'DOWN',
			mapId: 'meadow',
		},
		`NPC_${id}`
	);

	return (
		<canvas
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (onClick && e.key === 'Enter') {
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
