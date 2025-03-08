import { calculateDamage } from '../../../functions/calculateDamage';
import { Message } from '../../../hooks/useMessageQueue';
import { CONFUSION_POWER } from '../../../interfaces/Ailment';
import { BattleAttack } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { MoveDto } from '../../../interfaces/Move';

export const handleConfused = (
	attacker: BattlePokemon,
	addMessage: (x: Message) => void,
	hitHimself: boolean
) => {
	//updated Attacker
	let updatedAttacker: BattlePokemon = {
		...attacker,
		secondaryAilments: attacker.secondaryAilments.map((a) => {
			if (a.type === 'confusion') {
				return { ...a, duration: a.duration - 1 };
			}
			return a;
		}),
	};
	if (hitHimself) {
		addMessage({ message: `${attacker.data.name} hit himself in confusion ` });
		updatedAttacker = {
			...updatedAttacker,
			damage:
				updatedAttacker.damage +
				calculateDamage(
					attacker,
					attacker,
					{
						data: {
							name: '',
							power: CONFUSION_POWER,
							damage_class: { name: 'physical', url: '' },
							type: { name: 'typeless' },
							meta: { crit_rate: 0 },
						} as MoveDto,
					} as BattleAttack,
					undefined,
					false,
					false,
					false
				),
		};
	}

	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };
	//Dont reduce pp, didnt attack

	return updatedAttacker;
};
