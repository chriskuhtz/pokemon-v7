import { PARA_CHANCE, UNFREEZE_CHANCE } from '../../../interfaces/Ailment';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { handleAsleep } from './handleAsleep';
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
	return { canAttack: true, updatedAttacker };
};
