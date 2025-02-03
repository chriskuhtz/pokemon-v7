import { getTypeNames } from '../../../functions/getTypeNames';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';

export const OwnedPokemonCardContent = ({
	ownedPokemon,
	data,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
}) => {
	const typeNames = getTypeNames(data.types);
	return (
		<div
			style={{
				paddingLeft: '.5rem',
				display: 'flex',
				gap: '1.5rem',
				alignItems: 'center',
			}}
		>
			<div>
				<h4>{data.name.toUpperCase()}</h4>
				<h5>{typeNames.join('/')} type</h5>
				<h5>{ownedPokemon.nature} nature</h5>
			</div>

			<div>
				<h4>Moves:</h4>
				<h5>{ownedPokemon.firstMove.name}</h5>
			</div>
		</div>
	);
};
