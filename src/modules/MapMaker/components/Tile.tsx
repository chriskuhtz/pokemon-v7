import { TileIdentifier } from '../../../interfaces/OverworldMap';

export const Tile = ({
	tile,
	onClick,
	tileSetUrl,
	scale = 1,
}: {
	tile: TileIdentifier;
	onClick: () => void;
	tileSetUrl: string;
	scale?: number;
}) => {
	return (
		<div
			onClick={onClick}
			style={{
				transform: `scale(${scale})`,
				height: 16,
				width: 16,
				background: `url(${tileSetUrl}) ${tile.xOffset}px ${tile.yOffset}px`,
			}}
		/>
	);
};
