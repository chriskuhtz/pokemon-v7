import { useCallback, useState } from 'react';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { BattleField } from '../BattleField';
import { LineUpSelection } from './LineUpSelection';

export const BattleOverview = ({
	leave,
	opponents,
	team,
	fightersPerSide,
}: {
	leave: () => void;
	opponents: BattlePokemon[];
	team: BattlePokemon[];
	fightersPerSide: number;
}): JSX.Element => {
	const [battleStarted, setBattleStarted] = useState<boolean>(false);
	const [selectedTeam, setSelectedTeam] = useState<string[]>([]);

	const toggleSelected = useCallback(
		(id: string) => {
			if (selectedTeam.includes(id)) {
				setSelectedTeam(selectedTeam.filter((i) => i !== id));
				return;
			}
			setSelectedTeam([...selectedTeam, id]);
		},
		[selectedTeam]
	);

	if (!battleStarted) {
		return (
			<LineUpSelection
				leave={leave}
				opponents={opponents}
				team={team}
				fightersPerSide={fightersPerSide}
				startBattle={() => {
					console.log('clicked');
					setBattleStarted(true);
				}}
				selectedTeam={selectedTeam}
				toggleSelected={toggleSelected}
			/>
		);
	}

	return (
		<BattleField
			fightersPerSide={fightersPerSide}
			leave={leave}
			team={team.map((t) => ({ ...t, onField: selectedTeam.includes(t.id) }))}
			opponents={opponents.map((o, i) => ({
				...o,
				onField: i < fightersPerSide,
			}))}
		/>
	);
};
