import { OccupantName } from '../constants/checkLists/occupantsRecord';
import { Occupant, OverworldMap } from '../interfaces/OverworldMap';

export const assembleMap = (
	map: OverworldMap,
	statefulOccupantsRecord: Partial<Record<OccupantName, Occupant>>
): OverworldMap => {
	const occupantKeys = Object.keys(statefulOccupantsRecord) as OccupantName[];

	const updatedTileMap = map.tileMap.map((row, rowIndex) => {
		return row.map((c, columnIndex) =>
			occupantKeys.some((occupantId) => {
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

	return {
		...map,
		tileMap: updatedTileMap,
		occupants: occupantKeys,
	};
};
