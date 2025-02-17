import { BattlePokemon } from '../../interfaces/BattlePokemon';

export const BattleField = ({
	leave,
	opponents,
	team,
	fightersPerSide,
}: {
	leave: () => void;
	opponents: BattlePokemon[];
	team: BattlePokemon[];
	fightersPerSide: number;
}) => {
	return (
		<div>
			Shit will go down <button onClick={leave}>Nah</button>
		</div>
	);
};
