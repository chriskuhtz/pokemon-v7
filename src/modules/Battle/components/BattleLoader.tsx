import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { LoadingScreen } from '../../../uiComponents/LoadingScreen/LoadingScreen';
import { BattleOverview } from './BattleOverview';

export const BattleLoader = ({
	leave,
	opponents,
	team,
	fightersPerSide,
}: {
	leave: () => void;
	opponents: OwnedPokemon[];
	team: OwnedPokemon[];
	fightersPerSide: number;
}): JSX.Element => {
	const { res: battleOpponents } = useGetBattleTeam(opponents);
	const { res: battleTeam } = useGetBattleTeam(team);

	if (!battleOpponents || !battleTeam) {
		return <LoadingScreen />;
	}
	return (
		<BattleOverview
			leave={leave}
			opponents={battleOpponents}
			team={battleTeam}
			fightersPerSide={fightersPerSide}
		/>
	);
};
