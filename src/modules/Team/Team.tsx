import { PokemonCard } from '../../components/PokemonCard/PokemonCard';
import { SaveFile } from '../../hooks/useSaveFile';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Team = ({
	team,
	goBack,
}: {
	team: SaveFile['pokemon'];
	goBack: () => void;
}): JSX.Element => {
	return (
		<Page goBack={goBack} headline="Team:">
			<Stack>
				{team.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</Stack>
		</Page>
	);
};
