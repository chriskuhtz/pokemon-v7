import {
	BURN_DAMAGE_FACTOR,
	POISON_DAMAGE_FACTOR,
} from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const applyPrimaryAilmentDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (pokemon.ability === 'magic-guard') {
		addMessage(`${pokemon.name} prevents damage with magic-guard`);
		return pokemon;
	}
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

		if (pokemon.ability === 'poison-heal') {
			addMessage(`${pokemon.data.name} healed itself with poison heal`);
			return {
				...pokemon,
				damage: Math.max(0, pokemon.damage - toxicDamage),
				primaryAilment: {
					type: 'toxic',
					duration: (pokemon.primaryAilment.duration ?? 1) + 1,
				},
			};
		}

		addMessage(`${pokemon.data.name} is hurt by poison`);
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
		const poisonDamage = Math.round(POISON_DAMAGE_FACTOR * pokemon.stats.hp);

		if (pokemon.ability === 'poison-heal') {
			addMessage(`${pokemon.data.name} healed itself with poison heal`);
			return {
				...pokemon,
				damage: Math.max(0, pokemon.damage - poisonDamage),
				primaryAilment: {
					type: 'toxic',
					duration: (pokemon.primaryAilment.duration ?? 1) + 1,
				},
			};
		}
		addMessage(`${pokemon.data.name} is hurt by poison`);
		return {
			...pokemon,
			damage: pokemon.damage + poisonDamage,
		};
	}
	return pokemon;
};
