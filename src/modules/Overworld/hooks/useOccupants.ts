import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MapId, mapsRecord } from '../../../constants/gameData/maps/mapsRecord';
import { PokemonName } from '../../../constants/pokemonNames';
import { getMiddleOfThree } from '../../../functions/getMiddleOfThree';
import { getRandomOrientation } from '../../../functions/getNextClockwiseDirection';
import { hasType } from '../../../functions/hasType';
import { occupantHandled } from '../../../functions/occupantHandled';
import {
	getTroubleMakerAdminTeam,
	getTroubleMakerTeam,
} from '../../../functions/troubleMakers/troubleMakers';
import { LocationContext } from '../../../hooks/LocationProvider';
import { GameDataContext } from '../../../hooks/useGameData';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { InternalDex } from '../../../interfaces/GameData';
import { Nature } from '../../../interfaces/Natures';
import { Occupant, OverworldPokemon } from '../../../interfaces/Occupant';
import {
	CharacterOrientation,
	RampagingPokemon,
	SaveFile,
} from '../../../interfaces/SaveFile';
import { SpriteEnum } from '../../../interfaces/SpriteEnum';

export const useOccupants = () => {
	const { saveFile } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);
	const { internalDex } = useContext(GameDataContext);
	const map = useMemo(() => mapsRecord[location.mapId], [location.mapId]);

	const [statefulOccupants, setStatefulOccupants] = useState<Occupant[]>([]);
	const [lastRenderedMap, setLastRenderedMap] = useState<MapId>();

	useEffect(() => {
		if (location.mapId !== lastRenderedMap) {
			setStatefulOccupants([]);
			setLastRenderedMap(location.mapId);
		}
	}, [lastRenderedMap, location.mapId]);
	useEffect(() => {
		const all = [...map.occupants];
		if (saveFile.troubleMakers && saveFile.troubleMakers.route === map.id) {
			all.push(...createTroubleMakers(saveFile));
		}
		if (
			saveFile.currentRampagingPokemon &&
			saveFile.currentRampagingPokemon.route === map.id
		) {
			all.push(createRampager(saveFile.currentRampagingPokemon, internalDex));
		}
		const guest = saveFile.importedChallenger;
		if (guest && guest.mapId === map.id) {
			all.push({
				...guest,
				team: () => guest.team,
				conditionFunction: () => true,
			});
		}
		if (location.mapId === 'camp') {
			all.push(...createPasturePokemon(saveFile, internalDex));
			all.push(...createBattle());
		}

		if (statefulOccupants.length !== all.length) {
			setStatefulOccupants(all);
		}
	}, [
		map,
		saveFile.troubleMakers,
		saveFile.handledOccupants,
		statefulOccupants.length,
		saveFile,
		location.mapId,
		internalDex,
	]);

	const conditionalOccupants = useMemo(() => {
		return statefulOccupants.filter(
			(m) => m.conditionFunction(saveFile) === true
		);
	}, [saveFile, statefulOccupants]);

	const rotateOccupant = useCallback(
		(id: string, newOrientation: CharacterOrientation) =>
			setStatefulOccupants((os) =>
				os.map((o) => {
					if (o.id === id) {
						return { ...o, orientation: newOrientation };
					}
					return o;
				})
			),
		[]
	);

	return { rotateOccupant, occupants: conditionalOccupants };
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle<T>(a: T[]): T[] {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

const createPasturePokemon = (
	saveFile: SaveFile,
	internalDex: InternalDex
): OverworldPokemon[] => {
	const pastureMons = shuffle(
		saveFile.pokemon
			.filter(
				(p) =>
					!p.onTeam && internalDex[p.name].dexId < 741 && !hasType(p, 'water')
			)
			.map((p) => ({ name: p.name, nature: p.nature }))
	);

	const first = pastureMons.at(0);
	const second = pastureMons.at(1);
	const third = pastureMons.at(2);
	const fourth = pastureMons.at(3);

	const waterMons = shuffle(
		saveFile.pokemon
			.filter(
				(p) =>
					!p.onTeam && internalDex[p.name].dexId < 741 && hasType(p, 'water')
			)
			.map((p) => ({ name: p.name, nature: p.nature }))
	);

	const firstWater = waterMons.at(0);
	const secondWater = waterMons.at(1);
	const thirdWater = waterMons.at(2);

	const res: OverworldPokemon[] = [];

	if (first) {
		res.push({
			type: 'POKEMON',
			dexId: internalDex[first.name].dexId,
			x: 15,
			y: 9,
			orientation: getRandomOrientation(),
			id: 'overworldmon 1',
			dialogue: [getNatureBasedMessage(first)],
			conditionFunction: () => true,
		});
	}
	if (second) {
		res.push({
			type: 'POKEMON',
			dexId: internalDex[second.name].dexId,
			x: 17,
			y: 10,
			orientation: getRandomOrientation(),
			id: 'overworldmon 2',
			dialogue: [getNatureBasedMessage(second)],
			conditionFunction: () => true,
		});
	}
	if (third) {
		res.push({
			type: 'POKEMON',
			dexId: internalDex[third.name].dexId,
			x: 17,
			y: 8,
			orientation: getRandomOrientation(),
			id: 'overworldmon 3',
			dialogue: [getNatureBasedMessage(third)],
			conditionFunction: () => true,
		});
	}
	if (fourth) {
		res.push({
			type: 'POKEMON',
			dexId: internalDex[fourth.name].dexId,
			x: 13,
			y: 11,
			orientation: getRandomOrientation(),
			id: 'overworldmon 4',
			dialogue: [getNatureBasedMessage(fourth)],
			conditionFunction: () => true,
		});
	}

	if (firstWater) {
		res.push({
			type: 'POKEMON',
			dexId: internalDex[firstWater.name].dexId,
			x: 12,
			y: 35,
			orientation: getRandomOrientation(),
			id: 'overwatermon 1',
			dialogue: [getNatureBasedMessage(firstWater)],
			conditionFunction: () => true,
		});
	}
	if (secondWater) {
		res.push({
			type: 'POKEMON',
			dexId: internalDex[secondWater.name].dexId,
			x: 13,
			y: 37,
			orientation: getRandomOrientation(),
			id: 'overwatermon 2',
			dialogue: [getNatureBasedMessage(secondWater)],
			conditionFunction: () => true,
		});
	}
	if (thirdWater) {
		res.push({
			type: 'POKEMON',
			dexId: internalDex[thirdWater.name].dexId,
			x: 18,
			y: 36,
			orientation: getRandomOrientation(),
			id: 'overwatermon 3',
			dialogue: [getNatureBasedMessage(thirdWater)],
			conditionFunction: () => true,
		});
	}

	return res;
};

const getNatureBasedMessage = ({
	name,
	nature,
}: {
	name: PokemonName;
	nature: Nature;
}) => {
	switch (nature) {
		case 'adamant':
			return `${name} seems focused`;
		case 'bashful':
			return `${name} is trying to challenge the other pokemon`;
		case 'bold':
			return `${name} is exploring its environment`;
		case 'brave':
			return `${name} is bravely exploring`;
		case 'calm':
			return `${name} seems very calm`;
		case 'careful':
			return `${name} is carefully inspecting the other pokemon`;
		case 'docile':
			return `${name} is at ease`;
		case 'gentle':
			return `${name} wants to befriend the other pokemon`;
		case 'hardy':
			return `${name} keeps to itself`;
		case 'hasty':
			return `${name} is zooming around`;
		case 'impish':
			return `${name} is being silly`;
		case 'jolly':
			return `${name} spreads joy`;
		case 'lax':
			return `${name} doesnt pay attention`;
		case 'lonely':
			return `${name} ignores the other pokemon`;
		case 'mild':
			return `${name} just wants to have fun`;
		case 'modest':
			return `${name} is chilling`;
		case 'naive':
			return `${name} is unsure what to do`;
		case 'naughty':
			return `${name} is provoking the others a little`;
		case 'quiet':
			return `${name} is napping`;
		case 'quirky':
			return `${name} is being goofy`;
		case 'rash':
			return `${name} races around the pasture`;
		case 'relaxed':
			return `${name} is chilling`;
		case 'sassy':
			return `${name} is not impressed`;
		case 'serious':
			return `${name} puts on a serious face`;
		case 'timid':
			return `${name} seems a little afraid of the others`;
	}
};

const createRampager = (
	currentRampagingPokemon: RampagingPokemon,
	internalDex: InternalDex
): OverworldPokemon => {
	const { x, y, id, name } = currentRampagingPokemon;
	const xp = getMiddleOfThree([70 * 70 * 70, Math.random() * 1000000, 1000000]);
	return {
		type: 'POKEMON',
		x,
		y,
		orientation: getRandomOrientation(),
		dexId: internalDex[name].dexId,
		encounter: {
			name: name,
			maxXp: xp,
			minXp: xp,
			rarity: 'common',
		},
		dialogue: [`The rampaging ${name} attacks`],
		conditionFunction: (s) => !occupantHandled(s, id),

		id,
	};
};

const createTroubleMakers = (saveFile: SaveFile): Occupant[] => {
	if (!saveFile.troubleMakers) {
		return [];
	}
	return [
		...saveFile.troubleMakers.trainers.map((t) => {
			if (
				[
					'Rocket Admin Chad',
					'Rocket Admin Hillary',
					'Aqua Boss Archie',
					'Magma Boss Maxie',
					'Galactic Admin Mars',
					'Galactic Admin Saturn',
					'Galactic Admin Jupiter',
				].includes(t.id)
			) {
				return {
					...t,
					team: () => getTroubleMakerAdminTeam(saveFile, t.id),
					conditionFunction: () =>
						!saveFile.handledOccupants.some((h) => h.id === t.id),
				};
			}

			return {
				...t,
				team: () => getTroubleMakerTeam(saveFile),
				conditionFunction: () =>
					!saveFile.handledOccupants.some((h) => h.id === t.id),
			};
		}),
	];
};

const createBattle = (): Occupant[] => {
	const res: Occupant[] = [
		{
			type: 'NPC',
			unhandledMessage: ['go nidorino'],
			orientation: 'DOWN',
			x: 33,
			y: 22,
			sprite: SpriteEnum.ace2Male,
			id: 'battler1',
			conditionFunction: () => true,
		},
		{
			type: 'POKEMON',
			dexId: 33,
			dialogue: ['nido nido'],
			orientation: 'DOWN',
			x: 33,
			y: 24,
			id: 'pokemon1',
			conditionFunction: () => true,
		},
		{
			type: 'POKEMON',
			dexId: 94,
			dialogue: ['gengaaar'],
			orientation: 'UP',
			x: 33,
			y: 26,
			id: 'pokemon2',
			conditionFunction: () => true,
		},

		{
			type: 'NPC',
			unhandledMessage: ['slurp him, gengar'],
			orientation: 'UP',
			x: 33,
			y: 28,
			sprite: SpriteEnum.ace2Female,
			id: 'battler2',
			conditionFunction: () => true,
		},
	];

	return res;
};
