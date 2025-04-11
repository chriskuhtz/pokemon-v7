import { changeMovePP } from '../../../../../../functions/changeMovePP';
import { getActualTargetId } from '../../../../../../functions/getActualTargetId';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { EmptyStatObject } from '../../../../../../interfaces/StatObject';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { handleMoveBlockAilments } from '../../../../functions/handleMoveBlockAilments';
import { handleNoTarget } from '../../../../functions/handleNoTarget';

export const handleWholeFieldEffectAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	battleFieldEffects,
	setBattleWeather,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	setBattleWeather: (x: WeatherType) => void;
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

	//updated Target
	const updatedTarget = { ...target };

	updatedAttacker = changeMovePP(
		updatedAttacker,
		move.name,
		underPressure ? -2 : -1
	);

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
