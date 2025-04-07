import { lockInMoves } from '../../../../../../constants/forceSwitchMoves';
import { SELF_DESTRUCTING_MOVES } from '../../../../../../constants/selfDestructingMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../../functions/applyAttackAilmentsToPokemon';
import { applyAttackStatChanges } from '../../../../../../functions/applyAttackStatChanges';
import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { calculateDamage } from '../../../../../../functions/calculateDamage';
import { changeMovePP } from '../../../../../../functions/changeMovePP';
import { determineMiss } from '../../../../../../functions/determineMiss';
import { getActualTargetId } from '../../../../../../functions/getActualTargetId';
import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { getMiddleOfThree } from '../../../../../../functions/getMiddleOfThree';
import { getTypeNames } from '../../../../../../functions/getTypeNames';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { EmptyStatObject } from '../../../../../../interfaces/StatObject';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { handleDampy } from '../../../../functions/handleDampy';
import { handleMiss } from '../../../../functions/handleMiss';
import { handleMoveBlockAilments } from '../../../../functions/handleMoveBlockAilments';
import { handleNoTarget } from '../../../../functions/handleNoTarget';
import { handleAbilitiesAfterAttack } from '../handleAbilitiesAfterAttack';

export const handleAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	battleWeather,
	scatterCoins,
	dampy,
	addBattleFieldEffect,
	battleFieldEffects,
	setBattleWeather,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	setBattleWeather: (x: WeatherType) => void;
	scatterCoins: () => void;
	dampy?: { name: string };
	addBattleFieldEffect: (x: BattleFieldEffect) => void;
	battleFieldEffects: BattleFieldEffect[];
}): BattlePokemon[] => {
	let updatedPokemon: BattlePokemon[] = [...pokemon];
	const setPokemon = (input: BattlePokemon[]) => (updatedPokemon = input);

	const move = m;
	const underPressure = battleFieldEffects.some(
		(b) => b.type === 'pressure' && b.ownerId !== attacker.ownerId
	);
	//lock in moves choose a random target at execution
	const realTargetId = getActualTargetId({
		pokemon,
		attacker,
		move,
		addMessage,
	});
	const target = pokemon.find(
		(p) => p.id === realTargetId && p.status === 'ONFIELD'
	);

	let updatedAttacker = { ...attacker };

	const { canAttack, updatedAttacker: afterBlockers } = handleMoveBlockAilments(
		{
			attacker,
			attack: move,
			addMessage,
			targetId: realTargetId,
			battleFieldEffects,
		}
	);
	updatedAttacker = afterBlockers;

	if (!canAttack) {
		setPokemon(
			updatedPokemon.map((p) => {
				if (p.id === updatedAttacker.id) {
					return updatedAttacker;
				}
				return p;
			})
		);
		return updatedPokemon;
	}
	if (!target) {
		handleNoTarget(
			attacker,
			move,
			updatedPokemon,
			setPokemon,
			addMessage,
			underPressure
		);
		return updatedPokemon;
	}
	const selfTargeting = move.data.target.name === 'user';

	if (dampy && SELF_DESTRUCTING_MOVES.includes(move.name)) {
		handleDampy(
			attacker,
			move,
			pokemon,
			setPokemon,
			addMessage,
			dampy,
			underPressure
		);
		return updatedPokemon;
	}

	//MESSAGES
	if (!selfTargeting) {
		addMessage({
			message: `${attacker.data.name} used ${move.name} against ${target.data.name}`,
		});
	} else {
		addMessage({
			message: `${attacker.data.name} used ${move.name} `,
		});
	}

	//WEATHER MOVES
	if (move.name === 'sunny-day') {
		setBattleWeather('sun');
	}
	if (move.name === 'hail') {
		setBattleWeather('hail');
	}
	if (move.name === 'sandstorm') {
		setBattleWeather('sandstorm');
	}
	if (move.name === 'rain-dance') {
		setBattleWeather('rain');
	}

	if (move.name === 'spider-web') {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: target.ownerId,
			duration: 9000,
		});
		setPokemon(
			updatedPokemon.map((p) => {
				if (p.id === updatedAttacker.id) {
					return {
						...changeMovePP(updatedAttacker, move.name, -1),
						moveQueue: [],
					};
				}

				return p;
			})
		);
		return updatedPokemon;
	}
	if (move.name === 'haze') {
		addMessage({
			message: `${attacker.name} removed all stat changes with haze`,
		});
		setPokemon(
			updatedPokemon.map((p) => {
				if (p.id === updatedAttacker.id) {
					return {
						...changeMovePP(updatedAttacker, move.name, -1),
						moveQueue: [],
						statBoosts: EmptyStatObject,
					};
				}

				return { ...p, statBoosts: EmptyStatObject };
			})
		);
		return updatedPokemon;
	}

	if (move.name === 'bide') {
		if (!updatedAttacker.biding) {
			addMessage({ message: `${updatedAttacker.name} is biding its time` });
			updatedAttacker = { ...updatedAttacker, biding: { turn: 1, damage: 0 } };
		} else if (updatedAttacker.biding?.turn === 1) {
			addMessage({ message: `${updatedAttacker.name} is biding its time` });
			updatedAttacker = {
				...updatedAttacker,
				biding: { ...updatedAttacker.biding, turn: 2 },
			};
		} else if (updatedAttacker.biding?.turn === 2) {
			addMessage({ message: `${updatedAttacker.name} released energy` });
		}
	}

	if (move.name === 'defense-curl') {
		updatedAttacker.defenseCurled = true;
	}
	if (move.name === 'fury-cutter') {
		updatedAttacker.furyCutterStack =
			(updatedAttacker.furyCutterStack ?? 0) + 1;
	} else updatedAttacker.furyCutterStack = 0;

	//updated Target
	let updatedTarget = { ...target };

	const isFlying =
		updatedTarget.moveQueue.length > 0 &&
		updatedTarget.moveQueue[0].type === 'BattleAttack' &&
		updatedTarget.moveQueue[0].name === 'fly';
	const isUnderground =
		updatedTarget.moveQueue.length > 0 &&
		updatedTarget.moveQueue[0].type === 'BattleAttack' &&
		updatedTarget.moveQueue[0].name === 'dig';
	const { miss, reason } = determineMiss(
		move,
		attacker,
		target,
		battleWeather,
		isFlying,
		isUnderground
	);

	if (miss) {
		handleMiss(
			attacker,
			move,
			updatedPokemon,
			setPokemon,
			addMessage,
			underPressure,
			reason
		);
		return updatedPokemon;
	}

	if (
		move.name === 'curse' &&
		getTypeNames(updatedAttacker).includes('ghost')
	) {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'cursed',
			addMessage,
		});
		updatedAttacker = {
			...updatedAttacker,
			damage: updatedAttacker.damage + Math.floor(updatedAttacker.stats.hp / 2),
		};
		addMessage({
			message: `${updatedAttacker.name} cut its own hp to curse ${updatedTarget.name}`,
		});
	}

	if (move.name === 'pay-day') {
		addMessage({ message: `Coins scattered everywhere` });
		scatterCoins();
	}
	if (
		move.name === 'thief' &&
		updatedTarget.ability !== 'sticky-hold' &&
		getHeldItem(updatedTarget, false) &&
		!getHeldItem(updatedAttacker, false)
	) {
		addMessage({
			message: `${updatedAttacker.name} stole a ${getHeldItem(
				updatedTarget,
				false
			)} from ${updatedTarget.name}`,
		});

		updatedAttacker = {
			...updatedAttacker,
			heldItemName: getHeldItem(updatedTarget, false),
		};
		updatedTarget = { ...updatedTarget, heldItemName: undefined };
	}

	//UPDATES

	//ATTACKER
	//apply rage
	if (move.name === 'rage') {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'raging',
			addMessage,
		});
	}

	//self destruct
	if (SELF_DESTRUCTING_MOVES.includes(move.name)) {
		addMessage({ message: `${updatedAttacker.name} self destructed` });
		updatedAttacker = { ...updatedAttacker, damage: updatedAttacker.stats.hp };
	}

	//apply confusion on lock in end
	if (
		lockInMoves.includes(move.name) &&
		updatedAttacker.moveQueue.length === 1
	) {
		addMessage({ message: `${updatedAttacker.data.name} stopped thrashing` });
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'confusion',
			addMessage,
		});
	}

	//update moveQueue
	if (move.multiHits > 1) {
		addMessage({ message: 'Multi hit!' });
		updatedAttacker = {
			...updatedAttacker,
			moveQueue: [
				{ ...move, multiHits: move.multiHits - 1, isAMultiHit: true },
			],
		};
	} else
		updatedAttacker = {
			...updatedAttacker,
			moveQueue: updatedAttacker.moveQueue.slice(1),
		};

	//reduce pp after all multihits are done
	if (!move.isAMultiHit) {
		updatedAttacker = changeMovePP(
			updatedAttacker,
			move.name,
			underPressure ? -2 : -1
		);
	}

	//apply stat changes
	if (selfTargeting) {
		updatedAttacker = applyAttackStatChanges(
			updatedAttacker,
			updatedAttacker.ability,
			move,
			addMessage,
			true,
			battleFieldEffects
		);
		//healing
		if (move.data.meta.healing) {
			addMessage({ message: `${updatedAttacker.name} healed itself` });
			updatedAttacker = {
				...updatedAttacker,
				damage: getMiddleOfThree([
					0,
					updatedAttacker.damage -
						updatedAttacker.stats.hp * (100 / move.data.meta.healing),
					updatedAttacker.stats.hp,
				]),
			};
		}
	}
	const targetIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedTarget.ownerId
	);
	const attackerIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedAttacker.ownerId
	);

	//TARGET
	if (!selfTargeting) {
		// apply damage
		const { consumedHeldItem, damage, criticalHit, wasSuperEffective } =
			calculateDamage(
				updatedAttacker,
				target,
				move,
				battleWeather,
				battleFieldEffects,
				true,
				isFlying,
				isUnderground,
				addMessage
			);
		const actualDamage = getMiddleOfThree([
			0,
			damage,
			updatedTarget.stats.hp - updatedTarget.damage,
		]);
		if (consumedHeldItem) {
			addMessage({
				message: `${updatedTarget.name} consumed its ${getHeldItem(
					updatedTarget,
					false
				)} to reduce the damage`,
			});
		}
		if (
			getHeldItem(updatedAttacker) === 'shell-bell' &&
			damage !== 0 &&
			updatedAttacker.damage !== 0
		) {
			addMessage({
				message: `${updatedAttacker.name} healed itself with shell bell`,
			});

			const restored = getMiddleOfThree([Math.floor(damage / 8), 1, 1]);
			updatedAttacker = {
				...updatedAttacker,
				damage: getMiddleOfThree([0, 0, updatedAttacker.damage - restored]),
			};
		}
		updatedTarget = {
			...updatedTarget,
			damage: updatedTarget.damage + actualDamage,
			//setLastReceivedDamage
			lastReceivedDamage: {
				attack: move,
				damage: actualDamage,
				applicatorId: attacker.id,
				wasSuperEffective: !!wasSuperEffective,
				wasPhysical: move.data.damage_class.name === 'physical',
				wasSpecial: move.data.damage_class.name === 'special',
			},
			heldItemName: consumedHeldItem
				? undefined
				: getHeldItem(updatedTarget, false),
			biding: updatedTarget.biding
				? {
						...updatedTarget.biding,
						damage: updatedTarget.biding.damage + damage,
				  }
				: undefined,
		};
		// check attacker  drain/recoil

		const getDrain = () => {
			if (move.data.meta.drain) {
				return move.data.meta.drain;
			}
			if (
				getHeldItem(updatedTarget) === 'jaboca-berry' &&
				move.data.damage_class.name === 'physical'
			) {
				addMessage({
					message: `${updatedTarget.name} somehow used its ${getHeldItem(
						updatedTarget,
						false
					)} to damage ${updatedAttacker.name}`,
				});
				updatedTarget = { ...updatedTarget, heldItemName: undefined };
				return -12.5;
			}
			if (
				getHeldItem(updatedTarget) === 'rowap-berry' &&
				move.data.damage_class.name === 'special'
			) {
				addMessage({
					message: `${updatedTarget.name} somehow used its ${getHeldItem(
						updatedTarget,
						false
					)} to damage ${updatedAttacker.name}`,
				});
				updatedTarget = { ...updatedTarget, heldItemName: undefined };
				return -12.5;
			}
		};
		const drain = getDrain();
		if (drain) {
			const absDrainValue = getMiddleOfThree([
				1,
				Math.round((damage * Math.abs(drain)) / 100),
				attacker.stats.hp,
			]);
			const drainValue = drain < 0 ? -absDrainValue : absDrainValue;
			const liquidOozedChecked =
				target.ability === 'liquid-ooze' && drain > 0
					? -drainValue
					: drainValue;
			const rockHeadChecked =
				attacker.ability === 'rock-head' && drain < 0 ? 0 : liquidOozedChecked;

			updatedAttacker = {
				...updatedAttacker,
				damage: getMiddleOfThree([
					0,
					updatedAttacker.damage - rockHeadChecked,
					updatedAttacker.stats.hp,
				]),
			};

			if (rockHeadChecked > 0 && target.ability === 'liquid-ooze') {
				addMessage({
					message: `${updatedAttacker.data.name} took ${absDrainValue} HP damage from liquid ooze`,
				});
			} else if (rockHeadChecked > 0) {
				addMessage({
					message: `${updatedAttacker.data.name} restored ${absDrainValue} HP`,
				});
			} else if (rockHeadChecked < 0) {
				addMessage({
					message: `${updatedAttacker.data.name} took ${absDrainValue} HP recoil damage`,
				});
			}
		}
		//apply ailments
		const { updatedApplicator: a, updatedTarget: b } =
			applyAttackAilmentsToPokemon(
				updatedTarget,
				updatedAttacker,
				move,
				addMessage,
				battleWeather,
				targetIsSafeguarded
			);
		updatedAttacker = a;
		updatedTarget = b;
		// apply stat changes
		if (
			move.data.meta.category.name === 'damage+lower' ||
			move.data.target.name === 'all-opponents' ||
			move.data.target.name === 'selected-pokemon' ||
			move.data.target.name === 'opponents-field'
		) {
			updatedTarget = applyAttackStatChanges(
				updatedTarget,
				updatedAttacker.ability,
				move,
				addMessage,
				false,
				battleFieldEffects
			);
		}

		const { updatedAttacker: afterAbilityCheck, updatedTarget: t } =
			handleAbilitiesAfterAttack(
				updatedAttacker,
				updatedTarget,
				move,
				addMessage,
				attackerIsSafeguarded,
				battleWeather,
				criticalHit,
				damage,
				battleFieldEffects
			);
		updatedAttacker = { ...afterAbilityCheck };
		updatedTarget = { ...t };
	}

	return updatedPokemon.map((p) => {
		if (p.id === updatedAttacker.id) {
			return updatedAttacker;
		}
		if (p.id === updatedTarget.id) {
			return updatedTarget;
		}
		return p;
	});
};
