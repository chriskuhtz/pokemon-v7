import { MapId } from '../constants/gameData/maps/mapsRecord';
import { ItemType } from '../interfaces/Item';
import { OverworldItem } from '../interfaces/Occupant';
import { occupantHandled } from './occupantHandled';

export const makeOverworldItem = ({
	x,
	y,
	item,
	amount,
	mapId,
}: {
	x: number;
	y: number;
	item: ItemType;
	amount: number;
	mapId: MapId;
}): OverworldItem => {
	const id = item + x + amount + y + mapId;
	return {
		id: id,
		type: 'ITEM',
		x,
		y,
		conditionFunction: (s) => !occupantHandled(s, id),
		item,
		amount,
	};
};
