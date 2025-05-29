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
		console.log(impo);
		if (impo && impo.mapId === map.id) {
			all.push({
				...impo,
				team: () => impo.team,
				conditionFunction: () => true,
			});
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
