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
	ownedPokemonDexIds,
}: {
	leave: (
		caughtPokemon: BattlePokemon[],
		updatedInventory: Inventory,
		scatteredCoins: number
	) => void;
	opponents: OwnedPokemon[];
	team: OwnedPokemon[];
	fightersPerSide: number;
	inventory: Inventory;
	ownedPokemonDexIds: number[];
}): JSX.Element => {
	const { res: battleOpponents } = useGetBattleTeam(
		opponents.map((o) => ({
			...o,
			caughtBefore: ownedPokemonDexIds.includes(o.dexId),
		}))
	);
	const { res: battleTeam } = useGetBattleTeam(
		team.map((t) => ({ ...t, caughtBefore: true }))
	);

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
