import { useMemo } from 'react';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { AddToastFunction } from '../../hooks/useToasts';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const PokemonStorage = ({
	allPokemon,
	goBack,
	setPokemon,
	addToast,
}: {
	allPokemon: OwnedPokemon[];
	goBack: () => void;
	setPokemon: (x: OwnedPokemon[]) => void;
	addToast: AddToastFunction;
}): JSX.Element => {
	const team = useMemo(() => allPokemon.filter((p) => p.onTeam), [allPokemon]);
	const stored = useMemo(
		() => allPokemon.filter((p) => p.onTeam === false),
		[allPokemon]
	);
	const togglePokemonOnTeam = (id: string) => {
		setPokemon(
			allPokemon.map((p) => {
				if (p.id === id) {
					return { ...p, onTeam: !p.onTeam };
				}
				return p;
			})
		);
	};

	return (
		<Page goBack={goBack} headline="Storage:">
			<h2>Team:</h2>
			<Stack mode="row">
				{team.map((pokemon) => (
					<IconSolarSystem
						sun={{ url: getPokemonSprite(pokemon.dexId) }}
						firstPlanetUrl={getItemUrl(pokemon.ball)}
						key={pokemon.id}
						onClick={() => {
							if (team.length === 1) {
								addToast('One Pokemon must remain on the team!', 'ERROR');
								return;
							}
							togglePokemonOnTeam(pokemon.id);
						}}
					/>
				))}
			</Stack>
			<h2>Storage:</h2>

			<Stack mode="row">
				{stored.map((pokemon) => (
					<IconSolarSystem
						sun={{ url: getPokemonSprite(pokemon.dexId) }}
						firstPlanetUrl={getItemUrl(pokemon.ball)}
						key={pokemon.id}
						onClick={() => {
							if (team.length === 6) {
								addToast('You can only take 6 Pokemon on the team!', 'ERROR');
								return;
							}
							togglePokemonOnTeam(pokemon.id);
						}}
					/>
				))}
			</Stack>
		</Page>
	);
};
