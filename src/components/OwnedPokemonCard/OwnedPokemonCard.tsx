import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { getTypeNames } from '../../functions/getTypeNames';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Card } from '../../uiComponents/Card/Card';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';
import { OwnedPokemonCardContent } from './components/OwnedPokemonCardContent';

export const OwnedPokemonCard = ({ pokemon }: { pokemon: OwnedPokemon }) => {
	const { res } = useGetPokemonData(pokemon.dexId);

	if (!res) {
		return <LoadingScreen />;
	}

	const { types } = res;

	const typeNames = getTypeNames(types);

	return (
		<Card
			key={pokemon.id}
			icon={
				<IconSolarSystem
					sunUrl={getPokemonSprite(pokemon.dexId)}
					firstPlanetUrl={`/typeIcons/${typeNames[0]}.png`}
					secondPlanetUrl={
						typeNames.length > 1 ? `/typeIcons/${typeNames[1]}.png` : undefined
					}
					thirdPlanetUrl={getItemUrl(pokemon.ball)}
					fourthPlanetUrl={
						pokemon.heldItemName ? getItemUrl(pokemon.heldItemName) : undefined
					}
				/>
			}
			content={<OwnedPokemonCardContent ownedPokemon={pokemon} data={res} />}
			actionElements={[]}
		/>
	);
};
