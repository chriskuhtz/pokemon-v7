import { applyAttackStatChanges } from '../../../../../../functions/applyAttackStatChanges';
import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { BattleFieldEffect } from '../../../../BattleField';

export const handleNetGoodStatsAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	battleFieldEffects,
	target,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleFieldEffects: BattleFieldEffect[];
	target: BattlePokemon;
}): BattlePokemon[] => {
	let updatedAttacker = { ...attacker };
	const updatedTarget = { ...target };
	const move = m;
	const selfTargeting = move.data.target.name === 'user';

	if (selfTargeting) {
		if (move.name === 'defense-curl') {
			updatedAttacker.defenseCurled = true;
		}
		if (move.name === 'charge') {
			updatedAttacker = applySecondaryAilmentToPokemon({
				pokemon: updatedAttacker,
				ailment: 'charge',
				applicator: updatedAttacker,
				addMessage,
			});
		}
		return pokemon.map((p) => {
			if (p.id === attacker.id) {
				return applyAttackStatChanges(
					updatedAttacker,
					updatedAttacker.ability,
					move,
					addMessage,
					true,
					battleFieldEffects
				);
			}
			return p;
		});
	} else {
		return pokemon.map((p) => {
			if (p.id === updatedTarget.id) {
				return applyAttackStatChanges(
					updatedTarget,
					updatedTarget.ability,
					move,
					addMessage,
					false,
					battleFieldEffects
				);
			}
			return p;
		});
	}
};
