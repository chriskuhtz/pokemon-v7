import { useContext } from 'react';
import { BaseSizeContext } from '../../hooks/useBaseSize';
import { useRotate } from '../../hooks/useRotate';
import { useDrawCharacter } from '../../modules/Overworld/hooks/useDrawCharacter';

export const Sprite = ({
	id,
	onClick,
	rotating,
	canvasKey,
}: {
	id: string;
	onClick?: () => void;
	rotating: boolean;
	canvasKey: string;
}) => {
	const { baseSize } = useContext(BaseSizeContext);
	const orientation = useRotate();
	useDrawCharacter(
		canvasKey,
		{
			x: 0,
			y: 0,
			forwardFoot: 'CENTER1',
			orientation: rotating ? orientation : 'DOWN',
			mapId: 'camp',
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
			height={baseSize * 1.5}
			style={{ marginTop: -baseSize * 0.5 }}
			onClick={onClick}
			id={canvasKey}
		></canvas>
	);
};
