import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mapsRecord } from '../../../constants/maps/mapsRecord';
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
				...saveFile.troubleMakers.trainers.map((t) => ({
					...t,
					conditionFunction: () =>
						!saveFile.handledOccupants.some((h) => h.id === t.id),
				})),
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
