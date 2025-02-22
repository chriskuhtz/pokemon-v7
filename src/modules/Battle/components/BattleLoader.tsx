import { occupantsRecord } from '../../../constants/checkLists/occupantsRecord';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { Challenger } from '../../../interfaces/SaveFile';
import { LoadingScreen } from '../../../uiComponents/LoadingScreen/LoadingScreen';
import { BattleMessage } from '../BattleField';
import { BattleOverview } from './BattleOverview';

export const BattleLoader = ({
	leave,
	team,
	challenger,
	inventory,
	ownedPokemonDexIds,
	latestMessage,
	addMessage,
	addMultipleMessages,
	interjectMessage,
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
	latestMessage: BattleMessage | undefined;
	addMessage: (message: BattleMessage) => void;
	addMultipleMessages: (newMessages: BattleMessage[]) => void;
	interjectMessage: (message: BattleMessage) => void;
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
			latestMessage={latestMessage}
			addMessage={addMessage}
			interjectMessage={interjectMessage}
			addMultipleMessages={addMultipleMessages}
		/>
	);
};
