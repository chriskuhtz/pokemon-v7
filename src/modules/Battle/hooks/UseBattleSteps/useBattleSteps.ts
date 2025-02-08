import { useEffect, useMemo, useState } from 'react';
import { animationTimer } from '../../../../constants/gameData';
import { WeatherType } from '../../../../functions/determineWeatherFactor';
import { receiveNewPokemonFunction } from '../../../../functions/receiveNewPokemonFunction';
import { reduceBattlePokemonToOwnedPokemon } from '../../../../functions/reduceBattlePokemonToOwnedPokemon';
import { AddToastFunction } from '../../../../hooks/useToasts';
import { BattleAttack } from '../../../../interfaces/BattleAttack';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import {
	EmptyInventory,
	Inventory,
	joinInventories,
} from '../../../../interfaces/Inventory';
import { PokeballType } from '../../../../interfaces/Item';
import { SaveFile } from '../../../../interfaces/SaveFile';
import { BattleStep } from '../../types/BattleStep';
import { useCatchingSteps } from './StepHandlers/useCatchingSteps';
import { useExecuteOpponentMove } from './StepHandlers/useExecuteOpponentMove';
import { useExecutePlayerMove } from './StepHandlers/useExecutePlayerMove';
import { useHandleOpponentAbility } from './StepHandlers/useHandleOpponentAbility';
import { useHandlePlayerAbility } from './StepHandlers/useHandlePlayerAbility';
import { useMoveHandling } from './StepHandlers/useMoveHandling';
import { useMoveSelection } from './StepHandlers/useMoveSelection';
import { useOpponentEmerge } from './StepHandlers/useOpponentEmerge';
import { useOpponentFlinched } from './StepHandlers/useOpponentFlinched';
import { useOpponentIntro } from './StepHandlers/useOpponentIntro';
import { useOpponentMissed } from './StepHandlers/useOpponentMissed';
import { useOpponentMoveSelection } from './StepHandlers/useOpponentMoveSelection';
import { usePlayerEmerge } from './StepHandlers/usePlayerEmerge';
import { usePlayerFlinched } from './StepHandlers/usePlayerFlinched';
import { usePlayerIntro } from './StepHandlers/usePlayerIntro';
import { usePlayerMissed } from './StepHandlers/usePlayerMissed';

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
} => {
	const [battleStep, setBattleStep] = useState<BattleStep>('UNITIALIZED');
	useEffect(() => console.log(battleStep), [battleStep]);
	const [battleWeather, setBattleWeather] = useState<WeatherType | undefined>(
		undefined
	);
	const [usedItems, setUsedItems] = useState<Inventory>(EmptyInventory);
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
	useExecutePlayerMove(extendedPayload);
	useExecuteOpponentMove(extendedPayload);
	useOpponentFlinched(extendedPayload);
	usePlayerFlinched(extendedPayload);
	useOpponentMissed(extendedPayload);
	usePlayerMissed(extendedPayload);
	useCatchingSteps(extendedPayload);
	// 'OPPONENT_FAINTING' to 'BATTLE_WON'
	useEffect(() => {
		if (battleStep !== 'OPPONENT_FAINTING') {
			return;
		}
		const t = setTimeout(() => setBattleStep('BATTLE_WON'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	// 'PLAYER_FAINTING' to 'BATTLE_LOST'
	useEffect(() => {
		if (battleStep !== 'PLAYER_FAINTING') {
			return;
		}
		const t = setTimeout(() => setBattleStep('BATTLE_LOST'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	// handle 'BATTLE_WON'
	useEffect(() => {
		if (battleStep !== 'BATTLE_WON') {
			return;
		}
		const t = setTimeout(() => {
			let updatedPokemon = [...initSaveFile.pokemon];

			caughtPokemon.forEach(({ pokemon, ball }) => {
				updatedPokemon = receiveNewPokemonFunction(
					reduceBattlePokemonToOwnedPokemon({
						...pokemon,
						ownerId: initSaveFile.playerId,
						ball,
					}),
					updatedPokemon
				);
			});
			const newSaveFile: SaveFile = {
				...initSaveFile,
				inventory: joinInventories(initSaveFile.inventory, usedItems, true),
				pokemon: updatedPokemon,
			};
			syncAfterBattleEnd(newSaveFile);
			goBack();
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		caughtPokemon,
		goBack,
		initSaveFile,
		setBattleStep,
		syncAfterBattleEnd,
		usedItems,
	]);
	// handle "BATTLE_LOST"
	useEffect(() => {
		if (battleStep !== 'BATTLE_LOST') {
			return;
		}
		const t = setTimeout(() => {
			let updatedPokemon = [...initSaveFile.pokemon];

			caughtPokemon.forEach(({ pokemon, ball }) => {
				updatedPokemon = receiveNewPokemonFunction(
					reduceBattlePokemonToOwnedPokemon({
						...pokemon,
						ownerId: initSaveFile.playerId,
						ball,
					}),
					updatedPokemon
				);
			});

			const newSaveFile: SaveFile = {
				...initSaveFile,
				inventory: joinInventories(initSaveFile.inventory, usedItems, true),
				pokemon: updatedPokemon,
			};
			syncAfterBattleEnd(newSaveFile);
			goBack();
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		caughtPokemon,
		goBack,
		initSaveFile,
		setBattleStep,
		syncAfterBattleEnd,
		usedItems,
	]);

	const initBattle = () => {
		setBattleStep('OPPONENT_INTRO');
	};

	return {
		nextMove,
		battleStep,
		initBattle,
		setNextPlayerMove,
		battleWeather,
	};
};
