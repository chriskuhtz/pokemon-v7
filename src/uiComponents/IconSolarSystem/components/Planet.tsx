import { battleSpriteSize } from '../../../constants/gameData/gameData';

export const Planet = ({
	top,
	left,
	right,
	src,
}: {
	top: string;
	left?: string;
	right?: string;
	src: string;
}) => {
	return (
		<img
			style={{
				position: 'absolute',
				top,
				left,
				right,
			}}
			height={battleSpriteSize}
			width={battleSpriteSize}
			src={src}
		/>
	);
};
