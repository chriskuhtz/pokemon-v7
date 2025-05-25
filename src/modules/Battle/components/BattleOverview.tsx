import { useCallback, useState } from 'react';
import { isKO } from '../../../functions/isKo';
import { LeaveBattlePayload } from '../../../hooks/useLeaveBattle';
import { Message } from '../../../hooks/useMessageQueue';
import { useScreenTransition } from '../../../hooks/useScreenTransition';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { TrainerInfo } from '../../../interfaces/Challenger';
import { Inventory } from '../../../interfaces/Inventory';
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
	challengerId,
	challengerType,
}: {
	leave: (x: LeaveBattlePayload) => void;
	opponents: BattlePokemon[];
	team: BattlePokemon[];
	fightersPerSide: number;
	inventory: Inventory;
	trainer?: TrainerInfo;
	latestMessage: Message | undefined;
	challengerId: string;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
	challengerType: 'TRAINER' | 'WILD';
}): JSX.Element => {
	const [battleStarted, setBattleStarted] = useState<boolean>(false);

	const [selectedTeam, setSelectedTeam] = useState<string[]>(
		team
			.filter((p) => !isKO(p))
			.slice(0, fightersPerSide)
			.map((p) => p.id)
	);

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
				names={team
					.filter((t) => selectedTeam.includes(t.id))
					.map((t) => t.name)}
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
			initTeam={team.map((t) => {
				if (selectedTeam.includes(t.id)) {
					return {
						...t,
						status: 'ONFIELD',
					};
				}
				if (isKO(t)) {
					return { ...t, status: 'FAINTED' };
				}
				return {
					...t,
					status: 'BENCH',
				};
			})}
			initOpponents={opponents.map((o, i) => ({
				...o,
				status: i < fightersPerSide ? 'ONFIELD' : 'BENCH',
			}))}
			latestMessage={latestMessage}
			addMessage={addMessage}
			addMultipleMessages={addMultipleMessages}
			challengerId={challengerId}
			spriteGeneration={trainer?.spriteGeneration}
			challengerType={challengerType}
		/>
	);
};
