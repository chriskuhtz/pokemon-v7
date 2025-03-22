import {
	BURN_DAMAGE_FACTOR,
	POISON_DAMAGE_FACTOR,
} from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const applyPrimaryAilmentDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (pokemon.primaryAilment?.type === 'burn') {
		addMessage(`${pokemon.data.name} is hurt by burn`);

		const heatProofFactor = pokemon.ability === 'heatproof' ? 0.5 : 1;
		const burnDamage =
			Math.round(BURN_DAMAGE_FACTOR * pokemon.stats.hp) * heatProofFactor;
		return {
			...pokemon,
			damage: pokemon.damage + burnDamage,
		};
	}
	if (pokemon.primaryAilment?.type === 'toxic') {
		addMessage(`${pokemon.data.name} is hurt by poison`);

		const toxicDamage =
			Math.round(POISON_DAMAGE_FACTOR * pokemon.stats.hp) *
			(pokemon.primaryAilment.duration ?? 1);
		return {
			...pokemon,
			damage: pokemon.damage + toxicDamage,
			primaryAilment: {
				type: 'toxic',
				duration: (pokemon.primaryAilment.duration ?? 1) + 1,
			},
		};
	}
	if (pokemon.primaryAilment?.type === 'poison') {
		addMessage(`${pokemon.data.name} is hurt by poison`);

		const poisonDamage = Math.round(POISON_DAMAGE_FACTOR * pokemon.stats.hp);
		return {
			...pokemon,
			damage: pokemon.damage + poisonDamage,
		};
	}
	return pokemon;
};
