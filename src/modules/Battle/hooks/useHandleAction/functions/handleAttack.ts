import { contactMoves } from '../../../../../constants/contactMoves';
import { lockInMoves } from '../../../../../constants/forceSwitchMoves';
import { SELF_DESTRUCTING_MOVES } from '../../../../../constants/selfDestructingMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../functions/applyAttackAilmentsToPokemon';
import { applyPrimaryAilmentToPokemon } from '../../../../../functions/applyPrimaryAilmentToPokemon';
import { applySecondaryAilmentToPokemon } from '../../../../../functions/applySecondaryAilmentToPokemon';
import { applyAttackStatChanges } from '../../../../../functions/applyStatusMove';
import { calculateDamage } from '../../../../../functions/calculateDamage';
import { changeBattlePokemonType } from '../../../../../functions/changeBattlePokemonType';
import { changeMovePP } from '../../../../../functions/changeMovePP';
import { determineMiss } from '../../../../../functions/determineMiss';
import {
	getRandomIndex,
	getRandomTargetId,
} from '../../../../../functions/filterTargets';
import { handleFlinching } from '../../../../../functions/handleFlinching';
import { isKO } from '../../../../../functions/isKo';
import {
	EFFECT_SPORE_CHANCE,
	PrimaryAilment,
	ROUGH_SKIN_FACTOR,
	STATIC_CHANCE,
} from '../../../../../interfaces/Ailment';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../interfaces/Weather';
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
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>;
	addMessage: (x: string) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	scatterCoins: () => void;
	dampy?: { name: string };
}): void => {
	//lock in moves choose a random target at execution
	const realTargetId = lockInMoves.includes(move.name)
		? getRandomTargetId({
				targets: pokemon,
				user: attacker,
				chosenAction: move.name,
				onlyOpponents: false,
		  })
		: move.targetId;
	const target = pokemon.find(
		(p) => p.id === realTargetId && p.status === 'ONFIELD'
	);

	let updatedAttacker = { ...attacker };

	const { canAttack, updatedAttacker: afterBlockers } = handleMoveBlockAilments(
		{
			attacker,
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
	addMessage(
		`${attacker.data.name} used ${move.name} against ${target.data.name}`
	);
	//updated Target
	let updatedTarget = { ...target };
	const isFlying =
		updatedTarget.moveQueue.length > 0 &&
		updatedTarget.moveQueue[0].type === 'BattleAttack' &&
		updatedTarget.moveQueue[0].name === 'fly';
	const miss = determineMiss(move, attacker, target, battleWeather, isFlying);

	if (miss) {
		handleMiss(attacker, move, setPokemon, addMessage);
		return;
	}

	if (move.name === 'pay-day') {
		addMessage(`Coins scattered everywhere`);
		scatterCoins();
	}

	//UPDATES

	//ATTACKER

	//apply confusion on lock in end
	if (
		lockInMoves.includes(move.name) &&
		updatedAttacker.moveQueue.length === 1
	) {
		addMessage(`${updatedAttacker.data.name} stopped thrashing`);
		updatedAttacker = applySecondaryAilmentToPokemon(
			updatedAttacker,
			'confusion',
			addMessage
		);
	}
	//update moveQueue
	if (move.multiHits > 1) {
		addMessage('Multi hit!');
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

	//apply stat changes
	if (selfTargeting) {
		updatedAttacker = applyAttackStatChanges(updatedAttacker, move, addMessage);
	}

	//check for static
	if (
		target.ability === 'static' &&
		contactMoves.includes(move.name) &&
		Math.random() < STATIC_CHANCE
	) {
		updatedAttacker = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			'paralysis',
			addMessage,
			`by ${target.data.name}'s static`
		);
	}

	//check for effect spore
	if (
		target.ability === 'effect-spore' &&
		contactMoves.includes(move.name) &&
		Math.random() < EFFECT_SPORE_CHANCE
	) {
		const possibleAilments = ['paralysis', 'poison', 'sleep'];
		updatedAttacker = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			possibleAilments[
				getRandomIndex(possibleAilments.length)
			] as PrimaryAilment['type'],
			addMessage,
			`by ${target.data.name}'s effect spore`
		);
	}
	//check for rough-skin
	if (target.ability === 'rough-skin' && contactMoves.includes(move.name)) {
		updatedAttacker = {
			...updatedAttacker,
			damage:
				updatedAttacker.damage +
				Math.round(updatedAttacker.stats.hp * ROUGH_SKIN_FACTOR),
		};
		addMessage(`${updatedAttacker.data.name} was hurt by rough skin`);

		if (isKO(updatedAttacker)) {
			updatedAttacker = handleFainting(updatedAttacker, addMessage);
		}
	}

	//TARGET

	// apply damage
	const damage = calculateDamage(
		updatedAttacker,
		target,
		move,
		battleWeather,
		true,
		isFlying,
		addMessage
	);
	updatedTarget = {
		...updatedTarget,
		damage: updatedTarget.damage + damage,
	};

	// check attacker  drain/recoil
	const drain = move.data.meta.drain;
	if (drain) {
		const drained = Math.round((attacker.damage * drain) / 100);
		updatedAttacker = {
			...updatedAttacker,
			damage: updatedAttacker.damage - drained,
		};
		if (drain > 0) {
			addMessage(`${updatedAttacker.data.name} restored ${drained} HP`);
		}
		if (drain < 0) {
			addMessage(
				`${updatedAttacker.data.name} took ${drained} HP recoil damage`
			);
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
	updatedTarget = applyAttackAilmentsToPokemon(updatedTarget, move, addMessage);
	// apply stat changes
	updatedTarget = applyAttackStatChanges(updatedTarget, move, addMessage);

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
		addMessage(`${target.data.name} raised its power with ${target.ability}`);
		updatedTarget.flashFired = true;
	}
	//check color change
	if (
		!isKO(updatedTarget) &&
		updatedTarget.damage > target.damage &&
		updatedTarget.ability === 'color-change'
	) {
		updatedTarget = changeBattlePokemonType(
			updatedTarget,
			move.data.type.name,
			addMessage
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
