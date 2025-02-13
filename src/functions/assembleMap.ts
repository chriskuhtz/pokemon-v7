import { occupantsRecord } from '../constants/occupantsRecord';
import { OverworldMap } from '../interfaces/OverworldMap';

export const assembleMap = (
	map: OverworldMap,
	collectedItems: number[],
	cutBushes: number[]
): OverworldMap => {
	const filteredOccupants = [...map.occupants].filter(
		(o) =>
			!collectedItems.some((c) => c === o) && !cutBushes.some((c) => c === o)
	);

	const updatedTileMap = map.tileMap.map((row, rowIndex) => {
		return row.map((c, columnIndex) =>
			filteredOccupants.some((occupantId) => {
				const o = occupantsRecord[occupantId];

				return o.x === columnIndex && o.y === rowIndex;
			})
				? 2
				: c
		);
	});

	return { ...map, tileMap: updatedTileMap, occupants: filteredOccupants };
};
