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

		const burnDamage = Math.floor(BURN_DAMAGE_FACTOR * pokemon.stats.hp);
		return {
			...pokemon,
			damage: pokemon.damage + burnDamage,
		};
	}
	if (pokemon.primaryAilment?.type === 'poison') {
		addMessage(`${pokemon.data.name} is hurt by poison`);

		const poisonDamage = Math.floor(POISON_DAMAGE_FACTOR * pokemon.stats.hp);
		return {
			...pokemon,
			damage: pokemon.damage + poisonDamage,
		};
	}
	return pokemon;
};
