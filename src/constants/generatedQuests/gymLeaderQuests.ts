import { v4 } from 'uuid';
import { expCandyPackage, smallExpCandyPackage } from '../../interfaces/Item';
import { Quest } from '../../interfaces/Quest';
import { SaveFile } from '../../interfaces/SaveFile';
import { generateRandomStatObject } from '../../interfaces/StatObject';
import { testPokemon } from '../gameData';
import { blaineId } from '../maps/occupants/blaine';
import { brockId } from '../maps/occupants/brock';
import { erikaId } from '../maps/occupants/erika';
import { garyId } from '../maps/occupants/gary';
import { janineId } from '../maps/occupants/janine';
import { mistyId } from '../maps/occupants/misty';
import { sabrinaId } from '../maps/occupants/sabrina';
import { surgeId } from '../maps/occupants/surge';
import { QuestName } from '../questsRecord';

export const gymLeaderQuests: Partial<Record<QuestName, Quest>> = {
	'defeat erika': {
		category: 'GYM LEADER',
		kind: 'BULLETIN',
		badge: 'Rainbow_Badge',
		researchPoints: 25,
		rewardItems: {
			'rindo-berry': 5,
			'miracle-seed': 1,
			'big-root': 1,
			...smallExpCandyPackage,
		},
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === erikaId);
		},
	},
	'defeat janine': {
		category: 'GYM LEADER',
		kind: 'BULLETIN',
		researchPoints: 25,
		badge: 'Marsh_Badge',
		rewardItems: {
			'kebia-berry': 5,
			'black-sludge': 1,
			...smallExpCandyPackage,
		},
		requiredUpgrade: 'machete certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === janineId);
		},
	},
	'defeat blaine': {
		category: 'GYM LEADER',
		kind: 'BULLETIN',
		badge: 'Volcano_Badge',
		researchPoints: 25,
		rewardItems: { 'occa-berry': 5, charcoal: 1, ...expCandyPackage },
		requiredUpgrade: 'sledge hammer certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === blaineId);
		},
	},
	'defeat surge': {
		category: 'GYM LEADER',
		kind: 'BULLETIN',
		badge: 'Thunder_Badge',
		researchPoints: 50,
		rewardItems: { 'wacan-berry': 5, magnet: 1, ...expCandyPackage },
		requiredUpgrade: 'shovel certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === surgeId);
		},
	},
	'defeat misty': {
		category: 'GYM LEADER',
		kind: 'BULLETIN',
		badge: 'Cascade_Badge',
		researchPoints: 50,
		rewardItems: {
			'passho-berry': 5,
			'mystic-water': 1,
			sprayduck: 1,
			...expCandyPackage,
		},
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === mistyId);
		},
	},
	'defeat sabrina': {
		category: 'GYM LEADER',
		kind: 'BULLETIN',
		badge: 'Soul_Badge',
		researchPoints: 50,
		rewardItems: { 'payapa-berry': 5, 'twisted-spoon': 1, ...expCandyPackage },
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === sabrinaId);
		},
	},
	'defeat brock': {
		category: 'GYM LEADER',
		kind: 'BULLETIN',
		researchPoints: 50,
		badge: 'Boulder_Badge',
		rewardItems: { 'charti-berry': 5, 'hard-stone': 1, ...expCandyPackage },
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === brockId);
		},
	},
	'defeat gary': {
		category: 'GYM LEADER',
		kind: 'BULLETIN',
		researchPoints: 100,
		badge: 'Earth_Badge',
		rewardItems: {
			electirizer: 1,
			magmarizer: 1,
			protector: 1,
			...expCandyPackage,
		},
		requiredUpgrade: 'swimming certification',
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === garyId);
		},
	},
	'defeat morty': {
		category: 'GYM LEADER',
		rewardItems: {
			'ultra-ball': 5,
			'full-restore': 5,
			'spell-tag': 1,
			...expCandyPackage,
		},
		rewardPokemon: {
			...testPokemon,
			id: v4(),
			name: 'dreepy',
			shiny: true,
			caughtAtDate: new Date().getTime(),
			xp: 125,
			intrinsicValues: generateRandomStatObject(31, 25),
			caughtOnMap: 'camp',
		},
		badge: 'Fog_Badge',
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Morty');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'catch Haunter and Mightyena',
	},
	'defeat bugsy': {
		category: 'GYM LEADER',
		badge: 'Hive_Badge',
		rewardItems: {
			'ultra-ball': 5,
			'full-restore': 5,
			'silver-powder': 1,
			...expCandyPackage,
		},
		rewardPokemon: {
			...testPokemon,
			id: v4(),
			name: 'larvesta',
			shiny: true,
			caughtAtDate: new Date().getTime(),
			xp: 125,
			intrinsicValues: generateRandomStatObject(31, 25),
			caughtOnMap: 'camp',
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Bugsy');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'report a bug',
	},
	'defeat whitney': {
		category: 'GYM LEADER',
		rewardItems: {
			'ultra-ball': 5,
			'full-restore': 5,
			'silk-scarf': 1,
			...expCandyPackage,
		},
		badge: 'Plain_Badge',
		rewardPokemon: {
			...testPokemon,
			id: v4(),
			name: 'buneary',
			shiny: true,
			caughtAtDate: new Date().getTime(),
			xp: 125,
			intrinsicValues: generateRandomStatObject(31, 25),
			caughtOnMap: 'camp',
		},
		researchPoints: 50,
		conditionFunction: (s: SaveFile) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Whitney');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: "catch whitney's favorite cute pokemon",
	},
	'defeat jasmine': {
		category: 'GYM LEADER',
		rewardItems: {
			'ultra-ball': 5,
			'full-restore': 5,
			'metal-coat': 1,
			...expCandyPackage,
		},
		badge: 'Mineral_Badge',
		rewardPokemon: {
			...testPokemon,
			id: v4(),
			name: 'scyther',
			shiny: true,
			caughtAtDate: new Date().getTime(),
			xp: 125,
			intrinsicValues: generateRandomStatObject(31, 25),
			caughtOnMap: 'camp',
		},
		researchPoints: 50,
		conditionFunction: (s: SaveFile) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Jasmine');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'catch an exceptional steel pokemon for jasmine',
	},
	'defeat clair': {
		category: 'GYM LEADER',
		rewardItems: {
			'ultra-ball': 5,
			'full-restore': 5,
			'dragon-scale': 1,
			...expCandyPackage,
		},
		badge: 'Rising_Badge',
		rewardPokemon: {
			...testPokemon,
			id: v4(),
			name: 'horsea',
			shiny: true,
			caughtAtDate: new Date().getTime(),
			xp: 125,
			intrinsicValues: generateRandomStatObject(31, 25),
			caughtOnMap: 'camp',
		},
		researchPoints: 50,
		conditionFunction: (s: SaveFile) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Clair');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'reach max. friendship with a dragon pokemon',
	},
	'defeat pryce': {
		category: 'GYM LEADER',
		rewardItems: {
			'ultra-ball': 5,
			'full-restore': 5,
			'never-melt-ice': 1,
			...expCandyPackage,
		},
		badge: 'Glacier_Badge',
		rewardPokemon: {
			...testPokemon,
			id: v4(),
			name: 'swinub',
			shiny: true,
			caughtAtDate: new Date().getTime(),
			xp: 125,
			intrinsicValues: generateRandomStatObject(31, 25),
			caughtOnMap: 'camp',
		},
		researchPoints: 50,
		conditionFunction: (s: SaveFile) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Pryce');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'maximize the effort values of an ice pokemon',
	},
	'defeat chuck': {
		category: 'GYM LEADER',
		rewardItems: {
			'full-restore': 5,
			'black-belt': 1,
			...expCandyPackage,
		},
		badge: 'Storm_Badge',
		rewardPokemon: {
			...testPokemon,
			id: v4(),
			name: 'hawlucha',
			shiny: true,
			caughtAtDate: new Date().getTime(),
			xp: 125,
			intrinsicValues: generateRandomStatObject(31, 25),
			caughtOnMap: 'camp',
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Chuck');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'deal 10000 damage with one attack',
	},
	'defeat falkner': {
		category: 'GYM LEADER',
		rewardItems: {
			'ultra-ball': 5,
			'full-restore': 5,
			'sharp-beak': 1,
			...expCandyPackage,
		},
		badge: 'Zephyr_Badge',
		rewardPokemon: {
			...testPokemon,
			id: v4(),
			name: 'rufflet',
			shiny: true,
			caughtAtDate: new Date().getTime(),
			xp: 125,
			intrinsicValues: generateRandomStatObject(31, 25),
			caughtOnMap: 'camp',
		},
		researchPoints: 50,
		conditionFunction: (s) => {
			return s.handledOccupants.some((h) => h.id === 'Gym Leader Falkner');
		},
		kind: 'BULLETIN',
		requiredUpgrade: 'training field 1',
		availableAfter: 'catch the legendary bird of ice',
	},
};
