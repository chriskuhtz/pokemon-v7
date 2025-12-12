import { PokemonName } from '../constants/pokemonNames';
import { InternalDexEntry } from './Pokedex';
import { RoutesType } from './Routing';
import { CharacterLocationData, SaveFile } from './SaveFile';

export type InternalDex = Record<PokemonName, InternalDexEntry>;
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
}
