import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { SELF_DESTRUCTING_MOVES } from '../../../../../constants/selfDestructingMoves';
import { applyAttackToPokemon } from '../../../../../functions/applyAttackToPokemon';
import { applyCrashDamage } from '../../../../../functions/applyCrashDamage';
import { applyItemToPokemon } from '../../../../../functions/applyItemToPokemon';
import { determineCrit } from '../../../../../functions/determineCrit';
import { determineMiss } from '../../../../../functions/determineMiss';
import { isKO } from '../../../../../functions/isKo';
import { pokemonCantMove } from '../../../../../functions/pokemonCantMove';
import { reduceMovePP } from '../../../../../functions/reduceMovePP';
import { targetFlinched } from '../../../../../functions/targetFlinched';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { joinInventories } from '../../../../../interfaces/Inventory';
import {
	BattleStep,
	catchingPath,
	opponentFaintingPath,
	playerFaintingPath,
} from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const useExecutePlayerMove = ({
	battleStep,
	player,
	opponent,
	nextPlayerMove,
	setPlayer,
	setNextPlayerMove,
	setBattleStep,
	setOpponent,
	battleWeather,
	dispatchToast,
	setCoins,
	followBattleStepPath,
	startPath,
	followTurnPath,
	chargedUpPlayerMove,
	setUsedItems,
	getWhirlwinded,
	chargedUpOpponentMove,
}: ExtendedBattleStepHandler & {
	setBattleStep: (x: BattleStep) => void;
	getWhirlwinded: () => void;
}) => {
	useEffect(() => {
		if (battleStep !== 'EXECUTE_PLAYER_MOVE' || !player) {
			return;
		}
		if (chargedUpPlayerMove) {
			followTurnPath();
		}
		if (pokemonCantMove(player)) {
			setBattleStep('PLAYER_UNABLE_TO_ATTACK');
			setNextPlayerMove(undefined);
			return;
		}

		const t = setTimeout(() => {
			if (!player || !opponent) {
				throw new Error('no player or opponent');
				return;
			}
			if (nextPlayerMove?.type === 'CatchProcessInfo') {
				followBattleStepPath(catchingPath);
				return;
			}
			if (nextPlayerMove?.type === 'InBattleItem') {
				setNextPlayerMove(undefined);
				setUsedItems((i) => joinInventories(i, { [nextPlayerMove.item]: 1 }));
				setPlayer(
					applyItemToPokemon(player, nextPlayerMove.item, dispatchToast)
				);
				followTurnPath();
				return;
			}
			if (
				nextPlayerMove?.type === 'BattleAttack' &&
				nextPlayerMove.name === 'whirlwind'
			) {
				getWhirlwinded();
			}

			if (nextPlayerMove?.type === 'BattleAttack') {
				if (nextPlayerMove.name === 'pay-day') {
					const scatteredCoins = Math.floor(Math.random() * 100);
					setCoins((coins) => coins + scatteredCoins);
					dispatchToast('coins scattered everywhere');
				}
				if (
					(SELF_DESTRUCTING_MOVES.includes(nextPlayerMove.name) &&
						opponent.ability === 'damp') ||
					player.ability === 'damp'
				) {
					dispatchToast(
						`${
							opponent.ability === 'damp'
								? opponent.data.name
								: player.data.name
						} prevents self destruct moves with damp`
					);
					setNextPlayerMove(undefined);

					followTurnPath();
					return;
				}
				const targetIsFlying = chargedUpOpponentMove?.name === 'fly';
				const miss = determineMiss(
					nextPlayerMove,
					player,
					opponent,
					battleWeather,
					targetIsFlying
				);
				if (miss) {
					let pla = reduceMovePP(player, nextPlayerMove.name);
					pla = applyCrashDamage(player, nextPlayerMove.name, dispatchToast);
					if (isKO(pla)) {
						startPath(playerFaintingPath);
						setNextPlayerMove(undefined);
						return;
					}

					setPlayer(pla);
					setNextPlayerMove(undefined);
					setBattleStep('PLAYER_MISSED');
					return;
				}
				const { updatedTarget, updatedAttacker } = applyAttackToPokemon({
					attack: nextPlayerMove,
					attacker: player,
					target: opponent,
					setAttacker: setPlayer,
					setTarget: setOpponent,
					weather: battleWeather,
					dispatchToast,
					targetIsFlying,
				});

				const updatedMove: BattleAttack | undefined =
					(nextPlayerMove?.multiHits ?? 0) > 1
						? {
								...nextPlayerMove,
								crit: determineCrit(
									nextPlayerMove.name,
									nextPlayerMove.data.meta.crit_rate,
									opponent.ability
								),
								multiHits: (nextPlayerMove?.multiHits ?? 0) - 1,
						  }
						: undefined;
				if (isKO(updatedAttacker)) {
					startPath(playerFaintingPath);
					return;
				}
				if (isKO(updatedTarget)) {
					startPath(opponentFaintingPath);
					setNextPlayerMove(undefined);
					return;
				}

				if (updatedMove) {
					setNextPlayerMove(updatedMove);
					setBattleStep('EXECUTE_PLAYER_MOVE');
					return;
				}
				if (targetFlinched(player, opponent, nextPlayerMove)) {
					setNextPlayerMove(undefined);
					setBattleStep('OPPONENT_FLINCHED');
					return;
				}
				setNextPlayerMove(undefined);
				followTurnPath();
			}
		}, animationTimer);

		return () => clearTimeout(t);
	}, [
		battleStep,
		battleWeather,
		chargedUpOpponentMove?.name,
		chargedUpPlayerMove,
		dispatchToast,
		followBattleStepPath,
		followTurnPath,
		getWhirlwinded,
		nextPlayerMove,
		opponent,
		player,
		setBattleStep,
		setCoins,
		setNextPlayerMove,
		setOpponent,
		setPlayer,
		setUsedItems,
		startPath,
	]);
};
