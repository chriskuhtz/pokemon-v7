import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from '../../../../../../functions/applyStatChangeToPokemon';
import { changeMovePP } from '../../../../../../functions/changeMovePP';
import {
	getRandomEntry,
	getRandomIndex,
} from '../../../../../../functions/filterTargets';
import { getActualTargetId } from '../../../../../../functions/getActualTargetId';
import { getMovesArray } from '../../../../../../functions/getMovesArray';
import { handleMimicOrSketch } from '../../../../../../functions/handleMimic';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { typeEffectivenessChart } from '../../../../../../interfaces/PokemonType';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { handleMoveBlockAilments } from '../../../../functions/handleMoveBlockAilments';
import { handleNoTarget } from '../../../../functions/handleNoTarget';

export const handleUniqueMoves = ({
	attacker,
	pokemon,
	addMessage,
	move,
	battleFieldEffects,
	leave,
	addBattleFieldEffect,
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
	leave: (outcome: 'WIN' | 'LOSS' | 'DRAW') => void;
}): BattlePokemon[] => {
	let updatedPokemon: BattlePokemon[] = [...pokemon];
	const setPokemon = (input: BattlePokemon[]) => (updatedPokemon = input);

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
	let updatedTarget = { ...target };
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

	if (move.name === 'disable') {
		const moves = getMovesArray(target, { filterOutDisabled: false });
		const randomMoveName = moves[getRandomIndex(moves.length)].name;
		if (moves.length === 1) {
			addMessage({ message: `cant disable ${target.data.name}'s only move` });
		} else
			updatedTarget = applySecondaryAilmentToPokemon({
				pokemon: target,
				ailment: 'disable',
				addMessage,
				move: randomMoveName,
			});
	}
	if (move.name === 'encore') {
		const moveName = target.lastUsedMove?.name;
		if (!moveName) {
			addMessage({ message: `it failed` });
		} else
			updatedTarget = applySecondaryAilmentToPokemon({
				pokemon: target,
				ailment: 'encore',
				addMessage,
				move: moveName,
			});
	}
	if (move.name === 'teleport') {
		addMessage({
			message: `${attacker.name} escaped the battle with teleport`,
			onRemoval: () => leave('DRAW'),
		});
		setPokemon(
			updatedPokemon.map((p) => {
				if (p.id === attacker.id) {
					return { ...p, moveQueue: [] };
				}

				return p;
			})
		);
		return updatedPokemon;
	}
	if (move.name === 'mimic') {
		if (target.lastUsedMove) {
			addMessage({
				message: `${updatedAttacker.name} copied ${target.lastUsedMove.name}`,
			});
			updatedAttacker = handleMimicOrSketch(
				updatedAttacker,
				target.lastUsedMove,
				'mimic'
			);
		} else
			addMessage({
				message: `It failed`,
			});
	}
	if (move.name === 'sketch') {
		if (target.lastUsedMove) {
			addMessage({
				message: `${updatedAttacker.name} copied ${target.lastUsedMove.name}`,
			});
			updatedAttacker = handleMimicOrSketch(
				updatedAttacker,
				target.lastUsedMove,
				'sketch'
			);
		} else
			addMessage({
				message: `It failed`,
			});
	}
	if (move.name === 'focus-energy') {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'focused',
			addMessage,
		});
	}
	if (move.name === 'mirror-move') {
		if (attacker.lastReceivedDamage) {
			addMessage({
				message: `${updatedAttacker.name} copied ${attacker.lastReceivedDamage.attack.name}`,
			});
			move = attacker.lastReceivedDamage.attack;
		} else {
			addMessage({ message: `It failed` });
		}
	}
	if (move.name === 'splash') {
		addMessage({ message: 'Nothing happened' });
	}
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
	if (move.name === 'conversion-2') {
		if (updatedAttacker.lastReceivedDamage) {
			const newType = getRandomEntry(
				typeEffectivenessChart[
					updatedAttacker.lastReceivedDamage.attack.data.type.name
				].isNotVeryEffectiveAgainst
			);
			updatedAttacker = applySecondaryAilmentToPokemon({
				pokemon: updatedAttacker,
				ailment: 'color-changed',
				addMessage,
				newType,
			});
		} else addMessage({ message: `It failed to convert to a new type` });
	}
	if (move.name === 'spite') {
		const targetMoves = getMovesArray(updatedTarget, { filterOutEmpty: true });

		if (targetMoves.length === 0) {
			addMessage({ message: 'It failed' });
		} else {
			const chosenMove = getRandomEntry(targetMoves);
			addMessage({ message: `${chosenMove}'s PP was lowered` });

			updatedTarget = {
				...updatedTarget,
				firstMove: {
					...updatedTarget.firstMove,
					usedPP:
						updatedTarget.firstMove.name === chosenMove.name
							? updatedTarget.firstMove.usedPP -
							  getRandomEntry([1, 2, 3, 4, 5, 6])
							: updatedTarget.firstMove.usedPP,
				},
				secondMove: updatedTarget.secondMove
					? {
							...updatedTarget.secondMove,
							usedPP:
								updatedTarget.secondMove.name === chosenMove.name
									? updatedTarget.secondMove.usedPP -
									  getRandomEntry([1, 2, 3, 4, 5, 6])
									: updatedTarget.secondMove.usedPP,
					  }
					: undefined,
				thirdMove: updatedTarget.thirdMove
					? {
							...updatedTarget.thirdMove,
							usedPP:
								updatedTarget.thirdMove.name === chosenMove.name
									? updatedTarget.thirdMove.usedPP -
									  getRandomEntry([1, 2, 3, 4, 5, 6])
									: updatedTarget.thirdMove.usedPP,
					  }
					: undefined,
				fourthMove: updatedTarget.fourthMove
					? {
							...updatedTarget.fourthMove,
							usedPP:
								updatedTarget.fourthMove.name === chosenMove.name
									? updatedTarget.fourthMove.usedPP -
									  getRandomEntry([1, 2, 3, 4, 5, 6])
									: updatedTarget.fourthMove.usedPP,
					  }
					: undefined,
			};
		}
	}
	if (move.name === 'belly-drum') {
		if (updatedAttacker.damage / updatedAttacker.stats.hp > 0.5) {
			addMessage({
				message: `It failed`,
			});
		} else {
			addMessage({
				message: `${updatedAttacker.name} maximised Attack by drumming on its belly too hard`,
			});
			updatedAttacker = applyStatChangeToPokemon(
				{
					...updatedAttacker,
					damage: updatedAttacker.damage + updatedAttacker.stats.hp / 2,
				},
				'attack',
				6,
				true,
				battleFieldEffects,
				addMessage
			);
		}
	}
	if (move.name === 'protect' || move.name === 'detect') {
		if (
			(updatedAttacker.lastUsedMove?.name === 'protect' ||
				updatedAttacker.lastUsedMove?.name === 'detect' ||
				updatedAttacker.lastUsedMove?.name === 'endure') &&
			Math.random() > 0.5
		) {
			addMessage({
				message: `It failed`,
			});
		} else {
			updatedAttacker = { ...updatedAttacker, protected: true };
		}
	}
	if (move.name === 'endure') {
		if (
			(updatedAttacker.lastUsedMove?.name === 'protect' ||
				updatedAttacker.lastUsedMove?.name === 'detect' ||
				updatedAttacker.lastUsedMove?.name === 'endure') &&
			Math.random() > 0.5
		) {
			addMessage({
				message: `It failed`,
			});
		} else {
			updatedAttacker = { ...updatedAttacker, endured: true };
		}
	}
	if (move.name === 'destiny-bond') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'destiny-bonded',
			addMessage,
			targetId: updatedAttacker.id,
		});
	}
	if (move.name === 'mind-reader' || move.name === 'lock-on') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			addMessage,
			ailment: 'mind-read',
			by: updatedAttacker.id,
		});
	}
	if (move.name === 'mean-look') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'mean-looked',
			addMessage,
		});
	}
	if (move.name === 'heal-bell') {
		addMessage({ message: 'All major Status Problems are healed' });
		setPokemon(
			updatedPokemon.map((p) => {
				if (p.id === updatedAttacker.id) {
					return {
						...changeMovePP(
							updatedAttacker,
							move.name,
							underPressure ? -2 : -1
						),
						primaryAilment: undefined,
						lastUsedMove: { name: move.name, data: move.data, usedPP: 0 },
					};
				}
				if (p.ownerId === updatedAttacker.ownerId && p.status === 'ONFIELD') {
					return { ...p, primaryAilment: undefined };
				}

				return p;
			})
		);
	}
	if (move.name === 'pain-split') {
		const totalRemaining =
			updatedAttacker.stats.hp -
			updatedAttacker.damage +
			updatedTarget.stats.hp -
			updatedTarget.damage;
		const remainingForEach = Math.floor(totalRemaining / 2);

		updatedAttacker.damage =
			updatedAttacker.stats.hp - (updatedAttacker.stats.hp - remainingForEach);
		updatedTarget.damage =
			updatedTarget.stats.hp - (updatedTarget.stats.hp - remainingForEach);
	}
	if (move.name === 'spider-web') {
		addBattleFieldEffect({
			type: move.name as BattleFieldEffect['type'],
			ownerId: target.ownerId,
			duration: 9000,
		});
		setPokemon(
			updatedPokemon.map((p) => {
				if (p.id === updatedAttacker.id) {
					return {
						...changeMovePP(updatedAttacker, move.name, -1),
						moveQueue: [],
					};
				}

				return p;
			})
		);
		return updatedPokemon;
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
