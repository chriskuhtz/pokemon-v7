import { PokemonName } from '../constants/pokemonNames';
import { InternalDexEntry } from './Pokedex';
import { RoutesType } from './Routing';
import { CharacterLocationData, SaveFile } from './SaveFile';

export type InternalDex = Record<PokemonName, InternalDexEntry>;

export interface OverworldAction {
	possible: (saveFile: SaveFile) => boolean;
	successDialogue: string[];
	failDialogue: string[];
}
export interface OverworldActions {
	bushCutting: OverworldAction;
}
export interface GameData {
	locationId: string;
	saveFileId: string;
	startingLocation: CharacterLocationData;
	startingTab: RoutesType;
	startingRouterSequence: {
		route: RoutesType;
		condition: (saveFile: SaveFile) => boolean;
	}[];
	startingSaveFile: SaveFile;
	allowedBaseSizes: number[];
	internalDex: InternalDex;
	losingMessages: {
		training: string;
		reset: string;
		wild: string;
	};
	features: {
		catchStreaks: boolean;
		settingsEditable: boolean;
		numberOfBallsBadge: boolean;
	};
	overworldActions: OverworldActions;
	carryingCapacity: {
		base: { amount: number };
		second:
			| { amount: number; condition: (saveFile: SaveFile) => boolean }
			| undefined;
		third:
			| { amount: number; condition: (saveFile: SaveFile) => boolean }
			| undefined;
		fourth:
			| {
					amount: number;
					condition: (saveFile: SaveFile) => boolean;
			  }
			| undefined;
	};
}
