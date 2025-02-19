import { Occupant, OverworldMap } from '../interfaces/OverworldMap';

export const assembleMap = (
	map: OverworldMap,
	collectedItems: number[],
	cutBushes: number[],
	statefulOccupantsRecord: Record<number, Occupant>
): OverworldMap => {
	const filteredOccupants = [...map.occupants].filter(
		(o) =>
			!collectedItems.some((c) => c === o) && !cutBushes.some((c) => c === o)
	);

	const updatedTileMap = map.tileMap.map((row, rowIndex) => {
		return row.map((c, columnIndex) =>
			filteredOccupants.some((occupantId) => {
				const o = statefulOccupantsRecord[occupantId];

				return (
					o &&
					o.x === columnIndex &&
					o.y === rowIndex &&
					o.type !== 'HIDDEN_ITEM'
				);
			})
				? 2 //make the field impassable if there is an occupant, except hidden item
				: c
		);
	});

	return { ...map, tileMap: updatedTileMap, occupants: filteredOccupants };
};
