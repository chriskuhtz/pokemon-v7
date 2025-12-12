import { useContext, useEffect, useMemo, useState } from 'react';
import { addPokemonToDex } from '../../../functions/addPokemonToDex';
import { getMiddleOfThree } from '../../../functions/getMiddleOfThree';
import { isKO } from '../../../functions/isKo';
import { LocationContext } from '../../../hooks/LocationProvider';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { useLeaveBattle } from '../../../hooks/useLeaveBattle';
import { Message } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { useShader } from '../../../hooks/useShader';
import { Challenger } from '../../../interfaces/Challenger';
import { LoadingScreen } from '../../../uiComponents/LoadingScreen/LoadingScreen';
import { BattleOverview } from './BattleOverview';

export const BattleLoader = ({
	challenger,

	latestMessage,
	addMessage,
	addMultipleMessages,
}: {
	challenger: Challenger;

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

	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);
	const { res: battleTeam } = useGetBattleTeam(team, {});

	const { location } = useContext(LocationContext);
	const leave = useLeaveBattle();

	useEffect(() => {
		if (team.length === 0) {
			leave({
				caughtPokemon: [],
				updatedInventory: saveFile.bag,
				scatteredCoins: 0,
				team: [],
				outcome: 'LOSS',
				defeatedPokemon: [],
			});
		}
	}, [leave, saveFile.bag, team.length]);

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
					Math.min(
						battleOpponents.length,
						battleTeam.filter((b) => !isKO(b)).length
					),
					2,
				])}
				inventory={saveFile.bag}
				challengerId={challenger.id}
				trainer={challenger.trainer}
				latestMessage={latestMessage}
				addMessage={addMessage}
				addMultipleMessages={addMultipleMessages}
				challengerType={challenger.type}
			/>
		</>
	);
};
