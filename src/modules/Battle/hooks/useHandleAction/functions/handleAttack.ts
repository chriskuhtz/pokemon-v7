import { calculateDamage } from '../../../../../functions/calculateDamage';
import { handleFlinching } from '../../../../../functions/handleFlinching';
import { isKO } from '../../../../../functions/isKo';
import { reduceMovePP } from '../../../../../functions/reduceMovePP';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { handleFainting } from '../../../functions/handleFainting';
import { handleNoTarget } from '../../../functions/handleNoTarget';

export const handleAttack = ({
	attacker,
	pokemon,
	setPokemon,
	addMessage,
	move,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>;
	addMessage: (x: string) => void;
	move: BattleAttack;
}): void => {
	const target = pokemon.find(
		(p) => p.id === move.targetId && p.status === 'ONFIELD'
	);
	if (!target) {
		handleNoTarget(attacker, move, setPokemon, addMessage);
		return;
	}
	//TODO: handle self targeting
	if (target.id === attacker.id) {
		console.warn('attacking yourself much', attacker.data.name);
	}

	//MESSAGES
	addMessage(
		`${attacker.data.name} used ${move.name} against ${target.data.name}`
	);

	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };
	//2. reduce pp
	updatedAttacker = reduceMovePP(updatedAttacker, move.name);

	//updated Target
	let updatedTarget = { ...target };
	//1. apply damage
	updatedTarget = {
		...updatedTarget,
		damage:
			updatedTarget.damage +
			calculateDamage(
				updatedAttacker,
				target,
				move,
				undefined,
				true,
				addMessage
			),
	};
	//2. check for fainting
	if (isKO(updatedTarget)) {
		updatedTarget = handleFainting(updatedTarget, addMessage);
	}
	//3. check for flinch
	if (!isKO(updatedTarget)) {
		updatedTarget = handleFlinching(
			updatedAttacker,
			updatedTarget,
			move,
			addMessage
		);
	}

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				return updatedAttacker;
			}
			if (p.id === updatedTarget.id) {
				return updatedTarget;
			}
			return p;
		})
	);
};
