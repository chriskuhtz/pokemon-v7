import { applyAttackAilmentsToPokemon } from '../../../../../../functions/applyAttackAilmentsToPokemon';
import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { LEECH_DAMAGE_FACTOR } from '../../../../../../interfaces/Ailment';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { handleAbilitiesAfterAttack } from '../handleAbilitiesAfterAttack';

export const handleAilmentAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	battleWeather,
	battleFieldEffects,
	target,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	battleFieldEffects: BattleFieldEffect[];
	target: BattlePokemon;
}): BattlePokemon[] => {
	let updatedAttacker = { ...attacker };
	let updatedTarget = { ...target };
	const move = m;

	const targetIsSafeguarded =
		battleFieldEffects.some(
			(b) => b.type === 'safeguard' && b.ownerId === updatedTarget.ownerId
		) && attacker.ability !== 'infiltrator';
	const attackerIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedAttacker.ownerId
	);

	if (move.name === 'foresight') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			addMessage,
			ailment: 'foresighted',
			applicator: updatedAttacker,
		});
	}
	if (move.name === 'torment') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			addMessage,
			ailment: 'torment',
			applicator: updatedAttacker,
		});
	}
	if (move.name === 'perish-song') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'perish-songed',
			addMessage,
			applicator: updatedAttacker,
		});
	}
	if (move.name === 'attract') {
		if (updatedTarget.gender === 'GENDERLESS') {
			addMessage({ message: 'It failed' });
		} else
			updatedTarget = applySecondaryAilmentToPokemon({
				pokemon: updatedTarget,
				addMessage,
				ailment: 'infatuation',
				targetId: updatedAttacker.id,
				applicator: updatedTarget,
			});

		if (getHeldItem(updatedTarget) === 'destiny-knot') {
			addMessage({ message: 'destiny knot, biatch' });

			updatedAttacker = applySecondaryAilmentToPokemon({
				pokemon: updatedAttacker,
				addMessage,
				ailment: 'infatuation',
				targetId: updatedTarget.id,
				applicator: updatedTarget,
			});
		}
	}
	if (move.name === 'nightmare') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'nightmare',
			addMessage,
			applicator: updatedTarget,
		});
	}
	if (move.name === 'leech-seed') {
		const bigRootFactor = getHeldItem(updatedAttacker) === 'big-root' ? 1.3 : 1;
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'leeching-on',
			addMessage,
			healAmount: Math.floor(
				updatedTarget.stats.hp * LEECH_DAMAGE_FACTOR * bigRootFactor
			),
			applicator: updatedTarget,
		});
	}

	//ATTACKER UPDATES

	//TARGET
	//apply ailments
	const { updatedApplicator: a, updatedTarget: b } =
		applyAttackAilmentsToPokemon(
			updatedTarget,
			updatedAttacker,
			move,
			addMessage,
			battleWeather,
			targetIsSafeguarded
		);
	updatedAttacker = a;
	updatedTarget = b;

	const { updatedAttacker: afterAbilityCheck, updatedTarget: t } =
		handleAbilitiesAfterAttack(
			updatedAttacker,
			updatedTarget,
			move,
			addMessage,
			attackerIsSafeguarded,
			battleWeather,
			undefined,
			0,
			battleFieldEffects
		);
	updatedAttacker = { ...afterAbilityCheck };
	updatedTarget = { ...t };

	return pokemon.map((p) => {
		if (p.id === updatedAttacker.id) {
			return updatedAttacker;
		}
		if (p.id === updatedTarget.id) {
			return updatedTarget;
		}
		return p;
	});
};
