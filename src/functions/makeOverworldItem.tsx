import { MapId } from '../constants/gameData/maps/mapsRecord';
import { ItemType } from '../interfaces/Item';
import { OverworldItem, OverworldRandomItem } from '../interfaces/Occupant';
import { ArrayHelpers } from './ArrayHelpers';
import { occupantHandled } from './occupantHandled';

export const makeOverworldItem = ({
	x,
	y,
	item,
	amount,
	mapId,
	fixedId,
}: {
	x: number;
	y: number;
	item: ItemType;
	amount: number;
	mapId: MapId;
	fixedId?: string;
}): OverworldItem => {
	const id = fixedId ?? item + x + amount + y + mapId;
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

export const makeOverworldRandomItem = ({
	x,
	y,
	options,
	mapId,
}: {
	x: number;
	y: number;
	options: ItemType[];
	mapId: MapId;
}): OverworldRandomItem => {
	const id = options.join() + x + y + mapId;
	return {
		id: id,
		type: 'RANDOM_ITEM',
		x,
		y,
		conditionFunction: (s) => !occupantHandled(s, id),
		options,
		amount: ArrayHelpers.getRandomEntry([1, 2, 3, 4, 5]),
	};
};
