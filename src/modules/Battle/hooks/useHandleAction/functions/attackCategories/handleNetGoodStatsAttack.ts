import { applyAttackStatChanges } from '../../../../../../functions/applyAttackStatChanges';
import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { getHpPercentage } from '../../../../../../functions/getHpPercentage';
import { arePokemonOfOppositeGenders } from '../../../../../../functions/getRivalryFactor';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { BattleFieldEffect } from '../../../../BattleField';

export const handleNetGoodStatsAttack = ({
	attacker,
	pokemon,
	addMessage,
	move,
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
		if (move.name === 'clangorous-soul') {
			const remaining = getHpPercentage(updatedAttacker);

			if (remaining < 0.33) {
				addMessage({ message: 'it failed' });
				return pokemon;
			} else {
				addMessage({
					message: `${updatedAttacker.name} sacrifficed some of its HP for a boost`,
				});
				updatedAttacker = {
					...updatedAttacker,
					damage:
						updatedAttacker.damage + Math.floor(updatedAttacker.stats.hp / 3),
				};
			}
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
				if (
					move.name === 'captivate' &&
					!arePokemonOfOppositeGenders(attacker.gender, target.gender)
				) {
					addMessage({ message: `${attacker.name} failed to captivate` });
					return updatedTarget;
				}
				if (
					move.name === 'venom-drench' &&
					updatedTarget.primaryAilment?.type !== 'poison'
				) {
					addMessage({ message: `venom drench failed` });
					return updatedTarget;
				}
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
