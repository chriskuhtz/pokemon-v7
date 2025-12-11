import { RoutesType } from './Routing';
import { CharacterLocationData, SaveFile } from './SaveFile';

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
}
