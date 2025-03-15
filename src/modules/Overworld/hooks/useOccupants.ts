import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mapsRecord } from '../../../constants/maps/mapsRecord';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { Occupant } from '../../../interfaces/OverworldMap';
import { CharacterOrientation } from '../../../interfaces/SaveFile';

export const useOccupants = () => {
	const { saveFile } = useContext(SaveFileContext);
	const map = useMemo(
		() => mapsRecord[saveFile.location.mapId],
		[saveFile.location.mapId]
	);

	const [statefulOccupants, setStatefulOccupants] = useState<Occupant[]>([]);
	useEffect(() => {
		setStatefulOccupants(map.occupants);
	}, [map]);

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
