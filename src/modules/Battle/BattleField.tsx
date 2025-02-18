import { useCallback, useEffect, useMemo, useState } from 'react';
import { MoveName } from '../../constants/checkLists/movesCheckList';
import { getOpponentPokemon } from '../../functions/getOpponentPokemon';
import { getPlayerPokemon } from '../../functions/getPlayerPokemon';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { ControlBar } from './components/ControlBar';
import { EnemyLane } from './components/EnemyLane';
import { PlayerLane } from './components/PlayerLane';
import { useBattleMessages } from './hooks/useBattleMessages';
import { useChooseAction } from './hooks/useChooseAction';
import { useHandleAction } from './hooks/useHandleAction/useHandleAction';
import { RefillHandling } from './components/RefillHandling';

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

export const BattleField = ({
	leave,
	initOpponents,
	initTeam,
	inventory,
	fightersPerSide,
}: {
	leave: (caughtPokemon: BattlePokemon[]) => void;
	initOpponents: BattlePokemon[];
	initTeam: BattlePokemon[];
	fightersPerSide: number;
	inventory: Inventory;
}) => {
	const { latestMessage, addMessage } = useBattleMessages();
	const [battleRound, setBattleRound] = useState<number>(0);
	const [battleStep, setBattleStep] = useState<
		'COLLECTING' | 'EXECUTING' | 'REFILLING'
	>('REFILLING');
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
	const teamCanRefill = useMemo(() => {
		return (
			onFieldTeam.length < fightersPerSide &&
			team.some((t) => t.status === 'BENCH')
		);
	}, [fightersPerSide, onFieldTeam, team]);
	const opponentCanRefill = useMemo(() => {
		return (
			onFieldOpponents.length < fightersPerSide &&
			opponents.some((t) => t.status === 'BENCH')
		);
	}, [fightersPerSide, onFieldOpponents, opponents]);

	//REDUCERS
	const chooseAction = useChooseAction(
		allOnField,
		pokemon,
		setPokemon,
		battleRound
	);
	const handleAction = useHandleAction(pokemon, setPokemon, addMessage, leave);
	const putPokemonOnField = useCallback(
		(id: string) =>
			setPokemon((pokemon) =>
				pokemon.map((p) => {
					if (p.id === id) {
						if (p.status !== 'BENCH') {
							throw new Error(
								'how on gods good earth do ya wanna put a fainted/caught pokemon on the field, lebowski?'
							);
						}
						return { ...p, status: 'ONFIELD', roundsInBattle: 0 };
					}
					return p;
				})
			),
		[]
	);
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
			addMessage({
				message: 'You lost the battle',
				onRemoval: () => leave(pokemon.filter((p) => p.status === 'CAUGHT')),
			});
		}
		if (battleWon && !latestMessage) {
			addMessage({
				message: 'You won the battle',
				onRemoval: () => leave(pokemon.filter((p) => p.status === 'CAUGHT')),
			});
		}
	}, [addMessage, battleLost, battleWon, latestMessage, leave, pokemon]);
	useEffect(() => {
		if (battleStep === 'REFILLING' && !teamCanRefill && !opponentCanRefill) {
			console.log('effect 4');
			setBattleStep('COLLECTING');
		}
	}, [battleStep, nextPokemonWithoutMove, opponentCanRefill, teamCanRefill]);

	if (battleStep === 'REFILLING') {
		<RefillHandling
			putPokemonOnField={putPokemonOnField}
			team={team}
			opponentCanRefill={opponentCanRefill}
			teamCanRefill={teamCanRefill}
			opponents={opponents}
			latestMessage={latestMessage}
			addMessage={addMessage}
		/>;
	}

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
