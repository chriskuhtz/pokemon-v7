import { JSX } from 'react';
import { useDrawBackground } from '../../hooks/useDrawBackground';
import { TileMap } from '../../interfaces/OverworldMap';
export const CombinedCanvas = ({
	map,
	tileSetUrl,
	tileSize,
	style,
}: {
	map: TileMap;
	tileSetUrl: string;
	tileSize: number;
	style?: React.CSSProperties;
}): JSX.Element => {
	useDrawBackground('assembled', map, tileSetUrl, tileSize);

	return (
		<canvas
			style={style}
			id="assembled"
			height={map.baseLayer.length * tileSize}
			width={map.baseLayer[0].length * tileSize}
		></canvas>
	);
};
