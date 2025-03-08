import { contactMoves } from '../../../../../constants/contactMoves';
import { lockInMoves } from '../../../../../constants/forceSwitchMoves';
import { SELF_DESTRUCTING_MOVES } from '../../../../../constants/selfDestructingMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../functions/applyAttackAilmentsToPokemon';
import { applyAttackStatChanges } from '../../../../../functions/applyAttackStatChanges';
import { applyPrimaryAilmentToPokemon } from '../../../../../functions/applyPrimaryAilmentToPokemon';
import { applySecondaryAilmentToPokemon } from '../../../../../functions/applySecondaryAilmentToPokemon';
import { calculateDamage } from '../../../../../functions/calculateDamage';
import { changeMovePP } from '../../../../../functions/changeMovePP';
import { determineMiss } from '../../../../../functions/determineMiss';
import { getRandomIndex } from '../../../../../functions/filterTargets';
import { getActualTargetId } from '../../../../../functions/getActualTargetId';
import { getMiddleOfThree } from '../../../../../functions/getMiddleOfThree';
import { handleFlinching } from '../../../../../functions/handleFlinching';
import { isKO } from '../../../../../functions/isKo';
import { Message } from '../../../../../hooks/useMessageQueue';
import {
	EFFECT_SPORE_CHANCE,
	LEECH_DAMAGE_FACTOR,
	POISON_POINT_CHANCE,
	PrimaryAilment,
	ROUGH_SKIN_FACTOR,
	STATIC_CHANCE,
} from '../../../../../interfaces/Ailment';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../BattleField';
import { handleDampy } from '../../../functions/handleDampy';
import { handleFainting } from '../../../functions/handleFainting';
import { handleMiss } from '../../../functions/handleMiss';
import { handleMoveBlockAilments } from '../../../functions/handleMoveBlockAilments';
import { handleNoTarget } from '../../../functions/handleNoTarget';

export const handleAttack = ({
	attacker,
	pokemon,
	setPokemon,
	addMessage,
	move,
	battleWeather,
	scatterCoins,
	dampy,
	addBattleFieldEffect,
	battleFieldEffects,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>;
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	scatterCoins: () => void;
	dampy?: { name: string };
	addBattleFieldEffect: (x: BattleFieldEffect) => void;
	battleFieldEffects: BattleFieldEffect[];
}): void => {
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
		handleNoTarget(attacker, move, setPokemon, addMessage);
		return;
	}
	if (dampy && SELF_DESTRUCTING_MOVES.includes(move.name)) {
		handleDampy(attacker, move, setPokemon, addMessage, dampy);
		return;
	}

	const selfTargeting = move.data.target.name === 'user';

	//TODO: handle self targeting, this currently leads to bugs bc. of mapping over pokemon and not applying target updates
	if (target.id === attacker.id && !selfTargeting) {
		console.warn('attacking yourself much?', attacker.data.name);
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

	//MIST
	if (move.name === 'mist') {
		addBattleFieldEffect({
			type: 'mist',
			ownerId: updatedAttacker.ownerId,
			duration: 5,
		});
		setPokemon((pokemon) =>
			pokemon.map((p) => {
				if (p.id === updatedAttacker.id) {
					return {
						...changeMovePP(updatedAttacker, move.name, -1),
						moveQueue: [],
					};
				}

				return p;
			})
		);
		return;
	}

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
		handleMiss(attacker, move, setPokemon, addMessage, reason);
		return;
	}

	if (move.name === 'pay-day') {
		addMessage({ message: `Coins scattered everywhere` });
		scatterCoins();
	}

	//UPDATES

	//ATTACKER

	//apply confusion on lock in end
	if (
		lockInMoves.includes(move.name) &&
		updatedAttacker.moveQueue.length === 1
	) {
		addMessage({ message: `${updatedAttacker.data.name} stopped thrashing` });
		updatedAttacker = applySecondaryAilmentToPokemon(
			updatedAttacker,
			'confusion',
			addMessage
		);
	}
	//update moveQueue
	if (move.multiHits > 1) {
		addMessage({ message: 'Multi hit!' });
		updatedAttacker = {
			...updatedAttacker,
			moveQueue: [{ ...move, multiHits: move.multiHits - 1 }],
		};
	} else
		updatedAttacker = {
			...updatedAttacker,
			moveQueue: updatedAttacker.moveQueue.slice(1),
		};

	//reduce pp after all multihits are done
	if (move.multiHits === 0) {
		updatedAttacker = changeMovePP(updatedAttacker, move.name, -1);
	}
	//leech on
	if (move.name === 'leech-seed') {
		updatedAttacker = applySecondaryAilmentToPokemon(
			updatedAttacker,
			'leeching-on',
			addMessage,
			undefined,
			undefined,
			updatedTarget.stats.hp * LEECH_DAMAGE_FACTOR
		);
	}
	//apply stat changes
	if (selfTargeting) {
		updatedAttacker = applyAttackStatChanges(
			updatedAttacker,
			move,
			addMessage,
			true,
			battleFieldEffects
		);
	}

	//check for static
	if (
		target.ability === 'static' &&
		contactMoves.includes(move.name) &&
		Math.random() < STATIC_CHANCE
	) {
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			'paralysis',
			addMessage,
			`by ${target.data.name}'s static`
		);
		updatedAttacker = b;
	}
	//check for poison-point
	if (
		target.ability === 'poison-point' &&
		contactMoves.includes(move.name) &&
		Math.random() < POISON_POINT_CHANCE
	) {
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			'poison',
			addMessage,
			`by ${target.data.name}'s poison point`
		);
		updatedAttacker = b;
	}

	//check for effect spore
	if (
		target.ability === 'effect-spore' &&
		contactMoves.includes(move.name) &&
		Math.random() < EFFECT_SPORE_CHANCE
	) {
		const possibleAilments = ['paralysis', 'poison', 'sleep'];
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			possibleAilments[
				getRandomIndex(possibleAilments.length)
			] as PrimaryAilment['type'],
			addMessage,
			`by ${target.data.name}'s effect spore`
		);
		updatedAttacker = b;
	}
	//check for rough-skin
	if (target.ability === 'rough-skin' && contactMoves.includes(move.name)) {
		updatedAttacker = {
			...updatedAttacker,
			damage:
				updatedAttacker.damage +
				Math.round(updatedAttacker.stats.hp * ROUGH_SKIN_FACTOR),
		};
		addMessage({
			message: `${updatedAttacker.data.name} was hurt by rough skin`,
		});

		if (isKO(updatedAttacker)) {
			updatedAttacker = handleFainting(updatedAttacker, addMessage);
		}
	}

	//TARGET

	// apply damage
	const damage = getMiddleOfThree([
		0,
		calculateDamage(
			updatedAttacker,
			target,
			move,
			battleWeather,
			true,
			isFlying,
			isUnderground,
			addMessage
		),
		updatedTarget.stats.hp - updatedTarget.damage,
	]);
	updatedTarget = {
		...updatedTarget,
		damage: updatedTarget.damage + damage,
		//setLastReceivedDamage
		lastReceivedDamage: {
			damageClass: move.data.damage_class.name,
			damage: damage,
			applicatorId: attacker.id,
		},
	};
	// check attacker  drain/recoil
	const drain = move.data.meta.drain;
	if (drain) {
		const drained = getMiddleOfThree([
			1,
			Math.round((damage * drain) / 100),
			attacker.stats.hp,
		]);
		updatedAttacker = {
			...updatedAttacker,
			damage: getMiddleOfThree([
				0,
				updatedAttacker.damage - drained,
				updatedAttacker.stats.hp,
			]),
		};
		if (drain > 0) {
			addMessage({
				message: `${updatedAttacker.data.name} restored ${drained} HP`,
			});
		}
		if (drain < 0) {
			addMessage({
				message: `${updatedAttacker.data.name} took ${drained} HP recoil damage`,
			});
		}
		if (isKO(updatedAttacker)) {
			updatedAttacker = handleFainting(updatedAttacker, addMessage);
		}
	}
	//check for fainting
	if (isKO(updatedTarget)) {
		updatedTarget = handleFainting(updatedTarget, addMessage);
	}
	//apply ailments
	const { updatedApplicator: a, updatedTarget: b } =
		applyAttackAilmentsToPokemon(
			updatedTarget,
			updatedAttacker,
			move,
			addMessage
		);
	updatedAttacker = a;
	updatedTarget = b;
	// apply stat changes
	updatedTarget = applyAttackStatChanges(
		updatedTarget,
		move,
		addMessage,
		false,
		battleFieldEffects
	);

	//check for flinch
	if (!isKO(updatedTarget)) {
		updatedTarget = handleFlinching(
			updatedAttacker,
			updatedTarget,
			move,
			addMessage
		);
	}
	//check flash fire
	if (
		!isKO(updatedTarget) &&
		target.ability === 'flash-fire' &&
		move.data.type.name === 'fire'
	) {
		updatedTarget = applySecondaryAilmentToPokemon(
			updatedTarget,
			'flash-fire',
			addMessage
		);
	}
	//check color change
	if (
		!isKO(updatedTarget) &&
		updatedTarget.damage > target.damage &&
		updatedTarget.ability === 'color-change'
	) {
		updatedTarget = applySecondaryAilmentToPokemon(
			updatedTarget,
			'color-changed',
			addMessage,
			move.data.type.name
		);
	}

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (
				updatedAttacker.id === updatedTarget.id &&
				p.id === updatedAttacker.id
			) {
				return updatedAttacker;
			}
			if (p.id === updatedAttacker.id) {
				return updatedAttacker;
			}
			if (p.id === updatedTarget.id) {
				return updatedTarget;
			}
			return p;
		})
	);
};
