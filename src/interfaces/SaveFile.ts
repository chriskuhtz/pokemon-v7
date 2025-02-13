import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';
import { RoutesType } from './Routing';

export type CharacterOrientation = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type ForwardFoot = 'CENTER1' | 'RIGHT' | 'CENTER2' | 'LEFT';
export type MapId = 'testMap';

export const OrientationKeyMap: Record<string, CharacterOrientation> = {
	ArrowUp: 'UP',
	ArrowLeft: 'LEFT',
	ArrowDown: 'DOWN',
	ArrowRight: 'RIGHT',
	w: 'UP',
	a: 'LEFT',
	s: 'DOWN',
	d: 'RIGHT',
};
export interface CharacterLocationData {
	mapId: MapId;
	orientation: CharacterOrientation;
	forwardFoot: ForwardFoot;
	x: number;
	y: number;
}

export interface SaveFile {
	playerId: string;
	inventory: Inventory;
	pokemon: OwnedPokemon[];
	money: number;
	meta: {
		activeTab: RoutesType;
	};
	location: CharacterLocationData;
	collectedItems: number[];
	cutBushes: number[];
	lastEdited: number;
	lastNurse: number;
	settings?: {
		randomStarters: boolean;
	};
}
