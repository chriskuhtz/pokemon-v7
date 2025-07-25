import { CampUpgrade } from '../constants/gameData/campUpgrades';
import { MapId } from '../constants/gameData/maps/mapsRecord';
import { QuestName } from '../constants/gameData/questsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { BadgeName } from './Badge';
import { Challenger } from './Challenger';
import { Inventory } from './Inventory';
import { ApricornType, BerryType, HerbType, ItemType, MulchType } from './Item';
import { OverworldTrainer } from './OverworldMap';
import { OwnedPokemon } from './OwnedPokemon';
import { SwarmType } from './Pokedex';
import { PokemonType } from './PokemonType';
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
	fasterDays?: boolean;
	doubleXpRates?: boolean;
	rogueLike?: boolean;
	noItemsInBattle?: boolean;
	releaseFaintedPokemon?: boolean;
	expShareActive?: boolean;
	randomStarters?: boolean;
	randomOverworldItems?: boolean;
	randomQuestRewards?: boolean;
	randomSwarms?: boolean;
	randomAbilities?: boolean;
	randomHeldItems?: boolean;
	randomLearnSets?: boolean;
	hideMovementButtons?: boolean;
	smarterOpponents?: boolean;
	minimalGrindingMode?: boolean;
	unlimitedPathfindingRange?: boolean;
	seekOutEncounters?: boolean;
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
	type: BerryType | ApricornType | HerbType;
	mulch?: MulchType;
	id: string;
}

export interface PokemonSwarm {
	pokemon: PokemonName;
	leavesAt: number;
	route: MapId;
	xpMin: number;
	xpMax: number;
	type: SwarmType;
}

export type Pokedex = Record<
	PokemonName,
	{ seenOnRoutes: MapId[]; caughtOnRoutes: MapId[] }
>;

export type CatchBoosts = Record<PokemonType, number>;

export type CatchStreak = {
	pokemon: PokemonName;
	streak: number;
	mapId: MapId;
};
export const evilTeams = ['rocket', 'aqua', 'magma', 'galactic'] as const;
export type EvilTeam = (typeof evilTeams)[number];
export type OverworldTrainerStump = Omit<
	OverworldTrainer,
	'team' | 'conditionFunction'
>;

export type MileStonesObject = {
	damageRecord: number;
	challengeFieldRecord?: number;
	randomFieldRecord?: number;
	hasEvolvedAPokemonThroughLevelUp?: boolean;
	hasEvolvedAPokemonWithAStone?: boolean;
	hasEvolvedAPokemonWithAHeldItem?: boolean;
	hasEvolvedAPokemonThroughFriendship?: boolean;
	hasEvolvedAPokemonThatNeedsDaytime?: boolean;
	hasEvolvedAPokemonThatNeedsNighttime?: boolean;
	hasCaughtAPokemonWithHoney?: boolean;
	hasfoundAPokemonBySmashingRocks?: boolean;
	hasCraftedApricorn?: boolean;
	hasGrownABerry?: boolean;
	hasGrownAHerb?: boolean;
	hasGrownAnApricorn?: boolean;
	cookedEasyRecipe?: boolean;
	cookedMediumRecipe?: boolean;
	cookedTrickyRecipe?: boolean;
	hasWokenASnorlax?: boolean;
	caughtFromSwarms: PokemonName[];
	luredWithBerries: PokemonName[];
	hasEvolvedStarter?: boolean;
	hasReportedBug?: boolean;
	barryDefeatedAt?: number;
	silverDefeatedAt?: number;
	cynthiaDefeatedAt?: number;
	nDefeatedAt?: number;
	redDefeatedAt?: number;
	hughDefeatedAt?: number;
	lanceDefeatedAt?: number;
	importedChallengerDefeatedAt?: number;
};

export type ImportedChallenger = Omit<
	OverworldTrainer,
	'team' | 'conditionFunction'
> & {
	mapId: MapId;
	team: OwnedPokemon[];
};

export type RampagingPokemon = {
	route: MapId;
	name: PokemonName;
	id: string;
	x: number;
	y: number;
};

export type TroubleMakers = {
	route: MapId;
	trainers: OverworldTrainerStump[];
	affiliation: EvilTeam;
	leavesAt?: number;
};
export interface SaveFile {
	badges: BadgeName[];
	playerId: string;
	bag: Inventory;
	storage: Inventory;
	pokemon: OwnedPokemon[];
	money: number;
	researchPoints: number;
	meta: {
		activeTab: RoutesType;
		currentChallenger?: Challenger;
	};
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
	mileStones: MileStonesObject;
	farm: {
		plants: BerryBush[];
	};
	campUpgrades: Record<CampUpgrade, boolean>;
	honeyReadyAt?: number;
	dugtrioReadyAt?: number;
	zigzagoonReadyAt?: number;
	miltankReadyAt?: number;
	currentSwarm?: PokemonSwarm;
	currentStrongSwarm?: PokemonSwarm;
	currentDistortionSwarm?: PokemonSwarm;
	currentRampagingPokemon?: RampagingPokemon;
	rangerLevel?: number;
	troubleMakers?: TroubleMakers;
	seedVault: ItemType[];
	pokedex: Pokedex;
	cookingSkill?: number;
	activatedRepel?: 'repel' | 'super-repel' | 'max-repel';
	activatedLure?: 'lure' | 'super-lure' | 'max-lure';
	catchBoosts?: CatchBoosts;
	catchStreak?: CatchStreak;
	longestStreak?: number;
	flying?: boolean;
	importedChallenger?: ImportedChallenger;
}
