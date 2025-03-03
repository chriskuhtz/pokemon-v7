import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { TimeOfDay } from '../../../functions/getTimeOfDay';
import { OverworldEncounter } from '../../../interfaces/OverworldMap';
import { Card } from '../../../uiComponents/Card/Card';

export const TimeOfDayEncountersSection = ({
	time,
	encounters,
	addEncounter,
	removeEncounter,
}: {
	time: TimeOfDay;
	encounters: OverworldEncounter[];
	addEncounter: (dexId: number, xp: number, timeOfDay: TimeOfDay) => void;
	removeEncounter: (dexId: number, xp: number, timeOfDay: TimeOfDay) => void;
}) => {
	const [dexId, setDexId] = useState<number | undefined>();
	const [xp, setXp] = useState<number | undefined>();
	return (
		<div>
			<h2>{time}</h2>
			{encounters.map((p) => (
				<Card
					icon={
						<img
							style={{ padding: '0.5rem' }}
							src={getPokemonSprite(p.dexId)}
						/>
					}
					content={<strong>Level: {calculateLevelData(p.xp).level} </strong>}
					actionElements={[
						<FaTrash onClick={() => removeEncounter(p.dexId, p.xp, time)} />,
					]}
				/>
			))}
			<input
				placeholder="DEX ID"
				value={dexId}
				onChange={(e) => setDexId(Number.parseInt(e.target.value))}
			></input>
			<input
				placeholder="XP"
				value={xp}
				onChange={(e) => setXp(Number.parseInt(e.target.value))}
			></input>
			<button
				disabled={!dexId || !xp}
				style={{ color: 'white' }}
				onClick={() => {
					if (dexId && xp) {
						addEncounter(dexId, xp, time);
					}
				}}
			>
				Add Encounter
			</button>
		</div>
	);
};
