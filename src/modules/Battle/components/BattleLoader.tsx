import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { LoadingScreen } from '../../../uiComponents/LoadingScreen/LoadingScreen';
import { BattleOverview } from './BattleOverview';

export const BattleLoader = ({
	leave,
	opponents,
	team,
	fightersPerSide,
	inventory,
}: {
	leave: (caughtPokemon: BattlePokemon[], updatedInventory: Inventory) => void;
	opponents: OwnedPokemon[];
	team: OwnedPokemon[];
	fightersPerSide: number;
	inventory: Inventory;
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
			inventory={inventory}
		/>
	);
};
