import { useMemo } from 'react';
import { animationTimer } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { useToasts } from '../../hooks/useToasts';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { Toast } from '../../uiComponents/Toast/Toast';

export const PokemonStorage = ({
	allPokemon,
	goBack,
	setPokemon,
}: {
	allPokemon: OwnedPokemon[];
	goBack: () => void;
	setPokemon: (x: OwnedPokemon[]) => void;
}): JSX.Element => {
	const { latestToast, addToast } = useToasts(animationTimer / 2);
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
			{latestToast && <Toast message={latestToast} />}
			<h2>Team:</h2>
			<Stack mode="row">
				{team.map((pokemon) => (
					<IconSolarSystem
						sun={{ url: getPokemonSprite(pokemon.dexId) }}
						firstPlanetUrl={getItemUrl(pokemon.ball)}
						key={pokemon.id}
						onClick={() => {
							if (team.length === 1) {
								addToast('One Pokemon must remain on the team!');
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
								addToast('You can only take 6 Pokemon on the team!');
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
