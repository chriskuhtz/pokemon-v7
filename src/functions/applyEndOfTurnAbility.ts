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
		setPokemon(
			applyStatBoostToPokemon(
				pokemon,
				'speed',
				1,
				dispatchToast,
				'by speed boost'
			)
		);
	}
	if (
		pokemon.ability === 'limber' &&
		pokemon.primaryAilment?.type === 'paralysis'
	) {
		dispatchToast(`${pokemon.data.name} was cured of paralysis by limber`);
		setPokemon({ ...pokemon, primaryAilment: undefined });
	}
	return;
};
