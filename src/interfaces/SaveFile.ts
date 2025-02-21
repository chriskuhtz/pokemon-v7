import { QuestName } from '../constants/checkLists/questsRecord';
import { BadgeName } from './Badge';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';
import { QuestStatus } from './Quest';
import { RoutesType } from './Routing';

export type CharacterOrientation = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type ForwardFoot = 'CENTER1' | 'RIGHT' | 'CENTER2' | 'LEFT';
export type MapId = 'meadow';

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

export interface SettingsObject {
	randomStarters: boolean;
	disqualifyFaintedPokemon: boolean;
}

export interface Challenger {
	id: number;
	team: OwnedPokemon[];
}

export interface SaveFile {
	badges: BadgeName[];
	playerId: string;
	inventory: Inventory;
	pokemon: OwnedPokemon[];
	money: number;
	meta: {
		activeTab: RoutesType;
		currentChallenger?: Challenger;
	};
	location: CharacterLocationData;

	handledOccupants: {
		id: number;
		//at this point in time (in ms), this occupant will be removed from the handled list
		resetAt: number;
	}[];

	lastEdited: number;
	lastNurse: number;
	settings?: SettingsObject;
	quests: Record<QuestName, QuestStatus>;
	sprite: string;
}
