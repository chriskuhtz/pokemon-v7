import { animationTimer } from '../../../../../../constants/gameData';
import { AddToastFunction } from '../../../../../../hooks/useToasts';
import { UNFREEZE_CHANCE } from '../../../../../../interfaces/Ailment';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';

export const handleCureAilmentsStep = (
	pokemon: BattlePokemon,
	dispatchToast: AddToastFunction,
	setPokemon: (x: BattlePokemon) => void,
	followPath: () => void
): NodeJS.Timeout | undefined => {
	const defrosted =
		pokemon.primaryAilment?.type === 'freeze' &&
		Math.random() < UNFREEZE_CHANCE;

	const wokeUp =
		pokemon.primaryAilment?.type === 'sleep' &&
		['vital-spirit', 'insomnia'].includes(pokemon.ability);

	if (!pokemon.primaryAilment || !defrosted || !wokeUp) {
		followPath();
		return;
	}

	return setTimeout(() => {
		if (defrosted) {
			dispatchToast(`${pokemon.data.name} was defrosted`);
		}
		if (wokeUp) {
			dispatchToast(`${pokemon.data.name} woke up`);
		}
		setPokemon({ ...pokemon, primaryAilment: undefined });
		followPath();
	}, animationTimer);
};
