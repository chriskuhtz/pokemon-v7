import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { TimeOfDay } from '../../../functions/getTimeOfDay';
import { OverworldEncounter } from '../../../interfaces/OverworldMap';
import { Card } from '../../../uiComponents/Card/Card';
import { PokemonSprite } from '../../../components/PokemonSprite/PokemonSprite';

export const TimeOfDayEncountersSection = ({
	time,
	encounters,
	addEncounter,
	removeEncounter,
}: {
	time: TimeOfDay;
	encounters: OverworldEncounter[];
	addEncounter: (name: string, xp: number, timeOfDay: TimeOfDay) => void;
	removeEncounter: (name: string, xp: number, timeOfDay: TimeOfDay) => void;
}) => {
	const [name, setName] = useState<string | undefined>();
	const [xp, setXp] = useState<number | undefined>();
	return (
		<div>
			<h2>{time}</h2>
			{encounters.map((p) => (
				<Card
					key={p.name + time + xp}
					icon={<PokemonSprite style={{ padding: '0.5rem' }} name={p.name} />}
					content={<strong>Level: {calculateLevelData(p.xp).level} </strong>}
					actionElements={[
						<FaTrash onClick={() => removeEncounter(p.name, p.xp, time)} />,
					]}
				/>
			))}
			<input
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			></input>
			<input
				placeholder="XP"
				type="number"
				value={xp}
				onChange={(e) => setXp(Number.parseInt(e.target.value))}
			></input>
			<button
				disabled={!name || !xp}
				style={{ color: 'white' }}
				onClick={() => {
					if (name && xp) {
						addEncounter(name, xp, time);
					}
				}}
			>
				Add Encounter
			</button>
		</div>
	);
};
