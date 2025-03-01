import { TimeOfDay } from '../../../functions/getTimeOfDay';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { TimeOfDayEncountersSection } from './TimeOfDayEncountersSection';

export const EncountersTab = ({
	newMap,
	addEncounter,
	removeEncounter,
}: {
	newMap: OverworldMap;
	addEncounter: (dexId: number, xp: number, timeOfDay: TimeOfDay) => void;
	removeEncounter: (dexId: number, xp: number, timeOfDay: TimeOfDay) => void;
}) => {
	return (
		<div>
			<div style={{ maxHeight: '80dvh', overflowY: 'scroll' }}>
				{Object.entries(newMap.possibleEncounters).map(([time, encounters]) => {
					return (
						<TimeOfDayEncountersSection
							time={time as TimeOfDay}
							encounters={encounters}
							addEncounter={addEncounter}
							removeEncounter={removeEncounter}
						/>
					);
				})}
			</div>
		</div>
	);
};
