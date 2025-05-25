import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mapsRecord } from '../../../constants/maps/mapsRecord';
import { nameToIdMap } from '../../../constants/pokemonNames';
import { getRandomOrientation } from '../../../functions/getNextClockwiseDirection';
import { occupantHandled } from '../../../functions/occupantHandled';
import {
	createAdmin,
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
	useEffect(() => {
		if (saveFile.troubleMakers && saveFile.troubleMakers.route === map.id) {
			const all = [
				...map.occupants,
				...saveFile.troubleMakers.trainers.map((t) => {
					if (
						[
							'Rocket Admin Chad',
							'Rocket Admin Hillary',
							'Aqua Boss Archie',
							'Magma Boss Maxie',
						].includes(t.id)
					) {
						return createAdmin(
							saveFile.troubleMakers?.affiliation ?? 'rocket',
							{
								x: t.x,
								y: t.y,
							}
						);
					}

					return {
						...t,
						team: () => getTroubleMakerTeam(saveFile),
						conditionFunction: () =>
							!saveFile.handledOccupants.some((h) => h.id === t.id),
					};
				}),
			];

			const length = all.length;
			if (statefulOccupants.length !== length) {
				setStatefulOccupants(all);
			}

			return;
		}
		if (
			saveFile.currentRampagingPokemon &&
			saveFile.currentRampagingPokemon.route === map.id
		) {
			const { x, y, id, name } = saveFile.currentRampagingPokemon;

			const all: Occupant[] = [
				...map.occupants,
				{
					type: 'POKEMON',
					x,
					y,
					orientation: getRandomOrientation(),
					dexId: nameToIdMap[name],
					encounter: {
						name: name,
						maxXp: 100 * 100 * 100,
						minXp: 70 * 70 * 70,
						rarity: 'common',
					},
					dialogue: [`The rampaging ${name} attacks`],
					conditionFunction: (s) => !occupantHandled(s, id),

					id,
				},
			];
			const length = all.length;
			if (statefulOccupants.length !== length) {
				setStatefulOccupants(all);
			}

			return;
		}
		setStatefulOccupants(map.occupants);
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
