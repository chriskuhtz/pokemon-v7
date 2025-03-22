import { PokemonName } from '../constants/pokemonNames';

export const deAlternate = (name: PokemonName) => {
	return name
		.replace('-alola', '')
		.replace('-hisui', '')
		.replace('-paldea', '')
		.replace('-galar', '');
};
export const isAlternateForm = (name: PokemonName): boolean => {
	return (
		name.includes('-alola') ||
		name.includes('-paldea') ||
		name.includes('-hisui') ||
		name.includes('-galar')
	);
};

export const keepAlternateFormThroughEvolution = ({
	currentName,
	newName,
}: {
	currentName: PokemonName;
	newName: PokemonName;
}): {
	currentName: PokemonName;
	newName: PokemonName;
} => {
	if (isAlternateForm(currentName)) {
		const alternateSuffix = currentName.split('-')[1];

		return {
			currentName,
			newName: `${newName}-${alternateSuffix}` as PokemonName,
		};
	}

	return { currentName, newName };
};
