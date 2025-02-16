import { useCallback, useEffect, useMemo, useState } from 'react';
import { AddToastFunction } from '../../../../hooks/useToasts';
import {
	BattleAction,
	CatchProcessInfo,
} from '../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { EmptyInventory, Inventory } from '../../../../interfaces/Inventory';
import { SaveFile } from '../../../../interfaces/SaveFile';
import { WeatherType } from '../../../../interfaces/Weather';
import {
	BattleStep,
	introPath,
	opponentIsFasterPath,
	playerIsFasterPath,
	possibleNextSteps,
} from '../../types/BattleStep';
import { useBattleEnd } from './StepHandlers/useBattleEnd';
import { useCatchingSteps } from './StepHandlers/useCatchingSteps';
import { useCleanMoveQueue } from './StepHandlers/useCleanMoveQueue';
import { useExecuteOpponentMove } from './StepHandlers/useExecuteOpponentMove';
import { useExecutePlayerMove } from './StepHandlers/useExecutePlayerMove';
import { useFlinched } from './StepHandlers/useFlinched';
import { useHandleOpponentEndOfTurnAbility } from './StepHandlers/useHandleOpponentEndOfTurnAbility';
import { useHandleOpponentEndOfTurnDamage } from './StepHandlers/useHandleOpponentEndOfTurnDamage';
import { useHandlePlayerEndOfTurnAbility } from './StepHandlers/useHandlePlayerEndOfTurnAbility';
import { useHandlePlayerEndOfTurnDamage } from './StepHandlers/useHandlePlayerEndOfTurnDamage';
import { useMoveHandling } from './StepHandlers/useMoveHandling';
import { useMoveSelection } from './StepHandlers/useMoveSelection';
import { useOpponentCureAilments } from './StepHandlers/useOpponentCureAilments';
import { useOpponentEmerge } from './StepHandlers/useOpponentEmerge';
import { useOpponentFainting } from './StepHandlers/useOpponentFainting';
import { useOpponentIntro } from './StepHandlers/useOpponentIntro';
import { useOpponentMoveSelection } from './StepHandlers/useOpponentMoveSelection';
import { useOpponentUnableToAttack } from './StepHandlers/useOpponentUnableToAttack';
import { usePlayerCureAilments } from './StepHandlers/usePlayerCureAilments';
import { usePlayerEmerge } from './StepHandlers/usePlayerEmerge';
import { usePlayerFainting } from './StepHandlers/usePlayerFainting';
import { usePlayerIntro } from './StepHandlers/usePlayerIntro';
import { usePlayerUnableToAttack } from './StepHandlers/usePlayerUnableToAttack';

interface UseBattleStepsProps {
	initSaveFile: SaveFile;
	goBack: (update: SaveFile) => void;
	opponent: BattlePokemon | undefined;
	player: BattlePokemon | undefined;
	setOpponent: (x: BattlePokemon) => void;
	setPlayer: (x: BattlePokemon) => void;
	dispatchToast: AddToastFunction;
}

export interface BattleStepHandler {
	battleStep: BattleStep;
	followBattleStepPath: (path: BattleStep[]) => void;
}
export interface ExtendedBattleStepHandler extends BattleStepHandler {
	player?: BattlePokemon;
	opponent?: BattlePokemon;
	setPlayer: (x: BattlePokemon) => void;
	setOpponent: (x: BattlePokemon) => void;
	battleWeather: WeatherType | undefined;
	setBattleWeather: (x: WeatherType | undefined) => void;
	dispatchToast: AddToastFunction;
	setCaughtPokemon: React.Dispatch<React.SetStateAction<CatchProcessInfo[]>>;
	setUsedItems: React.Dispatch<React.SetStateAction<Inventory>>;
	setCoins: React.Dispatch<React.SetStateAction<number>>;
	followBattleStepPath: (path: BattleStep[]) => void;
	setBeginsThisTurn: React.Dispatch<React.SetStateAction<string | undefined>>;
	followTurnPath: () => void;
	startPath: (path: BattleStep[]) => void;
	battleRound: number;
}

export const useBattleSteps = ({
	initSaveFile,
	goBack,
	opponent,
	player,
	setOpponent,
	setPlayer,
	dispatchToast,
}: UseBattleStepsProps): {
	nextMove: BattleAction | undefined;
	battleStep: BattleStep;
	initBattle: () => void;
	battleWeather: WeatherType | undefined;
	usedItems: Inventory;
	battleRound: number;
	runAway: () => void;
} => {
	const [battleStep, setBattleStep] = useState<BattleStep>('UNITIALIZED');
	const [battleWeather, setBattleWeather] = useState<WeatherType | undefined>();
	const [battleRound, setBattleRound] = useState<number>(0);
	const [usedItems, setUsedItems] = useState<Inventory>(EmptyInventory);
	const [coins, setCoins] = useState<number>(0);
	const [caughtPokemon, setCaughtPokemon] = useState<CatchProcessInfo[]>([]);
	const [beginsThisTurn, setBeginsThisTurn] = useState<string | undefined>();

	useEffect(() => {
		console.log(battleStep, battleRound);
		if (battleStep === 'MOVE_HANDLING') {
			setBattleRound((battleRound) => battleRound + 1);
		}
	}, [battleRound, battleStep, opponent, player, setPlayer]);

	const nextMove = useMemo(() => {
		if (
			opponent?.moveQueue &&
			opponent.moveQueue.length > 0 &&
			battleStep === 'EXECUTE_OPPONENT_MOVE'
		) {
			return opponent.moveQueue[0];
		}
		if (
			player?.moveQueue &&
			player.moveQueue.length > 0 &&
			(battleStep === 'EXECUTE_PLAYER_MOVE' ||
				battleStep === 'CATCHING_PROCESS_1' ||
				battleStep === 'CATCHING_PROCESS_2' ||
				battleStep === 'CATCHING_PROCESS_3' ||
				battleStep === 'CATCHING_PROCESS_4' ||
				battleStep === 'CATCHING_SUCCESS' ||
				battleStep === 'CATCHING_FAILURE')
		) {
			return player.moveQueue[0];
		}

		return undefined;
	}, [battleStep, opponent, player]);

	const protectedSetBattleStep = useCallback(
		(nextStep: BattleStep) => {
			const availableNextSteps = possibleNextSteps[battleStep];

			if (!availableNextSteps.some((a) => a === nextStep)) {
				throw new Error(`invalid path', ${battleStep} to ${nextStep}`);
			}
			setBattleStep(nextStep);
		},
		[battleStep]
	);
	const followBattleStepPath = useCallback(
		(path: BattleStep[]) => {
			const index = path.findIndex((p) => p === battleStep);
			if (index === -1) {
				throw new Error(`${battleStep} is not in path ${path.join()}`);
			}
			if (index === path.length - 1) {
				throw new Error(`${battleStep} is the end of path ${path.join()}`);
			}
			//console.log('moving to path index', index + 1, 'of', path);
			setBattleStep(path[index + 1]);
		},
		[battleStep]
	);
	const startPath = useCallback((path: BattleStep[]) => {
		//paths can have different starting points that are not included in the path
		setBattleStep(path[0]);
	}, []);
	const followTurnPath = useCallback(() => {
		if (beginsThisTurn === opponent?.id) {
			followBattleStepPath(opponentIsFasterPath);
		} else followBattleStepPath(playerIsFasterPath);
	}, [beginsThisTurn, followBattleStepPath, opponent]);
	const opponentHasBeenCaughtBefore = useMemo(() => {
		//TODO: ignores evo stages right now, fix when implementing pokedex
		return initSaveFile.pokemon.some((p) => p.dexId === opponent?.dexId);
	}, [initSaveFile.pokemon, opponent?.dexId]);
	const extendedPayload: ExtendedBattleStepHandler = useMemo(
		() => ({
			battleRound,
			startPath,
			followTurnPath,
			setBeginsThisTurn,
			followBattleStepPath,
			battleStep,
			player,
			opponent,
			dispatchToast,
			setBattleWeather,
			setOpponent,
			setPlayer,
			battleWeather,
			setCaughtPokemon,
			caughtPokemon,
			setUsedItems,
			setCoins,
		}),
		[
			battleRound,
			startPath,
			followTurnPath,
			followBattleStepPath,
			battleStep,
			player,
			opponent,
			dispatchToast,
			setOpponent,
			setPlayer,
			battleWeather,
			caughtPokemon,
		]
	);

	const { runAway, getWhirlwinded } = useBattleEnd({
		battleStep,
		caughtPokemon,
		coins,
		usedItems,
		initSaveFile,
		goBack,
		player,
		dispatchToast,
	});

	useOpponentIntro(battleStep, () => followBattleStepPath(introPath));
	usePlayerIntro(battleStep, () => followBattleStepPath(introPath));
	useOpponentEmerge(extendedPayload);
	usePlayerEmerge(extendedPayload);
	useHandlePlayerEndOfTurnAbility(extendedPayload);
	useHandleOpponentEndOfTurnAbility(extendedPayload);
	useCleanMoveQueue(extendedPayload);
	useMoveSelection(extendedPayload);
	useOpponentMoveSelection(extendedPayload);
	useMoveHandling(extendedPayload);
	usePlayerCureAilments(extendedPayload);
	useOpponentCureAilments(extendedPayload);
	useExecutePlayerMove({
		...extendedPayload,
		setBattleStep: protectedSetBattleStep,
		getWhirlwinded,
	});
	useExecuteOpponentMove({
		...extendedPayload,
		setBattleStep: protectedSetBattleStep,
		getWhirlwinded,
	});
	useFlinched(extendedPayload);
	useOpponentUnableToAttack(extendedPayload);
	usePlayerUnableToAttack(extendedPayload);
	useCatchingSteps({ ...extendedPayload, opponentHasBeenCaughtBefore });
	useHandleOpponentEndOfTurnDamage(extendedPayload);
	useHandlePlayerEndOfTurnDamage(extendedPayload);
	useOpponentFainting({ battleStep, followBattleStepPath });
	usePlayerFainting({ battleStep, followBattleStepPath });

	const initBattle = () => {
		followBattleStepPath(introPath);
	};

	return {
		nextMove,
		battleStep,
		initBattle,
		battleWeather,
		usedItems,
		battleRound,
		runAway,
	};
};
