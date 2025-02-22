import { occupantsRecord } from '../../../constants/checkLists/occupantsRecord';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { Message } from '../../../hooks/useMessageQueue';
import { LeaveBattlePayload } from '../../../hooks/useSaveFile';
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
	latestMessage,
	addMessage,
	addMultipleMessages,
	interjectMessage,
}: {
	leave: (x: LeaveBattlePayload) => void;
	challenger: Challenger;
	team: OwnedPokemon[];
	inventory: Inventory;
	ownedPokemonDexIds: number[];
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
	interjectMessage: (message: Message) => void;
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
