import { isKO } from '../../../functions/isKo';
import { Message } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const checkAndHandleFainting = (
	p: BattlePokemon,
	allPokemon: BattlePokemon[],
	addMessage: (x: Message) => void
): BattlePokemon => {
	const destinyBondPartnerId = p.secondaryAilments.find(
		(a) => a.type === 'destiny-bonded'
	)?.targetId;

	const destinyBondPartner = allPokemon.find(
		(p) => p.id === destinyBondPartnerId
	);

	if (isKO(p) && p.status === 'ONFIELD') {
		if (p.endured) {
			addMessage({ message: `${p.data.name} endured the attack` });
			return { ...p, damage: p.stats.hp - 1, endured: false };
		}
		addMessage({ message: `${p.data.name} fainted` });

		return { ...p, status: 'FAINTED', moveQueue: [], roundsInBattle: 0 };
	}
	if (destinyBondPartner && isKO(destinyBondPartner)) {
		addMessage({
			message: `${p.data.name} fainted because of destiny bond with ${destinyBondPartner.name}`,
		});

		return { ...p, status: 'FAINTED', moveQueue: [], roundsInBattle: 0 };
	}
	return p;
};
