import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Card } from '../../uiComponents/Card/Card';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';

export const PokemonCard = ({ pokemon }: { pokemon: OwnedPokemon }) => {
	const { res } = useGetPokemonData(pokemon.dexId);

	if (!res) {
		return <LoadingScreen />;
	}

	return (
		<Card
			key={pokemon.id}
			icon={
				<IconSolarSystem
					sunUrl={getPokemonSprite(pokemon.dexId)}
					firstPlanetUrl={getItemUrl(pokemon.ball)}
				/>
			}
			content={<h4>{res.name.toUpperCase()}</h4>}
			actionElements={[]}
		/>
	);
};
