import { OwnedPokemonCard } from '../../components/OwnedPokemonCard/OwnedPokemonCard';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Team = ({
	team,
	goBack,
}: {
	team: OwnedPokemon[];
	goBack: () => void;
}): JSX.Element => {
	return (
		<Page goBack={goBack} headline="Team:">
			<Stack mode="column">
				{team.map((pokemon) => (
					<OwnedPokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</Stack>
		</Page>
	);
};
