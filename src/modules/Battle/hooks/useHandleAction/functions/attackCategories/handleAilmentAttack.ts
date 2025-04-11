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
import { handleMiss } from '../../../../functions/handleMiss';
import { handleMoveBlockAilments } from '../../../../functions/handleMoveBlockAilments';
import { handleNoTarget } from '../../../../functions/handleNoTarget';
import { handleAbilitiesAfterAttack } from '../handleAbilitiesAfterAttack';

export const handleAilmentAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	battleWeather,
	battleFieldEffects,
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

	//MESSAGES

	addMessage({
		message: `${attacker.data.name} used ${move.name} against ${target.data.name}`,
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

	const targetIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedTarget.ownerId
	);
	const attackerIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedAttacker.ownerId
	);

	if (move.name === 'foresight') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			addMessage,
			ailment: 'foresighted',
		});
	}
	if (move.name === 'perish-song') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'perish-songed',
			addMessage,
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
	if (move.name === 'nightmare') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'nightmare',
			addMessage,
		});
	}
	if (move.name === 'leech-seed') {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'leeching-on',
			addMessage,
			healAmount: Math.floor(updatedTarget.stats.hp * LEECH_DAMAGE_FACTOR),
		});
	}

	//ATTACKER UPDATES

	//reduce pp after all multihits are done
	updatedAttacker = changeMovePP(
		updatedAttacker,
		move.name,
		underPressure ? -2 : -1
	);

	//TARGET
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

	const { updatedAttacker: afterAbilityCheck, updatedTarget: t } =
		handleAbilitiesAfterAttack(
			updatedAttacker,
			updatedTarget,
			move,
			addMessage,
			attackerIsSafeguarded,
			battleWeather,
			undefined,
			0,
			battleFieldEffects
		);
	updatedAttacker = { ...afterAbilityCheck };
	updatedTarget = { ...t };

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
