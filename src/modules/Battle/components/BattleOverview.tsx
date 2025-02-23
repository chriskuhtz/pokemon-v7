import { useCallback, useState } from 'react';
import { Message } from '../../../hooks/useMessageQueue';
import { LeaveBattlePayload } from '../../../hooks/useSaveFile';
import { useScreenTransition } from '../../../hooks/useScreenTransition';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';
import { BattleField } from '../BattleField';
import { IntroBanner } from './IntroBanner';
import { LineUpSelection } from './LineUpSelection';

export const BattleOverview = ({
	leave,
	opponents,
	team,
	fightersPerSide,
	inventory,
	trainer,
	latestMessage,
	addMessage,
	addMultipleMessages,
}: {
	leave: (x: LeaveBattlePayload) => void;
	opponents: BattlePokemon[];
	team: BattlePokemon[];
	fightersPerSide: number;
	inventory: Inventory;
	trainer?: OverworldTrainer;
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
}): JSX.Element => {
	const [battleStarted, setBattleStarted] = useState<boolean>(false);

	const [selectedTeam, setSelectedTeam] = useState<string[]>([]);

	const { startTransition, inTransition } = useScreenTransition(() =>
		setBattleStarted(true)
	);

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

	if (inTransition) {
		return (
			<IntroBanner
				dexIds={team
					.filter((t) => selectedTeam.includes(t.id))
					.map((t) => t.dexId)}
			/>
		);
	}

	if (!battleStarted) {
		return (
			<LineUpSelection
				trainer={trainer}
				leave={() =>
					leave({
						updatedInventory: inventory,
						scatteredCoins: 0,
						team,
						defeatedPokemon: [],
						outcome: 'WIN',
						caughtPokemon: [],
					})
				}
				opponents={opponents}
				team={team}
				fightersPerSide={fightersPerSide}
				startBattle={startTransition}
				selectedTeam={selectedTeam}
				toggleSelected={toggleSelected}
			/>
		);
	}

	return (
		<BattleField
			inventory={inventory}
			fightersPerSide={fightersPerSide}
			leave={leave}
			initTeam={team.map((t) => ({
				...t,
				status: selectedTeam.includes(t.id) ? 'ONFIELD' : 'BENCH',
			}))}
			initOpponents={opponents.map((o, i) => ({
				...o,
				status: i < fightersPerSide ? 'ONFIELD' : 'BENCH',
			}))}
			latestMessage={latestMessage}
			addMessage={addMessage}
			addMultipleMessages={addMultipleMessages}
		/>
	);
};
