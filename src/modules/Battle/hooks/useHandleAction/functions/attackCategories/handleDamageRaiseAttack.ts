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
import { checkAndHandleFainting } from '../../../../functions/handleFainting';
import { handleMiss } from '../../../../functions/handleMiss';
import { handleMoveBlockAilments } from '../../../../functions/handleMoveBlockAilments';
import { handleNoTarget } from '../../../../functions/handleNoTarget';
import { handleAbilitiesAfterAttack } from '../handleAbilitiesAfterAttack';

/**
 *
 * Damage+Raise Attacks damage the target and change (not necessarily raise) the stats of the attacker
 */
export const handleDamageRaiseAttack = ({
	attacker,
	pokemon,
	setPokemon,
	addMessage,
	move: m,
	battleWeather,
	battleFieldEffects,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>;
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	setBattleWeather: (x: WeatherType) => void;
	scatterCoins: () => void;
	dampy?: { name: string };
	addBattleFieldEffect: (x: BattleFieldEffect) => void;
	battleFieldEffects: BattleFieldEffect[];
}): void => {
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
		setPokemon((pokemon) =>
			pokemon.map((p) => {
				if (p.id === updatedAttacker.id) {
					return updatedAttacker;
				}
				return p;
			})
		);
		return;
	}
	if (!target) {
		handleNoTarget(attacker, move, setPokemon, addMessage, underPressure);
		return;
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
		handleMiss(attacker, move, setPokemon, addMessage, underPressure, reason);
		return;
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

	//apply stat changes
	updatedAttacker = applyAttackStatChanges(
		updatedAttacker,
		updatedAttacker.ability,
		move,
		addMessage,
		true,
		battleFieldEffects
	);

	const attackerIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedAttacker.ownerId
	);

	//TARGET

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

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (
				updatedAttacker.id === updatedTarget.id &&
				p.id === updatedAttacker.id
			) {
				return {
					...checkAndHandleFainting(updatedAttacker, pokemon, addMessage),
					lastUsedMove: { name: move.name, data: move.data, usedPP: 0 },
					biding: updatedAttacker.moveQueue.length > 0 ? p.biding : undefined,
				};
			}
			if (p.id === updatedAttacker.id) {
				return {
					...checkAndHandleFainting(updatedAttacker, pokemon, addMessage),
					lastUsedMove: { name: move.name, data: move.data, usedPP: 0 },
					biding: updatedAttacker.moveQueue.length > 0 ? p.biding : undefined,
				};
			}
			if (p.id === updatedTarget.id) {
				return checkAndHandleFainting(updatedTarget, pokemon, addMessage);
			}
			return p;
		})
	);
};
