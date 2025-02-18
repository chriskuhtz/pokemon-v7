import { useCallback, useEffect, useMemo, useState } from 'react';
import { MoveName } from '../../constants/checkLists/movesCheckList';
import { animationTimer } from '../../constants/gameData';
import { getOpponentPokemon } from '../../functions/getOpponentPokemon';
import { getPlayerPokemon } from '../../functions/getPlayerPokemon';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { ControlBar } from './components/ControlBar';
import { EnemyLane } from './components/EnemyLane';
import { PlayerLane } from './components/PlayerLane';
import { useChooseAction } from './hooks/useChooseAction';
import { useHandleAction } from './hooks/useHandleAction';

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
	const [messages, setMessages] = useState<string[]>([]);
	const addMessage = useCallback((message: string) => {
		setMessages((messages) => [...messages, message]);
	}, []);

	useEffect(() => {
		if (messages.length === 0) {
			return;
		}
		const t = setTimeout(() => {
			setMessages(messages.slice(1));
		}, animationTimer);

		return () => clearTimeout(t);
	}, [messages]);
	const latestMessage = useMemo(
		() => (messages.length > 0 ? messages[0] : undefined),
		[messages]
	);

	const [battleRound, setBattleRound] = useState<number>(0);
	const [battleStep, setBattleStep] = useState<'COLLECTING' | 'EXECUTING'>(
		'COLLECTING'
	);
	useEffect(() => {
		console.log(battleStep);
	}, [battleStep]);

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
		if (battleStep !== 'COLLECTING') {
			return;
		}
		return [...onFieldTeam, ...onFieldOpponents].find(
			(p) => !p.moveQueue.some((m) => m.round === battleRound)
		);
	}, [battleRound, battleStep, onFieldOpponents, onFieldTeam]);
	const nextMover = useMemo(() => {
		if (battleStep !== 'EXECUTING') {
			return;
		}
		return [...onFieldTeam, ...onFieldOpponents].find((p) =>
			p.moveQueue.some((m) => m.round === battleRound)
		);
	}, [battleRound, battleStep, onFieldOpponents, onFieldTeam]);

	//REDUCERS
	const chooseAction = useChooseAction(
		leave,
		allOnField,
		pokemon,
		setPokemon,
		battleRound
	);
	const handleAction = useHandleAction(pokemon, setPokemon, addMessage);
	//AUTOMATIONS
	useEffect(() => {
		if (battleStep === 'COLLECTING' && !nextPokemonWithoutMove) {
			console.log('effect 1');
			setBattleStep('EXECUTING');
		}
	}, [battleStep, nextPokemonWithoutMove]);
	useEffect(() => {
		if (battleStep === 'EXECUTING' && !nextMover) {
			console.log('effect 2');
			setBattleStep('COLLECTING');
			setBattleRound((battleRound) => battleRound + 1);
		}
	}, [battleStep, nextMover, nextPokemonWithoutMove]);
	useEffect(() => {
		if (battleStep === 'EXECUTING' && nextMover && !latestMessage) {
			console.log('effect 3');

			handleAction(nextMover);
		}
	}, [addMessage, battleStep, handleAction, latestMessage, nextMover, pokemon]);
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
				targets={allOnField.filter((p) => p.id !== nextPokemonWithoutMove?.id)}
				chooseAction={chooseAction}
				message={latestMessage}
			/>
		</div>
	);
};
