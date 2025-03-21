import { getMiddleOfThree } from '../../../functions/getMiddleOfThree';
import {
	OverworldShaderMap,
	getTimeOfDay,
} from '../../../functions/getTimeOfDay';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { Message } from '../../../hooks/useMessageQueue';
import { LeaveBattlePayload } from '../../../hooks/useSaveFile';
import { Challenger } from '../../../interfaces/Challenger';
import { Inventory } from '../../../interfaces/Inventory';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { LoadingScreen } from '../../../uiComponents/LoadingScreen/LoadingScreen';
import { BattleOverview } from './BattleOverview';

export const BattleLoader = ({
	leave,
	team,
	challenger,
	inventory,
	ownedPokemonNames,
	latestMessage,
	addMessage,
	addMultipleMessages,
}: {
	leave: (x: LeaveBattlePayload) => void;
	challenger: Challenger;
	team: OwnedPokemon[];
	inventory: Inventory;
	ownedPokemonNames: string[];
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
}): JSX.Element => {
	const { res: battleOpponents } = useGetBattleTeam(
		challenger.team.map((o) => ({
			...o,
			caughtBefore: ownedPokemonNames.includes(o.name),
		})),
		{
			assignLearnsetMoves: true,
			assignGender: true,
			assignNaturalAbility: true,
		}
	);
	const { res: battleTeam } = useGetBattleTeam(
		team.map((t) => ({ ...t, caughtBefore: true })),
		{}
	);

	if (!battleOpponents || !battleTeam) {
		return <LoadingScreen />;
	}
	return (
		<>
			<div
				id="shader1"
				style={{
					pointerEvents: 'none',
					width: '100dvw',
					height: '100dvh',
					top: 0,
					left: 0,
					position: 'absolute',
					backgroundColor: OverworldShaderMap[getTimeOfDay()],
					zIndex: 1,
				}}
			/>
			<BattleOverview
				leave={leave}
				opponents={battleOpponents}
				team={battleTeam}
				fightersPerSide={getMiddleOfThree([
					1,
					Math.min(battleOpponents.length, battleTeam.length),
					2,
				])}
				inventory={inventory}
				trainer={challenger.trainer}
				latestMessage={latestMessage}
				addMessage={addMessage}
				addMultipleMessages={addMultipleMessages}
			/>
		</>
	);
};
