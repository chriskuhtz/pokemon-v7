import { contactMoves } from '../../../../../constants/contactMoves';
import { lockInMoves } from '../../../../../constants/forceSwitchMoves';
import { SELF_DESTRUCTING_MOVES } from '../../../../../constants/selfDestructingMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../functions/applyAttackAilmentsToPokemon';
import { applyAttackStatChanges } from '../../../../../functions/applyAttackStatChanges';
import { applyPrimaryAilmentToPokemon } from '../../../../../functions/applyPrimaryAilmentToPokemon';
import { applySecondaryAilmentToPokemon } from '../../../../../functions/applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from '../../../../../functions/applyStatChangeToPokemon';
import { calculateDamage } from '../../../../../functions/calculateDamage';
import { changeMovePP } from '../../../../../functions/changeMovePP';
import { determineMiss } from '../../../../../functions/determineMiss';
import {
	getRandomEntry,
	getRandomIndex,
} from '../../../../../functions/filterTargets';
import { getActualTargetId } from '../../../../../functions/getActualTargetId';
import { getMiddleOfThree } from '../../../../../functions/getMiddleOfThree';
import { getMovesArray } from '../../../../../functions/getMovesArray';
import { arePokemonOfOppositeGenders } from '../../../../../functions/getRivalryFactor';
import { handleFlinching } from '../../../../../functions/handleFlinching';
import { isKO } from '../../../../../functions/isKo';
import { Message } from '../../../../../hooks/useMessageQueue';
import {
	CUTE_CHARM_CHANCE,
	EFFECT_SPORE_CHANCE,
	FLAME_BODY_CHANCE,
	LEECH_DAMAGE_FACTOR,
	POISON_POINT_CHANCE,
	PrimaryAilment,
	ROUGH_SKIN_FACTOR,
	STATIC_CHANCE,
} from '../../../../../interfaces/Ailment';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { EmptyStatObject } from '../../../../../interfaces/StatObject';
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

	if (dampy && SELF_DESTRUCTING_MOVES.includes(move.name)) {
		handleDampy(attacker, move, setPokemon, addMessage, dampy, underPressure);
		return;
	}

	const selfTargeting = move.data.target.name === 'user';

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

	//MIST, LIGHT-SCREEN, REFLECT
	if (['mist', 'light-screen', 'reflect'].includes(move.name)) {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
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
	if (move.name === 'spider-web') {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: target.ownerId,
			duration: 9000,
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

	if (move.name === 'haze') {
		addMessage({
			message: `${attacker.name} removed all stat changes with haze`,
		});
		setPokemon((pokemon) =>
			pokemon.map((p) => {
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
		return;
	}
	if (move.name === 'conversion') {
		const newType = getRandomEntry(getMovesArray(updatedAttacker)).data.type
			.name;
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'color-changed',
			addMessage,
			newType,
		});
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
		handleMiss(attacker, move, setPokemon, addMessage, underPressure, reason);
		return;
	}

	if (move.name === 'pay-day') {
		addMessage({ message: `Coins scattered everywhere` });
		scatterCoins();
	}
	if (
		move.name === 'thief' &&
		updatedTarget.heldItemName &&
		!updatedAttacker.heldItemName
	) {
		addMessage({
			message: `${updatedAttacker.name} stole a ${updatedTarget.heldItemName} from ${updatedTarget.name}`,
		});

		updatedAttacker = {
			...updatedAttacker,
			heldItemName: updatedTarget.heldItemName,
		};
		updatedTarget = { ...updatedTarget, heldItemName: undefined };
	}

	if (move.name === 'mind-reader') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			addMessage,
			ailment: 'mind-read',
			by: updatedAttacker.id,
		});
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
	//apply focus
	if (move.name === 'focus-energy') {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'focused',
			addMessage,
		});
	}
	//rest
	if (move.name === 'rest') {
		addMessage({
			message: `${updatedAttacker.data.name} went to sleep and became healthy`,
		});
		updatedAttacker = {
			...updatedAttacker,
			damage: 0,
			primaryAilment: { type: 'sleep', duration: 2 },
		};
	}
	//self destruct
	if (SELF_DESTRUCTING_MOVES.includes(move.name)) {
		addMessage({ message: `${updatedAttacker.name} self destructed` });
		updatedAttacker = handleFainting(updatedAttacker, addMessage);
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
			moveQueue: [{ ...move, multiHits: move.multiHits - 1 }],
		};
	} else
		updatedAttacker = {
			...updatedAttacker,
			moveQueue: updatedAttacker.moveQueue.slice(1),
		};

	//reduce pp after all multihits are done
	if (move.multiHits === 0) {
		updatedAttacker = changeMovePP(
			updatedAttacker,
			move.name,
			underPressure ? -2 : -1
		);
	}
	//leech on
	if (move.name === 'leech-seed') {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'leeching-on',
			addMessage,
			healAmount: updatedTarget.stats.hp * LEECH_DAMAGE_FACTOR,
		});
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
	//check for flame-body
	if (
		target.ability === 'flame-body' &&
		contactMoves.includes(move.name) &&
		Math.random() < FLAME_BODY_CHANCE
	) {
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			'burn',
			addMessage,
			`by ${target.data.name}'s flame body`
		);
		updatedAttacker = b;
	}
	//check for cute charm
	if (
		target.ability === 'cute-charm' &&
		arePokemonOfOppositeGenders(attacker.gender, updatedTarget.gender) ===
			'YES' &&
		contactMoves.includes(move.name) &&
		Math.random() < CUTE_CHARM_CHANCE
	) {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'infatuation',
			addMessage,
			targetId: updatedTarget.id,
		});
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
	//handle splash
	if (move.name === 'splash') {
		addMessage({ message: 'Nothing happened' });
	}

	//TARGET
	if (!selfTargeting) {
		// apply damage
		const calculatedDamage = calculateDamage(
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
		const damage = getMiddleOfThree([
			0,
			calculatedDamage,
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

		// apply rage boost
		if (
			calculatedDamage > 0 &&
			target.secondaryAilments.some((a) => a.type === 'raging')
		) {
			updatedTarget = applyStatChangeToPokemon(
				updatedTarget,
				'attack',
				1,
				true,
				battleFieldEffects,
				addMessage,
				' by rage'
			);
		}
		// apply motor drive boost
		if (
			move.data.type.name === 'electric' &&
			['physical', 'special'].includes(move.data.damage_class.name) &&
			target.ability === 'motor-drive'
		) {
			updatedTarget = applyStatChangeToPokemon(
				updatedTarget,
				'speed',
				1,
				true,
				battleFieldEffects,
				addMessage,
				' by motor drive'
			);
		}
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
			updatedTarget = applySecondaryAilmentToPokemon({
				pokemon: updatedTarget,
				ailment: 'flash-fire',
				addMessage,
			});
		}
		//check color change
		if (
			!isKO(updatedTarget) &&
			updatedTarget.damage > target.damage &&
			updatedTarget.ability === 'color-change'
		) {
			updatedTarget = applySecondaryAilmentToPokemon({
				pokemon: updatedTarget,
				ailment: 'color-changed',
				addMessage,
				newType: move.data.type.name,
			});
		}
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
