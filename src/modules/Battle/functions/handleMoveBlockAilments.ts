import { Message } from '../../../hooks/useMessageQueue';
import {
	CONFUSION_HURT_CHANCE,
	INFATUATION_CHANCE,
	PARA_CHANCE,
	UNFREEZE_CHANCE,
} from '../../../interfaces/Ailment';
import { BattleAttack, ChargeUp } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { handleAsleep } from './handleAsleep';
import { handleConfused } from './handleConfused';
import { handleFrozen } from './handleFrozen';
import { handleInfatuated } from './handleInfatuated';
import { handleParalyzed } from './handleParalyzed';

export const handleMoveBlockAilments = ({
	attacker,
	attack,
	addMessage,
	targetId,
}: {
	attacker: BattlePokemon;
	attack: BattleAttack | ChargeUp;
	targetId?: string;
	addMessage: (x: Message) => void;
}): { canAttack: boolean; updatedAttacker: BattlePokemon } => {
	let updatedAttacker = { ...attacker };

	if (updatedAttacker.primaryAilment?.type === 'freeze') {
		const defrosted = Math.random() <= UNFREEZE_CHANCE;
		if (defrosted) {
			addMessage({ message: `${attacker.data.name} was thawed out` });
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
			addMessage({ message: `${attacker.data.name} woke Up` });
			updatedAttacker.primaryAilment = undefined;
			updatedAttacker.secondaryAilments = (
				updatedAttacker.secondaryAilments ?? []
			).filter((a) => a.type !== 'nightmare');
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
	if (
		updatedAttacker.secondaryAilments.some(
			(ail) => ail.type == 'infatuation' && ail.targetId == targetId
		) &&
		Math.random() <= INFATUATION_CHANCE
	) {
		updatedAttacker = handleInfatuated(attacker, addMessage);
		return { canAttack: false, updatedAttacker };
	}

	const confusionAilment = updatedAttacker.secondaryAilments.find(
		(a) => a.type === 'confusion'
	);
	if (confusionAilment) {
		const snappedOut = confusionAilment && confusionAilment.duration === 0;
		const hitHimself = Math.random() <= CONFUSION_HURT_CHANCE;
		addMessage({ message: `${attacker.data.name} is confused` });
		if (snappedOut) {
			addMessage({ message: `${attacker.data.name} snapped out of confusion` });
			updatedAttacker.secondaryAilments =
				updatedAttacker.secondaryAilments.filter((a) => a.type !== 'confusion');
		} else {
			updatedAttacker = handleConfused(attacker, addMessage, hitHimself);
			return { canAttack: !hitHimself, updatedAttacker };
		}
	}
	const disabledMove =
		updatedAttacker.secondaryAilments.find((a) => a.type === 'disable')
			?.move === attack.name;
	if (disabledMove) {
		addMessage({
			message: `${attacker.data.name}'s ${attack.name} is disabled`,
		});
		return {
			canAttack: false,
			updatedAttacker: { ...updatedAttacker, moveQueue: [] },
		};
	}
	return { canAttack: true, updatedAttacker };
};
