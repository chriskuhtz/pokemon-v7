import { applyAttackAilmentsToPokemon } from '../../../../../../functions/applyAttackAilmentsToPokemon';
import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { changeMovePP } from '../../../../../../functions/changeMovePP';
import { determineMiss } from '../../../../../../functions/determineMiss';
import { getActualTargetId } from '../../../../../../functions/getActualTargetId';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { LEECH_DAMAGE_FACTOR } from '../../../../../../interfaces/Ailment';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { checkAndHandleFainting } from '../../../../functions/handleFainting';
import { handleMiss } from '../../../../functions/handleMiss';
import { handleMoveBlockAilments } from '../../../../functions/handleMoveBlockAilments';
import { handleNoTarget } from '../../../../functions/handleNoTarget';

export const handleAilmentAttack = ({
	attacker,
	pokemon,
	setPokemon,
	addMessage,
	move,
	battleWeather,
	battleFieldEffects,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>;
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
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

	addMessage({
		message: `${attacker.data.name} used ${move.name} `,
	});

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

	//UPDATES

	//ATTACKER

	//update moveQueue

	updatedAttacker = {
		...updatedAttacker,
		moveQueue: updatedAttacker.moveQueue.slice(1),
	};

	updatedAttacker = changeMovePP(
		updatedAttacker,
		move.name,
		underPressure ? -2 : -1
	);

	//leech on
	if (move.name === 'leech-seed') {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'leeching-on',
			addMessage,
			healAmount: Math.floor(updatedTarget.stats.hp * LEECH_DAMAGE_FACTOR),
		});
	}

	//TARGET

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

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (
				updatedAttacker.id === updatedTarget.id &&
				p.id === updatedAttacker.id
			) {
				return checkAndHandleFainting(updatedAttacker, addMessage);
			}
			if (p.id === updatedAttacker.id) {
				return checkAndHandleFainting(updatedAttacker, addMessage);
			}
			if (p.id === updatedTarget.id) {
				return checkAndHandleFainting(updatedTarget, addMessage);
			}
			return p;
		})
	);
};
