import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from '../../../../../../functions/applyStatChangeToPokemon';
import { changeMovePP } from '../../../../../../functions/changeMovePP';
import {
	getRandomEntry,
	getRandomIndex,
} from '../../../../../../functions/filterTargets';
import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { getMovesArray } from '../../../../../../functions/getMovesArray';
import { handleMimicOrSketch } from '../../../../../../functions/handleMimic';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { typeEffectivenessChart } from '../../../../../../interfaces/PokemonType';
import { BattleFieldEffect } from '../../../../BattleField';

export const handleUniqueMoves = ({
	attacker,
	pokemon,
	addMessage,
	move,
	battleFieldEffects,
	leave,
	addBattleFieldEffect,
	target,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	addBattleFieldEffect: (x: BattleFieldEffect) => void;
	battleFieldEffects: BattleFieldEffect[];
	leave: (outcome: 'WIN' | 'LOSS' | 'DRAW') => void;
	target: BattlePokemon;
}): BattlePokemon[] => {
	let updatedAttacker = { ...attacker };
	let updatedTarget = { ...target };
	let updatedPokemon: BattlePokemon[] = [...pokemon];
	const setPokemon = (input: BattlePokemon[]) => (updatedPokemon = input);

	const underPressure = battleFieldEffects.some(
		(b) => b.type === 'pressure' && b.ownerId !== attacker.ownerId
	);
	const targetIsAromaVeiled = battleFieldEffects.some(
		(b) => b.type === 'aroma-veil' && b.ownerId !== target.ownerId
	);

	if (
		['disable', 'encore', 'taunt'].includes(move.name) &&
		targetIsAromaVeiled
	) {
		addMessage({ message: `${updatedTarget.name} is protected by aroma veil` });
	}

	if (move.name === 'disable' && !targetIsAromaVeiled) {
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
				applicator: updatedAttacker,
			});
	}
	if (move.name === 'encore' && !targetIsAromaVeiled) {
		const moveName = target.lastUsedMove?.name;
		if (!moveName) {
			addMessage({ message: `it failed` });
		} else
			updatedTarget = applySecondaryAilmentToPokemon({
				pokemon: target,
				ailment: 'encore',
				addMessage,
				move: moveName,
				applicator: updatedAttacker,
			});
	}
	if (move.name === 'helping-hand') {
		updatedTarget = { ...updatedTarget, helpingHanded: true };
	}
	if (move.name === 'taunt' && !targetIsAromaVeiled) {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: target,
			ailment: 'taunt',
			addMessage,
			applicator: updatedAttacker,
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
			applicator: updatedAttacker,
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
			applicator: updatedAttacker,
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
				applicator: updatedAttacker,
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
	if (move.name === 'memento') {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			-2,
			false,
			battleFieldEffects,
			addMessage
		);
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'special-attack',
			-2,
			false,
			battleFieldEffects,
			addMessage
		);
		updatedAttacker = { ...updatedAttacker, damage: updatedAttacker.stats.hp };
	}
	if (move.name === 'psych-up') {
		addMessage({
			message: `${updatedAttacker.name} copied ${updatedTarget.name}'s stat changes`,
		});
		updatedAttacker = {
			...updatedAttacker,
			statBoosts: updatedTarget.statBoosts,
		};
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
			applicator: updatedAttacker,
		});
	}
	if (move.name === 'mind-reader' || move.name === 'lock-on') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			addMessage,
			ailment: 'mind-read',
			by: updatedAttacker.id,
			applicator: updatedAttacker,
		});
	}
	if (move.name === 'mean-look') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'mean-looked',
			addMessage,
			applicator: updatedAttacker,
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
	}
	if (move.name === 'trick') {
		addMessage({
			message: `${updatedAttacker.name} tricked ${updatedTarget.name} into swapping held items`,
		});
		const attackerItem = updatedAttacker.heldItemName;
		const targetItem = updatedTarget.heldItemName;
		updatedAttacker = { ...updatedAttacker, heldItemName: targetItem };
		updatedTarget = { ...updatedTarget, heldItemName: attackerItem };
	}
	if (move.name === 'role-play') {
		addMessage({
			message: `${updatedAttacker.name} copied ${updatedTarget.name}´s ability ${updatedTarget.ability}`,
		});

		updatedAttacker = { ...updatedAttacker, ability: updatedTarget.ability };
	}
	if (move.name === 'trick') {
		addMessage({
			message: `${updatedAttacker.name} copied ${updatedTarget.name}´s ability ${updatedTarget.ability}`,
		});
		updatedAttacker = { ...updatedAttacker, ability: updatedTarget.ability };
	}
	if (move.name === 'recycle') {
		if (!updatedAttacker.consumedBerry || !!getHeldItem(updatedAttacker)) {
			addMessage({
				message: `It failed`,
			});
		}

		addMessage({
			message: `${updatedAttacker.name} recycled its ${updatedAttacker.consumedBerry}`,
		});
		updatedAttacker = {
			...updatedAttacker,
			heldItemName: updatedAttacker.consumedBerry,
			consumedBerry: undefined,
		};
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
