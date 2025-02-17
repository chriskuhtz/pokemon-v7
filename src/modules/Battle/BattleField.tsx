import { useMemo, useState } from 'react';
import { MoveName } from '../../constants/checkLists/movesCheckList';
import { getOpponentPokemon } from '../../functions/getOpponentPokemon';
import { getPlayerPokemon } from '../../functions/getPlayerPokemon';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { ControlBar } from './components/ControlBar';
import { EnemyLane } from './components/EnemyLane';
import { PlayerLane } from './components/PlayerLane';
import { useChooseAction } from './hooks/useChooseAction';

export type ActionType = MoveName | 'RUN_AWAY';
export interface ChooseActionPayload {
	userId: string;
	actionName: ActionType;
	targetId: string;
}
export const BattleField = ({
	leave,
	initOpponents,
	initTeam,
}: {
	leave: () => void;
	initOpponents: BattlePokemon[];
	initTeam: BattlePokemon[];
	fightersPerSide: number;
}) => {
	const [battleRound] = useState<number>(0);
	const [pokemon, setPokemon] = useState<BattlePokemon[]>([
		...initOpponents,
		...initTeam,
	]);

	//SELECTORS
	const opponents = useMemo(() => getOpponentPokemon(pokemon), [pokemon]);
	const team = useMemo(() => getPlayerPokemon(pokemon), [pokemon]);
	const onFieldOpponents = useMemo(
		() => opponents.filter((p) => p.onField),
		[opponents]
	);
	const onFieldTeam = useMemo(() => team.filter((p) => p.onField), [team]);
	const allOnField = useMemo(
		() => [...onFieldTeam, ...onFieldOpponents],
		[onFieldOpponents, onFieldTeam]
	);
	const nextPokemonWithoutMove = useMemo(() => {
		return [...onFieldTeam, ...onFieldOpponents].find(
			(p) => !p.moveQueue.some((m) => m.round === battleRound)
		);
	}, [battleRound, onFieldOpponents, onFieldTeam]);

	//REDUCERS
	const chooseAction = useChooseAction(
		leave,
		allOnField,
		pokemon,
		setPokemon,
		battleRound
	);
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateRows: '2fr 2fr 1fr',
				height: '100dvh',
			}}
		>
			<EnemyLane onFieldOpponents={onFieldOpponents} />
			<PlayerLane onFieldTeam={onFieldTeam} />
			<ControlBar
				controlled={nextPokemonWithoutMove}
				targets={allOnField}
				chooseAction={chooseAction}
			/>
		</div>
	);
};
