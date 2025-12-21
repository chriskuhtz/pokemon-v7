import { CURSE_DAMAGE_FACTOR } from '../../interfaces/Ailment';
import { BattlePokemon } from '../../interfaces/BattlePokemon';

export const applyCurseDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (pokemon.ability === 'magic-guard') {
		addMessage(`${pokemon.name} prevents damage with magic-guard`);
		return pokemon;
	}
	addMessage(`${pokemon.data.name} is damaged by curse`);
	const nightmareDamage = Math.floor(
		Math.round(CURSE_DAMAGE_FACTOR * pokemon.stats.hp)
	);
	return {
		...pokemon,
		damage: pokemon.damage + nightmareDamage,
	};
};
