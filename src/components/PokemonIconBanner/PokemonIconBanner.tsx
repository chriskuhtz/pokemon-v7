import { CSSProperties } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Banner } from '../../uiComponents/Banner/Banner';

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
			<img
				height={battleSpriteSize}
				width={battleSpriteSize}
				src={getPokemonSprite(pokemon.name)}
			/>
		</Banner>
	);
};
