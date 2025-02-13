import { useCallback, useEffect, useMemo, useState } from 'react';
import { AddToastFunction } from '../../../../hooks/useToasts';
import {
	BattleAction,
	BattleAttack,
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
import { useExecuteOpponentMove } from './StepHandlers/useExecuteOpponentMove';
import { useExecutePlayerMove } from './StepHandlers/useExecutePlayerMove';
import { useHandleOpponentEndOfTurnAbility } from './StepHandlers/useHandleOpponentEndOfTurnAbility';
import { useHandleOpponentEndOfTurnDamage } from './StepHandlers/useHandleOpponentEndOfTurnDamage';
import { useHandlePlayerEndOfTurnAbility } from './StepHandlers/useHandlePlayerEndOfTurnAbility';
import { useHandlePlayerEndOfTurnDamage } from './StepHandlers/useHandlePlayerEndOfTurnDamage';
import { useMoveHandling } from './StepHandlers/useMoveHandling';
import { useMoveSelection } from './StepHandlers/useMoveSelection';
import { useOpponentChargeUp } from './StepHandlers/useOpponentChargeUp';
import { useOpponentCureAilments } from './StepHandlers/useOpponentCureAilments';
import { useOpponentEmerge } from './StepHandlers/useOpponentEmerge';
import { useOpponentFainting } from './StepHandlers/useOpponentFainting';
import { useOpponentFlinched } from './StepHandlers/useOpponentFlinched';
import { useOpponentIntro } from './StepHandlers/useOpponentIntro';
import { useOpponentMissed } from './StepHandlers/useOpponentMissed';
import { useOpponentMoveSelection } from './StepHandlers/useOpponentMoveSelection';
import { useOpponentUnableToAttack } from './StepHandlers/useOpponentUnableToAttack';
import { usePlayerChargeUp } from './StepHandlers/usePlayerChargeUp';
import { usePlayerCureAilments } from './StepHandlers/usePlayerCureAilments';
import { usePlayerEmerge } from './StepHandlers/usePlayerEmerge';
import { usePlayerFainting } from './StepHandlers/usePlayerFainting';
import { usePlayerFlinched } from './StepHandlers/usePlayerFlinched';
import { usePlayerIntro } from './StepHandlers/usePlayerIntro';
import { usePlayerMissed } from './StepHandlers/usePlayerMissed';
import { usePlayerUnableToAttack } from './StepHandlers/usePlayerUnableToAttack';

interface UseBattleStepsProps {
	initSaveFile: SaveFile;
	syncAfterBattleEnd: (update: SaveFile) => void;
	goBack: () => void;
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
	nextPlayerMove: BattleAction | undefined;
	nextOpponentMove: BattleAction | undefined;
	setNextOpponentMove: (x: BattleAction | undefined) => void;
	setNextPlayerMove: (x: BattleAction | undefined) => void;
	chargedUpPlayerMove: BattleAttack | undefined;
	chargedUpOpponentMove: BattleAttack | undefined;
	setChargedUpOpponentMove: (x: BattleAttack | undefined) => void;
	setChargedUpPlayerMove: (x: BattleAttack | undefined) => void;
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
	syncAfterBattleEnd,
	goBack,
	opponent,
	player,
	setOpponent,
	setPlayer,
	dispatchToast,
}: UseBattleStepsProps): {
	battleStep: BattleStep;
	initBattle: () => void;
	setNextPlayerMove: (x: BattleAction | undefined) => void;
	nextMove: BattleAction | undefined;
	battleWeather: WeatherType | undefined;
	usedItems: Inventory;
	battleRound: number;
} => {
	const [battleStep, setBattleStep] = useState<BattleStep>('UNITIALIZED');
	const [battleWeather, setBattleWeather] = useState<WeatherType | undefined>();
	const [battleRound, setBattleRound] = useState<number>(0);
	const [usedItems, setUsedItems] = useState<Inventory>(EmptyInventory);
	const [coins, setCoins] = useState<number>(0);
	const [caughtPokemon, setCaughtPokemon] = useState<CatchProcessInfo[]>([]);
	const [nextPlayerMove, setNextPlayerMove] = useState<
		BattleAction | undefined
	>();
	const [nextOpponentMove, setNextOpponentMove] = useState<
		BattleAction | undefined
	>();
	const [chargedUpPlayerMove, setChargedUpPlayerMove] = useState<
		BattleAttack | undefined
	>();
	const [chargedUpOpponentMove, setChargedUpOpponentMove] = useState<
		BattleAttack | undefined
	>();
	const [beginsThisTurn, setBeginsThisTurn] = useState<string | undefined>();

	useEffect(() => {
		console.log(battleStep);
		if (battleStep === 'MOVE_HANDLING') {
			setBattleRound((battleRound) => battleRound + 1);
		}
	}, [battleStep]);

	const nextMove = useMemo(() => {
		if (
			battleStep === 'EXECUTE_OPPONENT_MOVE' ||
			battleStep === 'OPPONENT_CHARGE_UP'
		) {
			return nextOpponentMove;
		}
		if (
			battleStep === 'EXECUTE_PLAYER_MOVE' ||
			battleStep === 'CATCHING_PROCESS_1' ||
			battleStep === 'CATCHING_PROCESS_2' ||
			battleStep === 'CATCHING_PROCESS_3' ||
			battleStep === 'CATCHING_PROCESS_4' ||
			battleStep === 'CATCHING_SUCCESS' ||
			battleStep === 'CATCHING_FAILURE' ||
			battleStep === 'PLAYER_CHARGE_UP'
		) {
			return nextPlayerMove;
		}

		return undefined;
	}, [battleStep, nextOpponentMove, nextPlayerMove]);

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
			chargedUpOpponentMove,
			chargedUpPlayerMove,
			setChargedUpOpponentMove,
			setChargedUpPlayerMove,
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
			nextOpponentMove,
			nextPlayerMove,
			setOpponent,
			setPlayer,
			setNextOpponentMove,
			setNextPlayerMove,
			battleWeather,
			setCaughtPokemon,
			caughtPokemon,
			setUsedItems,
			setCoins,
		}),
		[
			chargedUpOpponentMove,
			chargedUpPlayerMove,
			battleRound,
			startPath,
			followTurnPath,
			followBattleStepPath,
			battleStep,
			player,
			opponent,
			dispatchToast,
			nextOpponentMove,
			nextPlayerMove,
			setOpponent,
			setPlayer,
			battleWeather,
			caughtPokemon,
		]
	);

	useOpponentIntro(battleStep, () => followBattleStepPath(introPath));
	usePlayerIntro(battleStep, () => followBattleStepPath(introPath));
	useOpponentEmerge(extendedPayload);
	usePlayerEmerge(extendedPayload);
	useHandlePlayerEndOfTurnAbility(extendedPayload);
	useMoveSelection(extendedPayload);
	useHandleOpponentEndOfTurnAbility(extendedPayload);
	useOpponentMoveSelection(extendedPayload);
	useMoveHandling(extendedPayload);
	usePlayerCureAilments(extendedPayload);
	useOpponentCureAilments(extendedPayload);
	usePlayerChargeUp(extendedPayload);
	useOpponentChargeUp(extendedPayload);
	useExecutePlayerMove({
		...extendedPayload,
		setBattleStep: protectedSetBattleStep,
	});
	useExecuteOpponentMove({
		...extendedPayload,
		setBattleStep: protectedSetBattleStep,
	});
	useOpponentFlinched(extendedPayload);
	usePlayerFlinched(extendedPayload);
	useOpponentMissed(extendedPayload);
	usePlayerMissed(extendedPayload);
	useOpponentUnableToAttack(extendedPayload);
	usePlayerUnableToAttack(extendedPayload);
	useCatchingSteps({ ...extendedPayload, opponentHasBeenCaughtBefore });
	useHandleOpponentEndOfTurnDamage(extendedPayload);
	useHandlePlayerEndOfTurnDamage(extendedPayload);
	useOpponentFainting({ battleStep, followBattleStepPath });
	usePlayerFainting({ battleStep, followBattleStepPath });
	useBattleEnd({
		battleStep,
		caughtPokemon,
		coins,
		usedItems,
		initSaveFile,
		syncAfterBattleEnd,
		goBack,
		player,
	});

	const initBattle = () => {
		followBattleStepPath(introPath);
	};

	return {
		nextMove,
		battleStep,
		initBattle,
		setNextPlayerMove,
		battleWeather,
		usedItems,
		battleRound,
	};
};
