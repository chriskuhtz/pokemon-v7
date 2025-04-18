import { JSX } from 'react';
import { useDrawBackground } from '../../hooks/useDrawBackground';
import { GameMap } from '../../interfaces/OverworldMap';
export const CombinedCanvas = ({
	map,
	tileSetUrl,
	tileSize,
}: {
	map: GameMap;
	tileSetUrl: string;
	tileSize: number;
}): JSX.Element => {
	useDrawBackground('assembled', map, tileSetUrl, tileSize);

	return (
		<canvas
			id="assembled"
			height={map.baseLayer.length * tileSize}
			width={map.baseLayer[0].length * tileSize}
		></canvas>
	);
};
