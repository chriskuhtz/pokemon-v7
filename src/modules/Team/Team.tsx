import { OwnedPokemonCard } from '../../components/OwnedPokemonCard/OwnedPokemonCard';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Team = ({
	team,
	goBack,
	reorderTeam,
}: {
	team: OwnedPokemon[];
	goBack: () => void;
	reorderTeam: (newTeam: OwnedPokemon[]) => void;
}): JSX.Element => {
	return (
		<Page goBack={goBack} headline="Team:">
			<Stack mode="column">
				{team.map((pokemon, index) => (
					<OwnedPokemonCard
						key={pokemon.id}
						pokemon={pokemon}
						reorder={(dir: 'UP' | 'DOWN') => {
							if (index === 0 && dir == 'UP') {
								return;
							}
							if (index === team.length - 1 && dir == 'DOWN') {
								return;
							}
							const displaced =
								dir === 'UP' ? { ...team[index - 1] } : { ...team[index + 1] };

							const newTeam = team.map((p) => {
								if (p.id === displaced.id) {
									return pokemon;
								}
								if (p.id === pokemon.id) {
									return displaced;
								}
								return p;
							});

							reorderTeam(newTeam);
						}}
					/>
				))}
			</Stack>
		</Page>
	);
};
