import { useEffect, useMemo, useState } from 'react';
import { AddToastFunction } from '../../../../hooks/useToasts';
import { BattleAttack } from '../../../../interfaces/BattleAttack';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { EmptyInventory, Inventory } from '../../../../interfaces/Inventory';
import { PokeballType } from '../../../../interfaces/Item';
import { SaveFile } from '../../../../interfaces/SaveFile';
import { BattleStep } from '../../types/BattleStep';
import { useBattleEnd } from './StepHandlers/useBattleEnd';
import { useCatchingSteps } from './StepHandlers/useCatchingSteps';
import { useExecuteOpponentMove } from './StepHandlers/useExecuteOpponentMove';
import { useExecutePlayerMove } from './StepHandlers/useExecutePlayerMove';
import { useHandleOpponentAbility } from './StepHandlers/useHandleOpponentAbility';
import { useHandleOpponentEndOfTurnDamage } from './StepHandlers/useHandleOpponentEndOfTurnDamage';
import { useHandlePlayerAbility } from './StepHandlers/useHandlePlayerAbility';
import { useHandlePlayerEndOfTurnDamage } from './StepHandlers/useHandlePlayerEndOfTurnDamage';
import { useMoveHandling } from './StepHandlers/useMoveHandling';
import { useMoveSelection } from './StepHandlers/useMoveSelection';
import { useOpponentCureAilments } from './StepHandlers/useOpponentCureAilments';
import { useOpponentEmerge } from './StepHandlers/useOpponentEmerge';
import { useOpponentFainting } from './StepHandlers/useOpponentFainting';
import { useOpponentFlinched } from './StepHandlers/useOpponentFlinched';
import { useOpponentIntro } from './StepHandlers/useOpponentIntro';
import { useOpponentMissed } from './StepHandlers/useOpponentMissed';
import { useOpponentMoveSelection } from './StepHandlers/useOpponentMoveSelection';
import { useOpponentUnableToAttack } from './StepHandlers/useOpponentUnableToAttack';
import { usePlayerCureAilments } from './StepHandlers/usePlayerCureAilments';
import { usePlayerEmerge } from './StepHandlers/usePlayerEmerge';
import { usePlayerFainting } from './StepHandlers/usePlayerFainting';
import { usePlayerFlinched } from './StepHandlers/usePlayerFlinched';
import { usePlayerIntro } from './StepHandlers/usePlayerIntro';
import { usePlayerMissed } from './StepHandlers/usePlayerMissed';
import { usePlayerUnableToAttack } from './StepHandlers/usePlayerUnableToAttack';
import { WeatherType } from '../../../../interfaces/Weather';

export interface CatchProcessInfo {
	pokemon: BattlePokemon;
	ball: PokeballType;
	type: 'CatchProcessInfo';
}

export type BattleAction = CatchProcessInfo | BattleAttack;

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
	setBattleStep: (x: BattleStep) => void;
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
	setNextOpponentMove: (x: BattleAttack | undefined) => void;
	setNextPlayerMove: (x: BattleAction | undefined) => void;
	setCaughtPokemon: React.Dispatch<React.SetStateAction<CatchProcessInfo[]>>;
	setUsedItems: React.Dispatch<React.SetStateAction<Inventory>>;
	setCoins: React.Dispatch<React.SetStateAction<number>>;
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
} => {
	const [battleStep, setBattleStep] = useState<BattleStep>('UNITIALIZED');
	useEffect(() => console.log(battleStep), [battleStep]);
	const [battleWeather, setBattleWeather] = useState<WeatherType | undefined>(
		undefined
	);
	const [usedItems, setUsedItems] = useState<Inventory>(EmptyInventory);
	const [coins, setCoins] = useState<number>(0);
	const [caughtPokemon, setCaughtPokemon] = useState<CatchProcessInfo[]>([]);
	const [nextPlayerMove, setNextPlayerMove] = useState<
		BattleAction | undefined
	>();
	const [nextOpponentMove, setNextOpponentMove] = useState<
		BattleAttack | undefined
	>();

	const nextMove = useMemo(() => {
		if (battleStep === 'EXECUTE_OPPONENT_MOVE') {
			return nextOpponentMove;
		}
		if (
			battleStep === 'EXECUTE_PLAYER_MOVE' ||
			battleStep === 'CATCHING_PROCESS_1' ||
			battleStep === 'CATCHING_PROCESS_2' ||
			battleStep === 'CATCHING_PROCESS_3' ||
			battleStep === 'CATCHING_PROCESS_4' ||
			battleStep === 'CATCHING_SUCCESS' ||
			battleStep === 'CATCHING_FAILURE'
		) {
			return nextPlayerMove;
		}

		return undefined;
	}, [battleStep, nextOpponentMove, nextPlayerMove]);

	const extendedPayload: ExtendedBattleStepHandler = useMemo(
		() => ({
			battleStep,
			setBattleStep,
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

	useOpponentIntro({ battleStep, setBattleStep });
	usePlayerIntro({ battleStep, setBattleStep });
	useOpponentEmerge(extendedPayload);
	usePlayerEmerge(extendedPayload);
	useHandlePlayerAbility(extendedPayload);
	useMoveSelection(extendedPayload);
	useHandleOpponentAbility(extendedPayload);
	useOpponentMoveSelection(extendedPayload);
	useMoveHandling(extendedPayload);
	usePlayerCureAilments(extendedPayload);
	useOpponentCureAilments(extendedPayload);
	useExecutePlayerMove(extendedPayload);
	useExecuteOpponentMove(extendedPayload);
	useOpponentFlinched(extendedPayload);
	usePlayerFlinched(extendedPayload);
	useOpponentMissed(extendedPayload);
	usePlayerMissed(extendedPayload);
	useOpponentUnableToAttack(extendedPayload);
	usePlayerUnableToAttack(extendedPayload);
	useCatchingSteps(extendedPayload);
	useHandleOpponentEndOfTurnDamage(extendedPayload);
	useHandlePlayerEndOfTurnDamage(extendedPayload);
	useOpponentFainting({ battleStep, setBattleStep });
	usePlayerFainting({ battleStep, setBattleStep });
	useBattleEnd({
		battleStep,
		caughtPokemon,
		coins,
		usedItems,
		initSaveFile,
		syncAfterBattleEnd,
		goBack,
	});

	const initBattle = () => {
		setBattleStep('OPPONENT_INTRO');
	};

	return {
		nextMove,
		battleStep,
		initBattle,
		setNextPlayerMove,
		battleWeather,
		usedItems,
	};
};
