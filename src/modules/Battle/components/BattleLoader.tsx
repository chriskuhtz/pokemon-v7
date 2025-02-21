import { occupantsRecord } from '../../../constants/checkLists/occupantsRecord';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { Challenger } from '../../../interfaces/SaveFile';
import { LoadingScreen } from '../../../uiComponents/LoadingScreen/LoadingScreen';
import { BattleOverview } from './BattleOverview';

export const BattleLoader = ({
	leave,
	team,
	challenger,
	inventory,
	ownedPokemonDexIds,
}: {
	leave: (
		caughtPokemon: BattlePokemon[],
		updatedInventory: Inventory,
		scatteredCoins: number,
		team: BattlePokemon[]
	) => void;
	challenger: Challenger;
	team: OwnedPokemon[];
	inventory: Inventory;
	ownedPokemonDexIds: number[];
}): JSX.Element => {
	const { res: battleOpponents } = useGetBattleTeam(
		challenger.team.map((o) => ({
			...o,
			caughtBefore: ownedPokemonDexIds.includes(o.dexId),
		}))
	);
	const { res: battleTeam } = useGetBattleTeam(
		team.map((t) => ({ ...t, caughtBefore: true }))
	);
	const trainer = occupantsRecord[challenger.id] as OverworldTrainer;

	if (!battleOpponents || !battleTeam) {
		return <LoadingScreen />;
	}
	return (
		<BattleOverview
			leave={leave}
			opponents={battleOpponents}
			team={battleTeam}
			fightersPerSide={Math.min(team.length, challenger.team.length)}
			inventory={inventory}
			trainer={trainer}
		/>
	);
};
