import { itemsRecord } from '../constants/itemsRecord';
import { OverworldMap } from '../interfaces/OverworldMap';

export const assembleMap = (
	map: OverworldMap,
	collectedItems: number[]
): OverworldMap => {
	const filteredOccupants = [...map.occupants].filter(
		(o) => !collectedItems.some((c) => c === o)
	);

	const updatedTileMap = map.tileMap.map((row, rowIndex) => {
		return row.map((c, columnIndex) =>
			filteredOccupants.some((occupantId) => {
				const o = itemsRecord[occupantId];

				return o.x === columnIndex && o.y === rowIndex;
			})
				? 1
				: c
		);
	});

	return { ...map, tileMap: updatedTileMap, occupants: filteredOccupants };
};
