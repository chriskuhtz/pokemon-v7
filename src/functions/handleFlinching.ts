import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { determineTypeFactor } from './determineTypeFactor';
import { targetFlinched } from './targetFlinched';

export const handleFlinching = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	attack: BattleAttack,
	addMessage: (x: Message) => void
): BattlePokemon => {
	const typeFactor = determineTypeFactor(target, attacker, attack);

	if (typeFactor === 0) {
		//moves that dont do damge cant flinch
		return target;
	}
	if (!target.moveQueue.some((m) => m.round === attack.round)) {
		//target has already moved, cant flinch anymore
		return target;
	}
	const willFlinch = targetFlinched(attacker, target, attack);

	if (willFlinch) {
		addMessage({ message: `${target.data.name} flinched!` });
		if (target.ability === 'steadfast') {
			return applyStatChangeToPokemon(
				{ ...target, moveQueue: [] },
				'speed',
				1,
				true,
				[],
				addMessage,
				'with steadfast'
			);
		} else return { ...target, moveQueue: [] };
	}

	return target;
};
