import {
	CONFUSION_HURT_CHANCE,
	PARA_CHANCE,
	UNFREEZE_CHANCE,
} from '../../../interfaces/Ailment';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { handleAsleep } from './handleAsleep';
import { handleConfused } from './handleConfused';
import { handleFrozen } from './handleFrozen';
import { handleParalyzed } from './handleParalyzed';

export const handleMoveBlockAilments = ({
	attacker,
	addMessage,
}: {
	attacker: BattlePokemon;
	addMessage: (x: string) => void;
}): { canAttack: boolean; updatedAttacker: BattlePokemon } => {
	let updatedAttacker = { ...attacker };

	if (updatedAttacker.primaryAilment?.type === 'freeze') {
		const defrosted = Math.random() <= UNFREEZE_CHANCE;
		if (defrosted) {
			addMessage(`${attacker.data.name} was thawed out`);
			updatedAttacker.primaryAilment = undefined;
		} else {
			updatedAttacker = handleFrozen(attacker, addMessage);
			return { canAttack: false, updatedAttacker };
		}
	}
	if (updatedAttacker.primaryAilment?.type === 'sleep') {
		const wokeUp =
			updatedAttacker.primaryAilment.duration &&
			updatedAttacker.primaryAilment.duration <= 0;
		if (wokeUp) {
			addMessage(`${attacker.data.name} woke Up`);
			updatedAttacker.primaryAilment = undefined;
		} else {
			updatedAttacker = handleAsleep(attacker, addMessage);
			return { canAttack: false, updatedAttacker };
		}
	}
	if (
		updatedAttacker.primaryAilment?.type === 'paralysis' &&
		Math.random() <= PARA_CHANCE
	) {
		updatedAttacker = handleParalyzed(attacker, addMessage);
		return { canAttack: false, updatedAttacker };
	}

	const confusionAilment = updatedAttacker.secondaryAilments.find(
		(a) => a.type === 'confusion'
	);
	if (confusionAilment) {
		const snappedOut = confusionAilment && confusionAilment.duration === 0;
		const hitHimself = Math.random() <= CONFUSION_HURT_CHANCE;
		addMessage(`${attacker.data.name} is confused`);
		if (snappedOut) {
			addMessage(`${attacker.data.name} snapped out of confusion`);
			updatedAttacker.secondaryAilments =
				updatedAttacker.secondaryAilments.filter((a) => a.type !== 'confusion');
		} else {
			updatedAttacker = handleConfused(attacker, addMessage, hitHimself);
			return { canAttack: !hitHimself, updatedAttacker };
		}
	}
	return { canAttack: true, updatedAttacker };
};
