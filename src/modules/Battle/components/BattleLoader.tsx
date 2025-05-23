import { useContext, useEffect, useState } from 'react';
import { addPokemonToDex } from '../../../functions/addPokemonToDex';
import { getMiddleOfThree } from '../../../functions/getMiddleOfThree';
import { LocationContext } from '../../../hooks/LocationProvider';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { useLeaveBattle } from '../../../hooks/useLeaveBattle';
import { Message } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { useShader } from '../../../hooks/useShader';
import { Challenger } from '../../../interfaces/Challenger';
import { Inventory } from '../../../interfaces/Inventory';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { LoadingScreen } from '../../../uiComponents/LoadingScreen/LoadingScreen';
import { BattleOverview } from './BattleOverview';

export const BattleLoader = ({
	team,
	challenger,
	inventory,
	latestMessage,
	addMessage,
	addMultipleMessages,
}: {
	challenger: Challenger;
	team: OwnedPokemon[];
	inventory: Inventory;
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
}): JSX.Element => {
	const { res: battleOpponents } = useGetBattleTeam(
		challenger.team,
		challenger.battleTeamConfig ?? {
			assignLearnsetMoves: true,
			assignGender: true,

			assignHeldItem: true,
		}
	);
	const { res: battleTeam } = useGetBattleTeam(team, {});

	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);
	const leave = useLeaveBattle();

	const [registered, setRegistered] = useState<boolean>(false);
	useEffect(() => {
		if (battleOpponents && !registered) {
			let updatedDex = { ...saveFile.pokedex };
			battleOpponents.forEach((b) => {
				updatedDex = addPokemonToDex(updatedDex, b.name, location.mapId);
			});
			setRegistered(true);
			patchSaveFileReducer({ ...saveFile, pokedex: updatedDex });
		}
	}, [
		battleOpponents,
		location.mapId,
		patchSaveFileReducer,
		registered,
		saveFile,
	]);

	const shader = useShader();
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
					backgroundColor: shader,
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
