import { animationTimer } from '../../../../../../constants/gameData';
import { SELF_DESTRUCTING_MOVES } from '../../../../../../constants/selfDestructingMoves';
import { applyAttackToPokemon } from '../../../../../../functions/applyAttackToPokemon';
import { applyCrashDamage } from '../../../../../../functions/applyCrashDamage';
import { applyItemToPokemon } from '../../../../../../functions/applyItemToPokemon';
import { determineCrit } from '../../../../../../functions/determineCrit';
import { determineMiss } from '../../../../../../functions/determineMiss';
import { isKO } from '../../../../../../functions/isKo';
import { pokemonCantMove } from '../../../../../../functions/pokemonCantMove';
import { reduceMovePP } from '../../../../../../functions/reduceMovePP';
import { targetFlinched } from '../../../../../../functions/targetFlinched';
import { AddToastFunction } from '../../../../../../hooks/useToasts';
import {
	BattleAction,
	BattleAttack,
} from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import {
	Inventory,
	joinInventories,
} from '../../../../../../interfaces/Inventory';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleStep, catchingPath } from '../../../../types/BattleStep';

//TODO: charge up
export const executeMove = ({
	followTurnPath,
	setBattleStepUnableToAttack,
	attacker,
	target,
	followBattleStepPath,
	dispatchToast,
	setAttacker,
	setUsedItems,
	getWhirlwinded,
	setCoins,
	setTarget,
	startPath,
	battleWeather,
	setBattleStepFlinched,
	setBattleStepMissed,
	repeatBattleStepForMultiHit,
	attackerFaintingPath,
	targetFaintingPath,
	battleRound,
}: {
	followTurnPath: () => void;
	setBattleStepUnableToAttack: () => void;
	setBattleStepMissed: () => void;
	setBattleStepFlinched: () => void;
	repeatBattleStepForMultiHit: () => void;
	attacker: BattlePokemon;
	target: BattlePokemon;
	followBattleStepPath: (path: BattleStep[]) => void;
	dispatchToast: AddToastFunction;
	setUsedItems: React.Dispatch<React.SetStateAction<Inventory>>;
	setAttacker: (x: BattlePokemon) => void;
	setTarget: (x: BattlePokemon) => void;
	getWhirlwinded: () => void;
	setCoins: React.Dispatch<React.SetStateAction<number>>;
	startPath: (path: BattleStep[]) => void;
	battleWeather: WeatherType | undefined;
	attackerFaintingPath: BattleStep[];
	targetFaintingPath: BattleStep[];
	battleRound: number;
}) => {
	if (attacker.moveQueue.length === 0) {
		throw new Error('there is nothing to execute');
	}
	if (pokemonCantMove(attacker)) {
		setBattleStepUnableToAttack();
		return;
	}

	const t = setTimeout(() => {
		const nextAttackerMove = attacker.moveQueue[0];
		const nextTargetMove = target.moveQueue[0];
		const setNextAttackerMove = (newMove?: BattleAction) => {
			if (!newMove) {
				setAttacker({
					...attacker,
					moveQueue: [...attacker.moveQueue].filter(
						(m) => m.round !== battleRound
					),
				});
				return;
			} else
				setAttacker({
					...attacker,
					moveQueue: [
						newMove,
						...attacker.moveQueue.filter((m) => m.round !== battleRound),
					],
				});
		};

		if (nextAttackerMove?.type === 'CatchProcessInfo') {
			followBattleStepPath(catchingPath);
			return;
		}
		if (nextAttackerMove?.type === 'InBattleItem') {
			setNextAttackerMove(undefined);
			setUsedItems((i) => joinInventories(i, { [nextAttackerMove.item]: 1 }));
			setAttacker(
				applyItemToPokemon(attacker, nextAttackerMove.item, dispatchToast)
			);
			followTurnPath();
			return;
		}
		if (
			nextAttackerMove?.type === 'BattleAttack' &&
			nextAttackerMove.name === 'whirlwind'
		) {
			if (target.ability === 'suction-cups') {
				dispatchToast(`${target.data.name} holds on with suction-cups`);
				setNextAttackerMove(undefined);
				followTurnPath();
				return;
			}
			getWhirlwinded();
		}

		if (nextAttackerMove?.type === 'BattleAttack') {
			if (nextAttackerMove.name === 'pay-day') {
				const scatteredCoins = Math.floor(Math.random() * 100);
				setCoins((coins) => coins + scatteredCoins);
				dispatchToast('coins scattered everywhere');
			}
			if (
				(SELF_DESTRUCTING_MOVES.includes(nextAttackerMove.name) &&
					target.ability === 'damp') ||
				attacker.ability === 'damp'
			) {
				dispatchToast(
					`${
						target.ability === 'damp' ? target.data.name : attacker.data.name
					} prevents self destruct moves with damp`
				);
				setNextAttackerMove(undefined);

				followTurnPath();
				return;
			}
			const targetIsFlying =
				nextTargetMove.type === 'BattleAttack' &&
				nextTargetMove?.data.name === 'fly';

			const miss = determineMiss(
				nextAttackerMove,
				attacker,
				target,
				battleWeather,
				targetIsFlying
			);
			if (miss) {
				let pla = reduceMovePP(attacker, nextAttackerMove.name);
				pla = applyCrashDamage(attacker, nextAttackerMove.name, dispatchToast);

				setAttacker(pla);
				setNextAttackerMove(undefined);
				if (isKO(pla)) {
					startPath(attackerFaintingPath);
					return;
				}
				setBattleStepMissed();
				setNextAttackerMove(undefined);
				return;
			}
			const { updatedTarget, updatedAttacker } = applyAttackToPokemon({
				attack: nextAttackerMove,
				attacker,
				target,
				setAttacker,
				setTarget,
				weather: battleWeather,
				dispatchToast,
				targetIsFlying,
			});

			const moveWithReducedMultihits: BattleAttack | undefined =
				(nextAttackerMove?.multiHits ?? 0) > 1
					? {
							...nextAttackerMove,
							crit: determineCrit(
								nextAttackerMove.name,
								nextAttackerMove.data.meta.crit_rate,
								target.ability
							),
							multiHits: (nextAttackerMove?.multiHits ?? 0) - 1,
					  }
					: undefined;
			if (isKO(updatedAttacker)) {
				startPath(attackerFaintingPath);
				return;
			}
			if (isKO(updatedTarget)) {
				startPath(targetFaintingPath);
				setNextAttackerMove(undefined);
				return;
			}

			if (moveWithReducedMultihits) {
				setNextAttackerMove(moveWithReducedMultihits);
				repeatBattleStepForMultiHit();
				return;
			}
			if (targetFlinched(attacker, target, nextAttackerMove)) {
				setNextAttackerMove(undefined);
				setBattleStepFlinched();
				return;
			}
			setNextAttackerMove(undefined);
			followTurnPath();
		}
	}, animationTimer);

	return () => clearTimeout(t);
};
