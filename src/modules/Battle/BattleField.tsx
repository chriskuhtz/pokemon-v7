import { useCallback, useEffect, useMemo, useState } from 'react';
import { MoveName } from '../../constants/checkLists/movesCheckList';
import { animationTimer } from '../../constants/gameData';
import { getOpponentPokemon } from '../../functions/getOpponentPokemon';
import { getPlayerPokemon } from '../../functions/getPlayerPokemon';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { ControlBar } from './components/ControlBar';
import { EnemyLane } from './components/EnemyLane';
import { PlayerLane } from './components/PlayerLane';
import { useChooseAction } from './hooks/useChooseAction';
import { useHandleAction } from './hooks/useHandleAction/useHandleAction';

export type ActionType = MoveName | ItemType | 'RUN_AWAY';
export interface ChooseActionPayload {
	userId: string;
	actionName: ActionType;
	targetId: string;
}

export interface BattleMessage {
	message: string;
	onRemoval?: () => void;
}

export const useMessages = () => {
	const [messages, setMessages] = useState<BattleMessage[]>([]);
	const addMessage = useCallback((message: BattleMessage) => {
		setMessages((messages) => [...messages, message]);
	}, []);
	useEffect(() => {
		if (messages.length === 0) {
			return;
		}
		const t = setTimeout(() => {
			if (messages[0].onRemoval) {
				messages[0].onRemoval();
			}

			setMessages(messages.slice(1));
		}, animationTimer);

		return () => clearTimeout(t);
	}, [messages]);
	const latestMessage = useMemo(
		() => (messages.length > 0 ? messages[0] : undefined),
		[messages]
	);

	return { latestMessage, addMessage };
};
export const BattleField = ({
	leave,
	initOpponents,
	initTeam,
	inventory,
}: {
	leave: () => void;
	initOpponents: BattlePokemon[];
	initTeam: BattlePokemon[];
	fightersPerSide: number;
	inventory: Inventory;
}) => {
	const { latestMessage, addMessage } = useMessages();
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
		() => opponents.filter((p) => !['BENCH', 'DEFEATED'].includes(p.status)),
		[opponents]
	);
	const onFieldTeam = useMemo(
		() => team.filter((p) => p.status === 'ONFIELD'),
		[team]
	);
	const allOnField = useMemo(
		() => [...onFieldTeam, ...onFieldOpponents],
		[onFieldOpponents, onFieldTeam]
	);
	const nextPokemonWithoutMove = useMemo(() => {
		if (battleStep !== 'COLLECTING') {
			return;
		}
		return [...onFieldTeam, ...onFieldOpponents].find(
			(p) =>
				!p.moveQueue.some((m) => m.round === battleRound) &&
				p.status === 'ONFIELD'
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
	const battleWon = useMemo(
		() =>
			opponents.every((o) => o.status === 'CAUGHT' || o.status === 'FAINTED'),
		[opponents]
	);
	const battleLost = useMemo(
		() => team.every((t) => t.status === 'FAINTED'),
		[team]
	);

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
	}, [battleStep, nextMover]);
	useEffect(() => {
		if (battleStep === 'EXECUTING' && nextMover && !latestMessage) {
			console.log('effect 3');

			handleAction(nextMover);
		}
	}, [battleStep, handleAction, latestMessage, nextMover]);
	useEffect(() => {
		if (battleLost && !latestMessage) {
			addMessage({ message: 'You lost the battle', onRemoval: () => leave() });
		}
		if (battleWon && !latestMessage) {
			addMessage({ message: 'You won the battle', onRemoval: () => leave() });
		}
	}, [addMessage, battleLost, battleWon, latestMessage, leave]);

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
				message={latestMessage?.message}
				playerInventory={inventory}
			/>
		</div>
	);
};
