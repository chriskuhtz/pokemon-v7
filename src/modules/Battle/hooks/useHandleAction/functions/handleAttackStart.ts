import { SELF_DESTRUCTING_MOVES } from '../../../../../constants/selfDestructingMoves';
import { determineMiss } from '../../../../../functions/determineMiss';
import { getRandomTarget } from '../../../../../functions/filterTargets';
import { getActualTarget } from '../../../../../functions/getActualTargetId';
import { Message } from '../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../BattleField';
import { handleDampy } from '../../../functions/handleDampy';
import { handleMiss } from '../../../functions/handleMiss';
import { handleMoveBlockAilments } from '../../../functions/handleMoveBlockAilments';
import { handleNoTarget } from '../../../functions/handleNoTarget';

export const handleAttackStart = ({
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
}): {
	updatedPokemon: BattlePokemon[];
	targets: BattlePokemon[];
} => {
	let updatedPokemon: BattlePokemon[] = [...pokemon];
	const setPokemon = (input: BattlePokemon[]) => (updatedPokemon = input);

	const move = m;

	const getInitialTargets = (): BattlePokemon[] => {
		switch (move.data.target.name) {
			case 'all-allies':
			case 'user-and-allies':
			case 'users-field':
				return pokemon.filter(
					(p) =>
						p.status === 'ONFIELD' &&
						p.ownerId === attacker.ownerId &&
						p.id !== attacker.id
				);
			case 'all-opponents':
			case 'opponents-field':
				return pokemon.filter(
					(p) => p.status === 'ONFIELD' && p.ownerId !== attacker.ownerId
				);
			case 'all-other-pokemon':
				return pokemon.filter(
					(p) => p.status === 'ONFIELD' && p.id !== attacker.id
				);
			case 'all-pokemon':
				return pokemon.filter((p) => p.status === 'ONFIELD');
			case 'random-opponent':
				return [
					getRandomTarget({
						targets: pokemon,
						user: attacker,
						chosenAction: move.name,
						onlyOpponents: false,
					}),
				];
			case 'user':
				return [attacker];

			case 'user-or-ally':
			case 'specific-move':
			case 'selected-pokemon-me-first':
			case 'selected-pokemon':
			case 'fainting-pokemon':
			case 'entire-field':
			case 'ally':
				return [
					getActualTarget({
						pokemon,
						attacker,
						move,
						addMessage,
					}),
				].filter((p) => !!p);
		}
	};

	let targets = getInitialTargets();

	if (move.name === 'rollout' && targets.length === 0) {
		targets = [
			getRandomTarget({
				targets: pokemon,
				user: attacker,
				chosenAction: move.name,
				onlyOpponents: false,
			}),
		];
	}

	let updatedAttacker = { ...attacker };

	const canAttackChecks = targets.map((t) => {
		const { canAttack, updatedAttacker: afterBlockers } =
			handleMoveBlockAilments({
				attacker,
				attack: move,
				addMessage,
				targetId: t.id,
				battleFieldEffects,
			});
		updatedAttacker = afterBlockers;
		return canAttack;
	});

	if (canAttackChecks.some((canAttack) => canAttack === false)) {
		setPokemon(
			updatedPokemon.map((p) => {
				if (p.id === updatedAttacker.id) {
					return updatedAttacker;
				}
				return p;
			})
		);
		return { updatedPokemon, targets: [] };
	}
	if (targets.length === 0) {
		handleNoTarget(attacker, move, updatedPokemon, setPokemon, addMessage);
		return { updatedPokemon, targets: [] };
	}

	if (dampy && SELF_DESTRUCTING_MOVES.includes(move.name)) {
		handleDampy(attacker, move, pokemon, setPokemon, addMessage, dampy);
		return { updatedPokemon, targets: [] };
	}

	//MESSAGES
	if (targets.length === 1 && targets[0].id !== attacker.id) {
		addMessage({
			message: `${attacker.data.name} used ${move.name} against ${targets[0].data.name}`,
		});
	} else
		addMessage({
			message: `${attacker.data.name} used ${move.name}`,
		});

	const misses = targets.map((target) => {
		const isFlying =
			target.moveQueue.length > 0 &&
			target.moveQueue[0].type === 'BattleAttack' &&
			target.moveQueue[0].name === 'fly';
		const isUnderground =
			target.moveQueue.length > 0 &&
			target.moveQueue[0].type === 'BattleAttack' &&
			target.moveQueue[0].name === 'dig';
		const { miss, reason } = determineMiss(
			move,
			attacker,
			target,
			battleWeather,
			isFlying,
			isUnderground
		);
		if (miss) {
			handleMiss(attacker, move, pokemon, setPokemon, addMessage, reason);
		}

		return miss;
	});

	return {
		updatedPokemon,
		targets: targets.filter((_, index) => misses[index] === false),
	};
};
