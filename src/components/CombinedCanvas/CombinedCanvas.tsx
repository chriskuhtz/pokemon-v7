import { JSX } from 'react';
import { useDrawBackground } from '../../hooks/useDrawBackground';
import { GameMap } from '../../interfaces/OverworldMap';
export const CombinedCanvas = ({
	map,
	tileSize,
}: {
	map: GameMap;
	tileSize: number;
}): JSX.Element => {
	useDrawBackground('assembled', map, tileSize);

	return (
		<canvas
			id="assembled"
			height={map.baseLayer.length * tileSize}
			width={map.baseLayer[0].length * tileSize}
		></canvas>
	);
};
