import { PokemonType } from '../interfaces/PokemonType';

export const typeColors: Record<PokemonType, string> = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
	typeless: '#ffffff',
};

export const typeContrastColors: Record<PokemonType, string> = {
	normal: 'white',
	fire: 'black',
	water: 'white',
	electric: 'black',
	grass: 'black',
	ice: 'black',
	fighting: 'white',
	poison: 'white',
	ground: 'black',
	flying: 'black',
	psychic: 'black',
	bug: 'black',
	rock: 'black',
	ghost: 'white',
	dragon: 'white',
	dark: 'white',
	steel: 'black',
	fairy: 'black',
	typeless: 'black',
};

export const percentageBasedColor = (
	percentage: number
): { color: string; contrast: string } => {
	if (percentage < 0.25) {
		return {
			color: typeColors.fighting,
			contrast: typeContrastColors.fighting,
		};
	}
	if (percentage < 0.5) {
		return {
			color: typeColors.electric,
			contrast: typeContrastColors.electric,
		};
	}
	return { color: typeColors.grass, contrast: typeContrastColors.grass };
};
