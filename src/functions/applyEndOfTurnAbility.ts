import { Message } from '../hooks/useMessageQueue';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';

export const applyEndOfTurnAbility = ({
	pokemon,
	addMessage,
}: {
	pokemon: BattlePokemon;
	addMessage: (x: Message) => void;
}): BattlePokemon => {
	if (pokemon.ability === 'speed-boost') {
		return applyStatChangeToPokemon(
			pokemon,
			'speed',
			1,
			true,
			[],
			addMessage,
			'by speed boost'
		);
	}
	if (
		pokemon.ability === 'limber' &&
		pokemon.primaryAilment?.type === 'paralysis'
	) {
		addMessage({
			message: `${pokemon.data.name} was cured of paralysis by limber`,
		});
		return { ...pokemon, primaryAilment: undefined };
	}
	return pokemon;
};
