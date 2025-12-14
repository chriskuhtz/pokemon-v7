import { MapId } from '../constants/gameData/maps/mapsRecord';
import { ItemType } from '../interfaces/Item';
import { OverworldChest, OverworldItem } from '../interfaces/Occupant';
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

export const makeOverworldChest = ({
	x,
	y,
	contents,
	mapId,
}: {
	x: number;
	y: number;
	contents: ItemType[];
	mapId: MapId;
}): OverworldChest => {
	const id = contents.join() + x + y + mapId;
	return {
		id: id,
		type: 'CHEST',
		x,
		y,
		conditionFunction: (s) => !occupantHandled(s, id),
		contents,
	};
};
