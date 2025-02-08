import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyStatBoostToPokemon } from './applyStatBoostToPokemon';

export const applyEndOfTurnAbility = ({
	pokemon,
	setPokemon,
	dispatchToast,
}: {
	pokemon: BattlePokemon;
	setPokemon: (x: BattlePokemon) => void;
	dispatchToast: AddToastFunction;
}) => {
	if (pokemon.ability === 'speed-boost') {
		dispatchToast(`${pokemon.data.name}´s speed boost`);
		setPokemon(applyStatBoostToPokemon(pokemon, 'speed', 1, dispatchToast));
	}
	return;
};
