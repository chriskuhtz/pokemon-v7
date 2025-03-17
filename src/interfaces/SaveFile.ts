import { CampUpgrade } from '../constants/checkLists/campUpgrades';
import { QuestName } from '../constants/checkLists/questsRecord';
import { MapId } from '../constants/maps/mapsRecord';
import { BadgeName } from './Badge';
import { Challenger } from './Challenger';
import { Inventory } from './Inventory';
import { ApricornType, BerryType, MulchType } from './Item';
import { OwnedPokemon } from './OwnedPokemon';
import { QuestStatus } from './Quest';
import { RoutesType } from './Routing';

export type CharacterOrientation = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type ForwardFoot = 'CENTER1' | 'RIGHT' | 'CENTER2' | 'LEFT';

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
	//disqualifyFaintedPokemon: boolean;
	//randomHeldItems: boolean;
	rogueLike: boolean;
	randomOverworldItems: boolean;
	randomQuestRewards: boolean;
	fasterDays: boolean;
}

export type BerryBushStatus =
	| 'WITHERED'
	| 'READY'
	| 'SAPLING'
	| 'FLOWERING'
	| 'SPROUT'
	| 'SEED';
export interface BerryBush {
	readyAt: number;
	successful: boolean;
	yield: number;
	type: BerryType | ApricornType;
	mulch?: MulchType;
	id: string;
}

export interface SaveFile {
	badges: BadgeName[];
	playerId: string;
	inventory: Inventory;
	pokemon: OwnedPokemon[];
	money: number;
	researchPoints: number;
	meta: {
		activeTab: RoutesType;
		currentChallenger?: Challenger;
	};
	location: CharacterLocationData;

	handledOccupants: {
		id: string;
		//at this point in time (in ms), this occupant will be removed from the handled list
		resetAt: number;
	}[];

	lastEdited: number;
	lastNurse: string;
	settings?: SettingsObject;
	quests: Record<QuestName, QuestStatus>;
	sprite: string;
	encounterRateModifier?: { factor: number; steps: number };
	mileStones: {
		hasEvolvedAPokemon: boolean;
		hasCaughtAPokemonWithHoney: boolean;
		hasCraftedApricorn: boolean;
		hasGrownABerry: boolean;
	};
	farm: {
		unlockedPlots: number;
		plants: BerryBush[];
	};
	campUpgrades: Record<CampUpgrade, boolean>;
}
