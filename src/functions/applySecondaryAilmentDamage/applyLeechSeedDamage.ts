import { LEECH_DAMAGE_FACTOR } from '../../interfaces/Ailment';
import { BattlePokemon } from '../../interfaces/BattlePokemon';

export const applyLeechSeedDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (pokemon.ability === 'magic-guard') {
		addMessage(`${pokemon.name} prevents damage with magic-guard`);
		return pokemon;
	}
	addMessage(`${pokemon.data.name} had its energy drained`);
	const leechDamage = Math.round(LEECH_DAMAGE_FACTOR * pokemon.stats.hp);
	return {
		...pokemon,
		damage: pokemon.damage + leechDamage,
	};
};
