import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { internalDex } from '../../../constants/internalDexData';
import { MapId, mapsRecord } from '../../../constants/maps/mapsRecord';
import { getMiddleOfThree } from '../../../functions/getMiddleOfThree';
import { getRandomOrientation } from '../../../functions/getNextClockwiseDirection';
import { occupantHandled } from '../../../functions/occupantHandled';
import {
	getTroubleMakerAdminTeam,
	getTroubleMakerTeam,
} from '../../../functions/troubleMakers/troubleMakers';
import { LocationContext } from '../../../hooks/LocationProvider';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { Occupant } from '../../../interfaces/OverworldMap';
import { CharacterOrientation } from '../../../interfaces/SaveFile';

export const useOccupants = () => {
	const { saveFile } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);
	const map = useMemo(() => mapsRecord[location.mapId], [location.mapId]);

	const [statefulOccupants, setStatefulOccupants] = useState<Occupant[]>([]);
	const [lastRenderedMap, setLastRenderedMap] = useState<MapId>();

	useEffect(() => {
		if (location.mapId !== lastRenderedMap) {
			console.log('reset');
			setStatefulOccupants([]);
			setLastRenderedMap(location.mapId);
		}
	}, [lastRenderedMap, location.mapId]);
	useEffect(() => {
		const all = [...map.occupants];
		if (saveFile.troubleMakers && saveFile.troubleMakers.route === map.id) {
			all.push(
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
				})
			);
		}
		if (
			saveFile.currentRampagingPokemon &&
			saveFile.currentRampagingPokemon.route === map.id
		) {
			const { x, y, id, name } = saveFile.currentRampagingPokemon;
			const xp = getMiddleOfThree([
				70 * 70 * 70,
				Math.random() * 1000000,
				1000000,
			]);
			all.push({
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
			});
		}
		const impo = saveFile.importedChallenger;
		if (impo && impo.mapId === map.id) {
			all.push({
				...impo,
				team: () => impo.team,
				conditionFunction: () => true,
			});
		}

		if (location.mapId === 'camp') {
			const uniqueNames = shuffle(
				saveFile.pokemon
					.filter((p) => !p.onTeam && internalDex[p.name].dexId < 741)
					.map((p) => p.name)
			);

			const first = uniqueNames.at(0);
			const second = uniqueNames.at(1);
			const third = uniqueNames.at(2);
			const fourth = uniqueNames.at(3);

			if (first) {
				all.push({
					type: 'POKEMON',
					dexId: internalDex[first].dexId,
					x: 15,
					y: 9,
					orientation: getRandomOrientation(),
					id: 'overworldmon 1',
					dialogue: ['Your Pokemon is enjoying the meadow'],
					conditionFunction: () => true,
				});
			}
			if (second) {
				all.push({
					type: 'POKEMON',
					dexId: internalDex[second].dexId,
					x: 17,
					y: 10,
					orientation: getRandomOrientation(),
					id: 'overworldmon 2',
					dialogue: ['Your Pokemon is enjoying the meadow'],
					conditionFunction: () => true,
				});
			}
			if (third) {
				all.push({
					type: 'POKEMON',
					dexId: internalDex[third].dexId,
					x: 17,
					y: 8,
					orientation: getRandomOrientation(),
					id: 'overworldmon 3',
					dialogue: ['Your Pokemon is enjoying the meadow'],
					conditionFunction: () => true,
				});
			}
			if (fourth) {
				all.push({
					type: 'POKEMON',
					dexId: internalDex[fourth].dexId,
					x: 13,
					y: 11,
					orientation: getRandomOrientation(),
					id: 'overworldmon 4',
					dialogue: ['Your Pokemon is enjoying the meadow'],
					conditionFunction: () => true,
				});
			}
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
