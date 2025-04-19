import { useContext, useMemo, useState } from 'react';
import { GiBreakingChain } from 'react-icons/gi';
import { getPokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { battleSpriteSize } from '../../constants/gameData';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getHeldItem } from '../../functions/getHeldItem';
import { getItemUrl } from '../../functions/getItemUrl';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Inventory, joinInventories } from '../../interfaces/Inventory';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Chip } from '../../uiComponents/Chip/Chip';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const PokemonStorage = ({
	goBack,
}: {
	goBack: () => void;
}): JSX.Element => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const allPokemon = useMemo(() => saveFile.pokemon, [saveFile]);
	const [sortBy, setSortBy] = useState<'HAPPINESS' | 'XP' | 'NAME' | 'BALL'>(
		'NAME'
	);
	const sortFunction = useMemo(() => {
		if (sortBy === 'XP') {
			return (a: OwnedPokemon, b: OwnedPokemon) => b.xp - a.xp;
		}
		if (sortBy === 'HAPPINESS') {
			return (a: OwnedPokemon, b: OwnedPokemon) => b.happiness - a.happiness;
		}
		if (sortBy === 'BALL') {
			return (a: OwnedPokemon, b: OwnedPokemon) => {
				if (a.ball < b.ball) return -1;
				if (a.ball > b.ball) return 1;
				return 0;
			};
		}
		if (sortBy === 'NAME') {
			return (a: OwnedPokemon, b: OwnedPokemon) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			};
		}
	}, [sortBy]);
	const team = useMemo(() => allPokemon.filter((p) => p.onTeam), [allPokemon]);
	const stored = useMemo(
		() => allPokemon.filter((p) => p.onTeam === false),
		[allPokemon]
	);
	const togglePokemonOnTeam = (id: string) => {
		patchSaveFileReducer({
			pokemon: allPokemon.map((p) => {
				if (p.id === id) {
					return { ...p, onTeam: !p.onTeam };
				}
				return p;
			}),
		});
	};

	const startReleaseProcess = (id: string) => {
		const pokemon = allPokemon.find((p) => p.id === id);

		if (!pokemon) {
			return;
		}
		if (window.confirm(`Do you really want to release ${pokemon.name}`)) {
			patchSaveFileReducer({
				pokemon: allPokemon.filter((p) => p.id !== id),
			});
		}
	};
	const collectAllHeldItemsFromStored = () => {
		const allHeldItemKeys = allPokemon
			.filter((p) => !p.onTeam && p.heldItemName)
			.map((p) => p.heldItemName);
		const collected: Partial<Inventory> = Object.fromEntries(
			allHeldItemKeys.map((key) => [key, 1])
		);

		patchSaveFileReducer({
			bag: joinInventories(saveFile.bag, collected),
			pokemon: allPokemon.map((p) => {
				if (p.onTeam) {
					return p;
				}

				return { ...p, heldItemName: undefined };
			}),
		});
	};

	return (
		<Page goBack={goBack} headline="Your Pokemon:">
			<h2>Team:</h2>
			<Stack mode="row">
				{team.map((pokemon) => {
					const heldItem = getHeldItem(pokemon);
					return (
						<IconSolarSystem
							sun={{
								url: getPokemonSprite(pokemon.name, { shiny: pokemon.shiny }),
							}}
							firstPlanet={
								<Chip>
									<strong>
										Lvl{' '}
										{calculateLevelData(pokemon.xp, pokemon.growthRate).level}
									</strong>
								</Chip>
							}
							secondPlanetUrl={getItemUrl(pokemon.ball)}
							thirdPlanetUrl={heldItem ? getItemUrl(heldItem) : undefined}
							key={pokemon.id}
							onClick={() => {
								if (team.length === 1) {
									addMessage({
										message: 'One Pokemon must remain on the team!',
									});
									return;
								}
								togglePokemonOnTeam(pokemon.id);
							}}
						/>
					);
				})}
			</Stack>

			<h2
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				Storage:
			</h2>
			<div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
				Sort By
				<button
					style={
						sortBy === 'NAME'
							? { backgroundColor: 'black', color: 'white' }
							: undefined
					}
					onClick={() => setSortBy('NAME')}
				>
					NAME
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
				<button
					style={
						sortBy === 'BALL'
							? { backgroundColor: 'black', color: 'white' }
							: undefined
					}
					onClick={() => setSortBy('BALL')}
				>
					Ball
				</button>
			</div>
			<button onClick={collectAllHeldItemsFromStored}>
				Collect all held items from stored Pokemon
			</button>

			<Stack mode="row">
				{stored.sort(sortFunction).map((pokemon) => {
					return (
						<div style={{ display: 'flex' }} key={pokemon.id}>
							<IconSolarSystem
								sun={{
									url: getPokemonSprite(pokemon.name, { shiny: pokemon.shiny }),
								}}
								firstPlanet={
									<Chip>
										<strong>
											Lvl{' '}
											{calculateLevelData(pokemon.xp, pokemon.growthRate).level}
										</strong>
									</Chip>
								}
								secondPlanetUrl={getItemUrl(pokemon.ball)}
								thirdPlanetUrl={
									pokemon.heldItemName
										? getItemUrl(pokemon.heldItemName)
										: undefined
								}
								onClick={() => {
									if (team.length === 6) {
										addMessage({
											message: 'You can only take 6 Pokemon on the team!',
										});
										return;
									}
									togglePokemonOnTeam(pokemon.id);
								}}
							/>
							<GiBreakingChain
								size={battleSpriteSize / 1.5}
								onClick={() => startReleaseProcess(pokemon.id)}
							/>
						</div>
					);
				})}
			</Stack>
		</Page>
	);
};
