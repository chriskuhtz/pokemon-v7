import { useMemo, useState } from 'react';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { BattleMessage } from '../Battle/BattleField';

export const PokemonStorage = ({
	allPokemon,
	goBack,
	setPokemon,
	addToast,
}: {
	allPokemon: OwnedPokemon[];
	goBack: () => void;
	setPokemon: (x: OwnedPokemon[]) => void;
	addToast: (x: BattleMessage) => void;
}): JSX.Element => {
	const [sortBy, setSortBy] = useState<'DEX_ID' | 'HAPPINESS' | 'XP'>('DEX_ID');
	const sortFunction = useMemo(() => {
		if (sortBy === 'XP') {
			return (a: OwnedPokemon, b: OwnedPokemon) => b.xp - a.xp;
		}
		if (sortBy === 'HAPPINESS') {
			return (a: OwnedPokemon, b: OwnedPokemon) => b.happiness - a.happiness;
		}
		return (a: OwnedPokemon, b: OwnedPokemon) => a.dexId - b.dexId;
	}, [sortBy]);
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
		<Page goBack={goBack} headline="Your Pokemon:">
			<h2>Team:</h2>
			<Stack mode="row">
				{team.map((pokemon) => (
					<IconSolarSystem
						sun={{ url: getPokemonSprite(pokemon.dexId) }}
						firstPlanetUrl={getItemUrl(pokemon.ball)}
						key={pokemon.id}
						onClick={() => {
							if (team.length === 1) {
								addToast({ message: 'One Pokemon must remain on the team!' });
								return;
							}
							togglePokemonOnTeam(pokemon.id);
						}}
					/>
				))}
			</Stack>

			<h2
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				Storage:
				<div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
					Sort By
					<button
						style={
							sortBy === 'DEX_ID'
								? { backgroundColor: 'black', color: 'white' }
								: undefined
						}
						onClick={() => setSortBy('DEX_ID')}
					>
						Dex Id
					</button>
					<button
						style={
							sortBy === 'HAPPINESS'
								? { backgroundColor: 'black', color: 'white' }
								: undefined
						}
						onClick={() => setSortBy('HAPPINESS')}
					>
						Happiness
					</button>
					<button
						style={
							sortBy === 'XP'
								? { backgroundColor: 'black', color: 'white' }
								: undefined
						}
						onClick={() => setSortBy('XP')}
					>
						Level
					</button>
				</div>
			</h2>

			<Stack mode="row">
				{stored.sort(sortFunction).map((pokemon) => (
					<IconSolarSystem
						sun={{ url: getPokemonSprite(pokemon.dexId) }}
						firstPlanetUrl={getItemUrl(pokemon.ball)}
						key={pokemon.id}
						onClick={() => {
							if (team.length === 6) {
								addToast({
									message: 'You can only take 6 Pokemon on the team!',
								});
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
