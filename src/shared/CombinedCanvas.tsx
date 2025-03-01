import { JSX } from 'react';
import { GameMap } from './interfaces';
import { useDrawBackground } from './useDrawBackground';
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
			style={{ border: '1px solid red' }}
			height={map.baseLayer.length * tileSize * 4}
			width={map.baseLayer[0].length * tileSize * 4}
		></canvas>
	);
};
