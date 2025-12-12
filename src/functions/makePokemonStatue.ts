import { ActivePokemonStatue, PokemonStatue } from '../interfaces/Occupant';
import { CharacterOrientation, SaveFile } from '../interfaces/SaveFile';

export const makePokemonStatue = ({
	x,
	y,
	orientation,
	dexId,
	dialogue,
	activeCondition,
}: {
	x: number;
	y: number;
	orientation: CharacterOrientation;
	dexId: number;
	dialogue: string[];
	activeCondition: (s: SaveFile) => boolean;
}): [ActivePokemonStatue, PokemonStatue] => {
	return [
		{
			id: `statue${x}${y}${orientation}${dexId}`,
			type: 'ACTIVEPOKEMONSTATUE',
			x,
			y,
			dexId,
			orientation,
			dialogue,
			conditionFunction: (s) => activeCondition(s),
		},
		{
			id: `statue${x}${y}${orientation}${dexId}`,
			type: 'POKEMONSTATUE',
			x,
			y,
			dexId,
			orientation,
			dialogue,
			conditionFunction: (s) => !activeCondition(s),
		},
	];
};
