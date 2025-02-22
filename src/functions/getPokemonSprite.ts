export const getPokemonSprite = (dexId: number, mode?: 'back'): string =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${
		mode ? `${mode}/` : ''
	}${dexId}.gif`;

// `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
// 	mode ? `${mode}/` : ''
// }${dexId}.png`;
