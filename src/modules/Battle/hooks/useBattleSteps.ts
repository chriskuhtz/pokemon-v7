import { useEffect, useMemo, useState } from 'react';
import { animationTimer } from '../../../constants/gameData';
import { applyAttackToPokemon } from '../../../functions/applyAttackToPokemon';
import { WeatherType } from '../../../functions/calculateDamage';
import { determineCatchRate } from '../../../functions/determineCatchRate';
import { determineCrit } from '../../../functions/determineCrit';
import { determineMiss } from '../../../functions/determineHitOrMiss';
import { determineMultiHits } from '../../../functions/determineMultiHits';
import { determineWeather } from '../../../functions/determineWeather';
import { isKO } from '../../../functions/isKo';
import { receiveNewPokemonFunction } from '../../../functions/receiveNewPokemonFunction';
import { recommendMove } from '../../../functions/recommendMove';
import { reduceBattlePokemonToOwnedPokemon } from '../../../functions/reduceBattlePokemonToOwnedPokemon';
import { reduceMovePP } from '../../../functions/reduceMovePP';
import { targetFlinched } from '../../../functions/targetFlinched';
import { BattleAttack } from '../../../interfaces/BattleAttack';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import {
	EmptyInventory,
	Inventory,
	joinInventories,
} from '../../../interfaces/Inventory';
import { PokeballType } from '../../../interfaces/Item';
import { SaveFile } from '../../../interfaces/SaveFile';
import { BattleStep } from '../types/BattleStep';

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
}

export const useBattleSteps = ({
	initSaveFile,
	syncAfterBattleEnd,
	goBack,
	opponent,
	player,
	setOpponent,
	setPlayer,
}: UseBattleStepsProps): {
	battleStep: BattleStep;
	initBattle: () => void;
	setNextPlayerMove: (x: BattleAction | undefined) => void;
	nextMove: BattleAction | undefined;
	battleWeather: WeatherType | undefined;
} => {
	const [battleStep, setBattleStep] = useState<BattleStep>('UNITIALIZED');
	//useEffect(() => console.log(battleStep), [battleStep]);
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

	//'OPPONENT_INTRO' to 'PLAYER_INTRO'
	useEffect(() => {
		if (battleStep !== 'OPPONENT_INTRO') {
			return;
		}

		const t = setTimeout(() => setBattleStep('PLAYER_INTRO'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	//'PLAYER_INTRO' to 'OPPONENT_EMERGE'
	useEffect(() => {
		if (battleStep !== 'PLAYER_INTRO') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('OPPONENT_EMERGE');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, player, setBattleStep]);
	//'OPPONENT_EMERGE' to 'PLAYER_EMERGE'
	useEffect(() => {
		if (battleStep !== 'OPPONENT_EMERGE' || !opponent) {
			return;
		}
		const t = setTimeout(() => {
			setBattleWeather(determineWeather(opponent));
			setBattleStep('PLAYER_EMERGE');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, opponent, setBattleStep]);
	//'PLAYER_EMERGE' to 'MOVE_SELECTION'
	useEffect(() => {
		if (battleStep !== 'PLAYER_EMERGE' || !player) {
			return;
		}
		const t = setTimeout(() => {
			setBattleWeather(determineWeather(player));
			setBattleStep('MOVE_SELECTION');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, player, setBattleStep]);
	//MOVE_SELECTION to "OPPONENT_MOVE_SELECTION"
	useEffect(() => {
		if (battleStep === 'MOVE_SELECTION' && nextPlayerMove) {
			setBattleStep('OPPONENT_MOVE_SELECTION');
		}
	}, [battleStep, nextOpponentMove, nextPlayerMove]);
	//"OPPONENT_MOVE_SELECTION" to "MOVE_HANDLING"
	useEffect(() => {
		if (
			battleStep === 'OPPONENT_MOVE_SELECTION' &&
			!nextOpponentMove &&
			opponent &&
			player
		) {
			const chosenMove = recommendMove(opponent, player, battleWeather);
			setNextOpponentMove({
				...chosenMove,
				crit: determineCrit(chosenMove.data.meta.crit_rate),
				multiHits: determineMultiHits(chosenMove),
				miss: determineMiss(chosenMove),
			});
			setBattleStep('MOVE_HANDLING');
		}
	}, [battleStep, battleWeather, nextOpponentMove, opponent, player]);
	//"MOVE_HANDLING" to "EXECUTE_PLAYER_MOVE"
	useEffect(() => {
		if (battleStep === 'MOVE_HANDLING') {
			if (!opponent || !player || !nextOpponentMove || !nextPlayerMove) {
				setBattleStep('ERROR');
				return;
			}
			setBattleStep('EXECUTE_PLAYER_MOVE');
		}
	}, [battleStep, nextOpponentMove, nextPlayerMove, opponent, player]);
	//"EXECUTE_PLAYER_MOVE"
	useEffect(() => {
		if (battleStep !== 'EXECUTE_PLAYER_MOVE') {
			return;
		}

		const t = setTimeout(() => {
			if (!player || !opponent) {
				setBattleStep('ERROR');
				return;
			}
			if (nextPlayerMove?.type === 'CatchProcessInfo') {
				setBattleStep('CATCHING_PROCESS_1');
				return;
			}
			if (nextPlayerMove?.type === 'BattleAttack') {
				if (nextPlayerMove.miss) {
					setPlayer(reduceMovePP(player, nextPlayerMove.name));
					setNextPlayerMove(undefined);
					setBattleStep('PLAYER_MISSED');
					return;
				}
				const { updatedTarget } = applyAttackToPokemon({
					attack: nextPlayerMove,
					attacker: player,
					target: opponent,
					setAttacker: setPlayer,
					setTarget: setOpponent,
					weather: battleWeather,
				});

				const updatedMove: BattleAttack | undefined =
					(nextPlayerMove?.multiHits ?? 0) > 1
						? {
								...nextPlayerMove,
								crit: determineCrit(nextPlayerMove.data.meta.crit_rate),
								multiHits: (nextPlayerMove?.multiHits ?? 0) - 1,
						  }
						: undefined;

				if (isKO(updatedTarget)) {
					setBattleStep('OPPONENT_FAINTING');
					setNextPlayerMove(undefined);
					return;
				}
				if (updatedMove) {
					setNextPlayerMove(updatedMove);
					console.log('multi hit');
					setBattleStep('EXECUTE_PLAYER_MOVE');
					return;
				}
				if (targetFlinched(player, opponent, nextPlayerMove)) {
					setNextPlayerMove(undefined);
					setBattleStep('OPPONENT_FLINCHED');
					return;
				}
				setNextPlayerMove(undefined);
				setBattleStep('EXECUTE_OPPONENT_MOVE');
			}
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		battleWeather,
		nextPlayerMove,
		opponent,
		player,
		setOpponent,
		setPlayer,
	]);
	//"EXECUTE_OPPONENT_MOVE"
	useEffect(() => {
		if (battleStep !== 'EXECUTE_OPPONENT_MOVE') {
			return;
		}

		const t = setTimeout(() => {
			if (!player || !opponent) {
				setBattleStep('ERROR');
				return;
			}

			if (nextOpponentMove?.type === 'BattleAttack') {
				if (nextOpponentMove.miss) {
					setOpponent(reduceMovePP(opponent, nextOpponentMove.name));
					setNextPlayerMove(undefined);
					setBattleStep('OPPONENT_MISSED');
					return;
				}
				const { updatedTarget } = applyAttackToPokemon({
					attack: nextOpponentMove,
					target: player,
					attacker: opponent,
					setAttacker: setOpponent,
					setTarget: setPlayer,
					weather: battleWeather,
				});
				const updatedMove: BattleAttack | undefined =
					(nextOpponentMove?.multiHits ?? 0) > 1
						? {
								...nextOpponentMove,
								crit: determineCrit(nextOpponentMove.data.meta.crit_rate),
								multiHits: (nextOpponentMove.multiHits ?? 0) - 1,
						  }
						: undefined;

				if (isKO(updatedTarget)) {
					setBattleStep('PLAYER_FAINTING');
					setNextOpponentMove(undefined);
					return;
				}
				if (updatedMove) {
					setNextOpponentMove(updatedMove);
					console.log('multi hit');
					setBattleStep('EXECUTE_OPPONENT_MOVE');
					return;
				}
				if (targetFlinched(opponent, player, nextOpponentMove)) {
					setNextOpponentMove(undefined);
					setBattleStep('PLAYER_FLINCHED');
					return;
				}
				setNextOpponentMove(undefined);
				setBattleStep('MOVE_SELECTION');
			}
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		battleWeather,
		nextOpponentMove,
		nextPlayerMove,
		opponent,
		player,
		setOpponent,
		setPlayer,
	]);
	//"OPPONENT_FLINCHED"
	useEffect(() => {
		if (battleStep !== 'OPPONENT_FLINCHED') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('MOVE_SELECTION');
			setNextOpponentMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	//"PLAYER_FLINCHED"
	useEffect(() => {
		if (battleStep !== 'PLAYER_FLINCHED') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('MOVE_SELECTION');
			setNextOpponentMove(undefined);
			setNextPlayerMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	//"OPPONENT_MISSED"
	useEffect(() => {
		if (battleStep !== 'OPPONENT_MISSED') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('MOVE_SELECTION');
			setNextOpponentMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	//"PLAYER_MISSED"
	useEffect(() => {
		if (battleStep !== 'PLAYER_MISSED') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('EXECUTE_OPPONENT_MOVE');
			setNextPlayerMove(undefined);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	//'CATCHING_PROCESS_1' to 'CATCHING_PROCESS_2'
	useEffect(() => {
		if (battleStep !== 'CATCHING_PROCESS_1') {
			return;
		}
		const t = setTimeout(() => {
			setBattleStep('CATCHING_PROCESS_2');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	//'CATCHING_PROCESS_2' to 'CATCHING_PROCESS_3'
	useEffect(() => {
		if (
			battleStep !== 'CATCHING_PROCESS_2' ||
			nextMove?.type !== 'CatchProcessInfo' ||
			!opponent
		) {
			return;
		}
		const t = setTimeout(() => {
			const catchRate = determineCatchRate(
				nextMove.ball,
				opponent,
				1,
				'STANDARD',
				false
			);
			if (catchRate < Math.random()) {
				setBattleStep('CATCHING_FAILURE');
			} else setBattleStep('CATCHING_PROCESS_3');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextMove, opponent, setBattleStep]);
	//'CATCHING_PROCESS_3' to 'CATCHING_PROCESS_4'
	useEffect(() => {
		if (
			battleStep !== 'CATCHING_PROCESS_3' ||
			nextMove?.type !== 'CatchProcessInfo' ||
			!opponent
		) {
			return;
		}
		const t = setTimeout(() => {
			const catchRate = determineCatchRate(
				nextMove.ball,
				opponent,
				1,
				'STANDARD',
				false
			);
			if (catchRate < Math.random()) {
				setBattleStep('CATCHING_FAILURE');
			} else setBattleStep('CATCHING_PROCESS_4');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextMove, opponent, setBattleStep]);
	//'CATCHING_PROCESS_4' to 'CATCHING_SUCCESS' or 'CATCHING_FAILURE'
	useEffect(() => {
		if (
			battleStep !== 'CATCHING_PROCESS_4' ||
			nextMove?.type !== 'CatchProcessInfo' ||
			!opponent
		) {
			return;
		}
		const t = setTimeout(() => {
			const catchRate = determineCatchRate(
				nextMove.ball,
				opponent,
				1,
				'STANDARD',
				false
			);

			if (catchRate < Math.random()) {
				setBattleStep('CATCHING_FAILURE');
			} else {
				setCaughtPokemon((x) => [
					...x,
					{
						pokemon: opponent,
						ball: nextMove.ball,
						type: 'CatchProcessInfo',
					},
				]);
				setBattleStep('CATCHING_SUCCESS');
			}
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextMove, opponent, setBattleStep]);
	// 'CATCHING_FAILURE' to 'EXECUTE_OPPONENT_MOVE'
	useEffect(() => {
		if (battleStep !== 'CATCHING_FAILURE') {
			return;
		}
		const t = setTimeout(() => {
			setNextPlayerMove(undefined);
			if (nextMove?.type === 'CatchProcessInfo') {
				setUsedItems((i) => joinInventories(i, { [nextMove.ball]: 1 }));
			}
			setBattleStep('EXECUTE_OPPONENT_MOVE');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextMove, setBattleStep]);
	// 'CATCHING_SUCCESS' to 'BATTLE_WON'
	useEffect(() => {
		if (battleStep !== 'CATCHING_SUCCESS') {
			return;
		}
		const t = setTimeout(() => {
			if (nextMove?.type === 'CatchProcessInfo') {
				setUsedItems((i) => joinInventories(i, { [nextMove.ball]: 1 }));
			}
			setBattleStep('BATTLE_WON');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, nextMove, setBattleStep]);
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
