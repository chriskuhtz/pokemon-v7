import { contactMoves } from '../../../../../../constants/contactMoves';
import { lockInMoves } from '../../../../../../constants/forceSwitchMoves';
import { SELF_DESTRUCTING_MOVES } from '../../../../../../constants/selfDestructingMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../../functions/applyAttackAilmentsToPokemon';
import { applyAttackStatChanges } from '../../../../../../functions/applyAttackStatChanges';
import { applyPrimaryAilmentToPokemon } from '../../../../../../functions/applyPrimaryAilmentToPokemon';
import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from '../../../../../../functions/applyStatChangeToPokemon';
import { calculateDamage } from '../../../../../../functions/calculateDamage';
import { changeMovePP } from '../../../../../../functions/changeMovePP';
import { determineMiss } from '../../../../../../functions/determineMiss';
import { getRandomIndex } from '../../../../../../functions/filterTargets';
import { getActualTargetId } from '../../../../../../functions/getActualTargetId';
import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { getMiddleOfThree } from '../../../../../../functions/getMiddleOfThree';
import { arePokemonOfOppositeGenders } from '../../../../../../functions/getRivalryFactor';
import { getTypeNames } from '../../../../../../functions/getTypeNames';
import { handleFlinching } from '../../../../../../functions/handleFlinching';
import { isKO } from '../../../../../../functions/isKo';
import { Message } from '../../../../../../hooks/useMessageQueue';
import {
	CUTE_CHARM_CHANCE,
	EFFECT_SPORE_CHANCE,
	FLAME_BODY_CHANCE,
	LEECH_DAMAGE_FACTOR,
	POISON_POINT_CHANCE,
	PrimaryAilment,
	ROUGH_SKIN_FACTOR,
	STATIC_CHANCE,
} from '../../../../../../interfaces/Ailment';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { EmptyStatObject } from '../../../../../../interfaces/StatObject';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { handleDampy } from '../../../../functions/handleDampy';
import { checkAndHandleFainting } from '../../../../functions/handleFainting';
import { handleMiss } from '../../../../functions/handleMiss';
import { handleMoveBlockAilments } from '../../../../functions/handleMoveBlockAilments';
import { handleNoTarget } from '../../../../functions/handleNoTarget';

export const handleAttack = ({
	attacker,
	pokemon,
	setPokemon,
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
	const selfTargeting = move.data.target.name === 'user';

	if (dampy && SELF_DESTRUCTING_MOVES.includes(move.name)) {
		handleDampy(attacker, move, setPokemon, addMessage, dampy, underPressure);
		return;
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
	if (move.name === 'sand-storm') {
		setBattleWeather('sandstorm');
	}
	if (move.name === 'rain-dance') {
		setBattleWeather('rain');
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
	if (move.name === 'spikes') {
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

	if (move.name === 'foresight') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			addMessage,
			ailment: 'foresighted',
		});
	}
	if (move.name === 'attract') {
		if (updatedTarget.gender === 'GENDERLESS') {
			addMessage({ message: 'It failed' });
		} else
			updatedTarget = applySecondaryAilmentToPokemon({
				pokemon: updatedTarget,
				addMessage,
				ailment: 'infatuation',
				targetId: updatedAttacker.id,
			});
	}

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
	if (move.name === 'nightmare') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'nightmare',
			addMessage,
		});
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
	//leech on
	if (move.name === 'leech-seed') {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'leeching-on',
			addMessage,
			healAmount: Math.floor(updatedTarget.stats.hp * LEECH_DAMAGE_FACTOR),
		});
	}

	//apply stat changes
	if (selfTargeting || move.data.meta.category.name === 'damage+raise') {
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
			battleWeather,
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
			battleWeather,
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
			battleWeather,
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
			battleWeather,
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
	}

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
				battleWeather
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

		// check anger point
		if (criticalHit && updatedTarget.ability === 'anger-point') {
			updatedTarget = applyStatChangeToPokemon(
				updatedTarget,
				'attack',
				6,
				true,
				battleFieldEffects,
				addMessage,
				'with anger point'
			);
		}

		// apply rage boost
		if (
			damage > 0 &&
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
		//check lightning rod
		if (
			!isKO(updatedTarget) &&
			target.ability === 'lightning-rod' &&
			move.data.type.name === 'electric'
		) {
			updatedTarget = applyStatChangeToPokemon(
				updatedTarget,
				'special-attack',
				1,
				true,
				battleFieldEffects,
				addMessage,
				'by lightning-rod'
			);
		}
		//check storm drain
		if (
			!isKO(updatedTarget) &&
			target.ability === 'storm-drain' &&
			move.data.type.name === 'water'
		) {
			updatedTarget = applyStatChangeToPokemon(
				updatedTarget,
				'special-attack',
				1,
				true,
				battleFieldEffects,
				addMessage,
				'by storm-drain'
			);
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

		if (move.name === 'perish-song') {
			updatedTarget = applySecondaryAilmentToPokemon({
				pokemon: updatedTarget,
				ailment: 'perish-songed',
				addMessage,
			});
		}

		if (
			!isKO(updatedTarget) &&
			contactMoves.includes(move.name) &&
			updatedTarget.ability === 'pickpocket' &&
			!getHeldItem(updatedTarget) &&
			getHeldItem(updatedAttacker, false)
		) {
			updatedTarget.heldItemName = getHeldItem(updatedAttacker, false);
			updatedAttacker.heldItemName = undefined;
			addMessage({
				message: `${updatedTarget.name} stole ${updatedAttacker.name}'s held item with pickpocket`,
			});
		}
	}

	//Aftermath
	if (
		isKO(updatedTarget) &&
		updatedTarget.ability === 'aftermath' &&
		contactMoves.includes(move.name)
	) {
		addMessage({ message: `${updatedAttacker.name} is hurt by aftermath` });
		updatedAttacker = {
			...updatedAttacker,
			damage: Math.floor(updatedAttacker.damage + updatedAttacker.stats.hp / 4),
		};
	}

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
