import { CSSProperties } from 'react';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Banner } from '../../uiComponents/Banner/Banner';
import { PokemonSprite } from '../PokemonSprite/PokemonSprite';

export const PokemonIconBanner = ({
	message,
	pokemon,
	backgroundColor,
	flexDirection,
}: {
	message: string;
	pokemon: BattlePokemon;
	backgroundColor?: string;
	flexDirection?: CSSProperties['flexDirection'];
}) => {
	return (
		<Banner backgroundColor={backgroundColor} flexDirection={flexDirection}>
			{message}

			<PokemonSprite name={pokemon.name} config={{ shiny: pokemon.shiny }} />
		</Banner>
	);
};
