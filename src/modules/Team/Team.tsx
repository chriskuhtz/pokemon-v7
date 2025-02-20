import { OwnedPokemonCard } from '../../components/OwnedPokemonCard/OwnedPokemonCard';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Team = ({
	team,
	goBack,
	setTeam,
	changeHeldItem,
	inventory,
}: {
	team: OwnedPokemon[];
	goBack: () => void;
	setTeam: (newTeam: OwnedPokemon[]) => void;
	inventory: Inventory;

	changeHeldItem: (pokemonId: string, newItem?: ItemType) => void;
}): JSX.Element => {
	return (
		<Page goBack={goBack} headline="Team:">
			<Stack mode="column">
				{team.map((pokemon, index) => (
					<OwnedPokemonCard
						key={pokemon.id}
						pokemon={pokemon}
						inventory={inventory}
						takeHeldItem={() => changeHeldItem(pokemon.id)}
						giveHeldItem={(newItem: ItemType) =>
							changeHeldItem(pokemon.id, newItem)
						}
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

							setTeam(newTeam);
						}}
					/>
				))}
			</Stack>
		</Page>
	);
};
