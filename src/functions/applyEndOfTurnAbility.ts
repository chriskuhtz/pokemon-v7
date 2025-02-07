import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';

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
		dispatchToast('how do we handle speed boost');
	}
	return;
};
