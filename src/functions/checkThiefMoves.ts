import { MoveName } from '../constants/movesCheckList';
import { Message } from '../hooks/useMessageQueue';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { isBerry } from '../interfaces/Item';

export const checkThiefMoves = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	moveName: MoveName,
	addMessage: (x: Message) => void
): { updatedAttacker: BattlePokemon; updatedTarget: BattlePokemon } => {
	let updatedAttacker = { ...attacker };
	let updatedTarget = { ...target };
	if (
		moveName === 'thief' ||
		moveName === 'covet' ||
		moveName === 'pluck' ||
		moveName === 'bug-bite'
	) {
		//no held item
		if (updatedAttacker.heldItemName) {
			return { updatedTarget, updatedAttacker };
		}
		//sticky hold etc
		if (
			updatedTarget.ability === 'sticky-hold' ||
			!updatedTarget.heldItemName
		) {
			return { updatedTarget, updatedAttacker };
		}
		//berry move, but not a berry
		if (
			['pluck', 'bug-bite'].includes(moveName) &&
			!isBerry(updatedTarget.heldItemName)
		) {
			return { updatedTarget, updatedAttacker };
		}

		addMessage({
			message: `${updatedAttacker.name} steals ${updatedTarget.name}'s ${updatedTarget.heldItemName}`,
		});
		updatedAttacker = {
			...updatedAttacker,
			heldItemName: updatedTarget.heldItemName,
		};
		updatedTarget = { ...updatedTarget, heldItemName: undefined };
	}
	return { updatedTarget, updatedAttacker };
};
