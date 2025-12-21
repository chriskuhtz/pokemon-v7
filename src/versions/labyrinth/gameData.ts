import { GameData } from '../../interfaces/GameData';
import { labyrinthDex } from './labyrinthDex';
import { startingSaveFileLabyrinth } from './saveFile';
import { startingLocationLabyrinth } from './startingLocation';

export const gameData: GameData = {
	saveFileId: 'pokemonLabyrinthSaveFile',
	locationId: 'pokemonLabyrinthLocation',
	startingTab: 'OVERWORLD',
	startingRouterSequence: [],
	allowedBaseSizes: [48],
	internalDex: labyrinthDex,
	features: {
		settingsEditable: false,
		catchStreaks: false,
		numberOfBallsBadge: false,
		quests: false,
		movesEditableInTeamOverview: true,
		movesLearnableInTeamOverview: true,
		snapShotExportAvailable: false,
		pokemonStorageSystem: false,
	},
	losingMessages: {
		training: 'Young Tom was never seen again ...',
		wild: 'Young Tom was never seen again ...',
		reset: 'Young Tom was never seen again ...',
	},
	overworldActions: {
		bushCutting: {
			possible: (saveFile) =>
				saveFile.pokemon.some((p) => p.onTeam && p.name === 'scyther'),
			successDialogue: ['Scyther cuts the tree'],
			failDialogue: ['A strong bug pokemon might be able to cut this'],
		},
		swimming: {
			possible: () => false,
			successDialogue: [],
			failDialogue: [],
		},
		rockClimbing: {
			possible: () => false,
			successDialogue: [],
			failDialogue: [],
		},
	},
	carryingCapacity: {
		base: { amount: 20 },
		second: undefined,
		third: undefined,
		fourth: undefined,
	},
	teamSlots: {
		second: () => true,
		third: () => true,
		fourth: () => true,
		fifth: () => true,
		sixth: () => true,
	},
	defaultBattleSize: 1,
	startingLocation: startingLocationLabyrinth,
	startingSaveFile: startingSaveFileLabyrinth,
};
