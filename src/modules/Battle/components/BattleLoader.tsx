import { useContext, useEffect, useState } from 'react';
import { addPokemonToDex } from '../../../functions/addPokemonToDex';
import { getMiddleOfThree } from '../../../functions/getMiddleOfThree';
import {
	OverworldShaderMap,
	getTimeOfDay,
} from '../../../functions/getTimeOfDay';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { Message } from '../../../hooks/useMessageQueue';
import {
	LeaveBattlePayload,
	SaveFileContext,
} from '../../../hooks/useSaveFile';
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
			generateIvs: true,
			generateEvs: true,
			assignHeldItem: true,
		}
	);
	const { res: battleTeam } = useGetBattleTeam(
		team.map((t) => ({ ...t, caughtBefore: true })),
		{}
	);

	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const [registered, setRegistered] = useState<boolean>(false);
	useEffect(() => {
		if (battleOpponents && !registered) {
			let updatedDex = { ...saveFile.pokedex };
			console.log('see pokemon');
			battleOpponents.forEach((b) => {
				updatedDex = addPokemonToDex(
					updatedDex,
					b.name,
					saveFile.location.mapId
				);
			});
			setRegistered(true);
			patchSaveFileReducer({ ...saveFile, pokedex: updatedDex });
		}
	}, [battleOpponents, patchSaveFileReducer, registered, saveFile]);

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
