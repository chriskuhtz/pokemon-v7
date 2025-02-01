import { getItemUrl } from '../../functions/getItemUrl';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Card } from '../../uiComponents/Card/Card';

export const PokemonCard = ({ pokemon }: { pokemon: OwnedPokemon }) => {
	const { res } = useGetPokemonData(pokemon.dexId);

	if (!res) {
		return <></>;
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
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexId}.png`}
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
