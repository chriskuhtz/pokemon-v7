import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Card } from '../../uiComponents/Card/Card';
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
				<div
					style={{
						marginBottom: '-36px',
						width: '96px',
					}}
				>
					<img
						style={{ border: '2px solid black', borderRadius: '9000px' }}
						src={getPokemonSprite(pokemon.dexId)}
					/>
					<img
						style={{ position: 'relative', top: '-32px', right: '-64px' }}
						src={getItemUrl(pokemon.ball)}
					/>
				</div>
			}
			content={<h4>{res.name.toUpperCase()}</h4>}
			actionElements={[]}
		/>
	);
};
