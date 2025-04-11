import { getMiddleOfThree } from '../../../../../../functions/getMiddleOfThree';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';

export const handleHealAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
}): BattlePokemon[] => {
	let updatedAttacker = { ...attacker };

	const move = m;

	addMessage({ message: `${updatedAttacker.name} healed itself` });
	updatedAttacker = {
		...updatedAttacker,
		damage: getMiddleOfThree([
			0,
			updatedAttacker.damage -
				updatedAttacker.stats.hp * (100 / move.data.meta.healing),
			updatedAttacker.stats.hp,
		]),
		moveQueue: [],
	};

	return pokemon.map((p) => {
		if (p.id === updatedAttacker.id) {
			return updatedAttacker;
		}

		return p;
	});
};
