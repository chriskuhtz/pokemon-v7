import { applyPrimaryAilmentToPokemon } from '../../../../../../functions/applyPrimaryAilmentToPokemon';
import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from '../../../../../../functions/applyStatChangeToPokemon';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { BattleTerrain, TerrainObject } from '../../../useBattleTerrain';
import { WeatherObject } from '../../../useBattleWeather';
import { handleAbilitiesAfterAttack } from '../handleAbilitiesAfterAttack';

export const handleSwaggerAttack = ({
	attacker,
	pokemon,
	addMessage,
	move,
	battleWeather,
	terrain,
	battleFieldEffects,
	target,
	setTerrain,
	setWeather,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	terrain: BattleTerrain | undefined;
	battleFieldEffects: BattleFieldEffect[];
	target: BattlePokemon;
	setTerrain: (x: TerrainObject) => void;
	setWeather: (x: WeatherObject) => void;
}): BattlePokemon[] => {
	let updatedAttacker = { ...attacker };
	let updatedTarget = { ...target };

	const attackerIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedAttacker.ownerId
	);

	if (move.name === 'flatter') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'confusion',
			addMessage,
			applicator: updatedAttacker,
		});
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'special-attack',
			2,
			false,
			battleFieldEffects,
			addMessage
		);
	}
	if (move.name === 'swagger') {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'confusion',
			addMessage,
			applicator: updatedAttacker,
		});
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			2,
			false,
			battleFieldEffects,
			addMessage
		);
	}
	if (move.name === 'toxic-thread') {
		updatedTarget = applyPrimaryAilmentToPokemon(
			updatedTarget,
			updatedAttacker,
			'poison',
			addMessage,
			battleWeather,
			battleFieldEffects,
			terrain
		).updatedTarget;
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'speed',
			-1,
			false,
			battleFieldEffects,
			addMessage
		);
	}

	const { updatedAttacker: afterAbilityCheck, updatedTarget: t } =
		handleAbilitiesAfterAttack(
			updatedAttacker,
			updatedTarget,
			move,
			addMessage,
			attackerIsSafeguarded,
			battleWeather,
			false,
			0,
			battleFieldEffects,
			target.stats.hp,
			terrain,
			setTerrain,
			setWeather
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
