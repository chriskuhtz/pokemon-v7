import { SELF_DESTRUCTING_MOVES } from '../../../../../../constants/selfDestructingMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../../functions/applyAttackAilmentsToPokemon';
import { applyAttackStatChanges } from '../../../../../../functions/applyAttackStatChanges';
import { calculateDamage } from '../../../../../../functions/calculateDamage';
import { changeMovePP } from '../../../../../../functions/changeMovePP';
import { determineMiss } from '../../../../../../functions/determineMiss';
import { getActualTargetId } from '../../../../../../functions/getActualTargetId';
import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { getMiddleOfThree } from '../../../../../../functions/getMiddleOfThree';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { handleDampy } from '../../../../functions/handleDampy';
import { handleMiss } from '../../../../functions/handleMiss';
import { handleMoveBlockAilments } from '../../../../functions/handleMoveBlockAilments';
import { handleNoTarget } from '../../../../functions/handleNoTarget';
import { handleAbilitiesAfterAttack } from '../handleAbilitiesAfterAttack';

/**
 *
 * Damage Attacks damage the target w/o side effects
 */
export const handleDamageAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	battleWeather,
	battleFieldEffects,
	dampy,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	battleFieldEffects: BattleFieldEffect[];
	dampy: { name: string } | undefined;
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
	addMessage({
		message: `${attacker.data.name} used ${move.name} against ${target.data.name}`,
	});

	//UPDATED TARGET
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
			pokemon,
			setPokemon,
			addMessage,
			underPressure,
			reason
		);
		return updatedPokemon;
	}

	//update moveQueue
	updatedAttacker = {
		...updatedAttacker,
		moveQueue: updatedAttacker.moveQueue.slice(1),
	};

	//reduce pp after all multihits are done
	updatedAttacker = changeMovePP(
		updatedAttacker,
		move.name,
		underPressure ? -2 : -1
	);

	const attackerIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedAttacker.ownerId
	);

	//TARGET

	//self destruct
	if (SELF_DESTRUCTING_MOVES.includes(move.name)) {
		addMessage({ message: `${updatedAttacker.name} self destructed` });
		updatedAttacker = { ...updatedAttacker, damage: updatedAttacker.stats.hp };
	}

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
	//DRAIN
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
			target.ability === 'liquid-ooze' && drain > 0 ? -drainValue : drainValue;
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

	//ABILITYCHECK
	const { updatedAttacker: a, updatedTarget: t } = handleAbilitiesAfterAttack(
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
	updatedAttacker = { ...a };
	updatedTarget = { ...t };

	const category = move.data.meta.category.name;
	if (category === 'damage+raise') {
		updatedAttacker = applyAttackStatChanges(
			updatedAttacker,
			updatedAttacker.ability,
			move,
			addMessage,
			true,
			battleFieldEffects
		);
	}
	if (category === 'damage+lower') {
		updatedTarget = applyAttackStatChanges(
			updatedTarget,
			updatedTarget.ability,
			move,
			addMessage,
			false,
			battleFieldEffects
		);
	}
	if (category === 'damage+ailment') {
		const targetIsSafeguarded = battleFieldEffects.some(
			(b) => b.type === 'safeguard' && b.ownerId === updatedTarget.ownerId
		);
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
