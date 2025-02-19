import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';

export const applyEndOfTurnAbility = ({
	pokemon,
	addMessage,
}: {
	pokemon: BattlePokemon;
	addMessage: (x: string) => void;
}): BattlePokemon => {
	if (pokemon.ability === 'speed-boost') {
		return applyStatChangeToPokemon(
			pokemon,
			'speed',
			1,
			addMessage,
			'by speed boost'
		);
	}
	if (
		pokemon.ability === 'limber' &&
		pokemon.primaryAilment?.type === 'paralysis'
	) {
		addMessage(`${pokemon.data.name} was cured of paralysis by limber`);
		return { ...pokemon, primaryAilment: undefined };
	}
	return pokemon;
};
