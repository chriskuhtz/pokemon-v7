import { useContext, useMemo, useState } from 'react';
import { GiBreakingChain } from 'react-icons/gi';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { getPokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { battleSpriteSize } from '../../constants/gameData';
import { mapIds } from '../../constants/maps/mapsRecord';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getHeldItem } from '../../functions/getHeldItem';
import { getItemUrl } from '../../functions/getItemUrl';
import { replaceRouteName } from '../../functions/replaceRouteName';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Inventory, joinInventories } from '../../interfaces/Inventory';
import { balltypes } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Chip } from '../../uiComponents/Chip/Chip';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const sortByTypes = [
	'NAME',
	'CATCHDATE',
	'XP',
	'HAPPINESS',
	'BALL',
	'LOCATION',
] as const;
export type PokemonFilter = (typeof sortByTypes)[number];

export const PokemonStorage = ({
	goBack,
}: {
	goBack: () => void;
}): JSX.Element => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const allPokemon = useMemo(() => saveFile.pokemon, [saveFile]);
	const [sortBy, setSortBy] = useState<PokemonFilter>('NAME');
	const sortFunction = useMemo(() => {
		if (sortBy === 'LOCATION') {
			return (a: OwnedPokemon, b: OwnedPokemon) => {
				if (a.caughtOnMap < b.caughtOnMap) return -1;
				if (a.caughtOnMap > b.caughtOnMap) return 1;
				return 0;
			};
		}
		if (sortBy === 'CATCHDATE') {
			return (a: OwnedPokemon, b: OwnedPokemon) =>
				b.caughtAtDate - a.caughtAtDate;
		}
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

			<Stack mode="column">
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
					{sortByTypes.map((filter) => (
						<button
							style={
								sortBy === filter
									? { backgroundColor: 'black', color: 'white' }
									: undefined
							}
							onClick={() => setSortBy(filter)}
						>
							{filter}
						</button>
					))}
				</div>
				<button onClick={collectAllHeldItemsFromStored}>
					Collect all held items from stored Pokemon
				</button>
			</Stack>

			<Sorted
				pokemonFilter={sortBy}
				stored={stored}
				sortFunction={sortFunction}
				teamIsFull={team.length === 6}
				togglePokemonOnTeam={togglePokemonOnTeam}
				startReleaseProcess={startReleaseProcess}
			/>
		</Page>
	);
};

const Sorted = ({
	pokemonFilter,
	stored,
	sortFunction,
	teamIsFull,
	togglePokemonOnTeam,
	startReleaseProcess,
}: {
	pokemonFilter: PokemonFilter;
	stored: OwnedPokemon[];
	sortFunction: ((a: OwnedPokemon, b: OwnedPokemon) => number) | undefined;
	teamIsFull: boolean;
	togglePokemonOnTeam: (id: string) => void;
	startReleaseProcess: (id: string) => void;
}) => {
	if (pokemonFilter === 'BALL') {
		return (
			<Stack mode={'column'}>
				{[...balltypes].map((ball) => {
					const filtered = stored.filter((s) => s.ball === ball);

					if (filtered.length === 0) {
						return <></>;
					}
					return (
						<>
							<h3 style={{ display: 'flex', alignItems: 'center' }}>
								<ItemSprite item={ball} />
								{ball}
							</h3>
							<Stack mode="row">
								{filtered.sort(sortFunction).map((pokemon) => (
									<Entry
										pokemon={pokemon}
										teamIsFull={teamIsFull}
										togglePokemonOnTeam={togglePokemonOnTeam}
										startReleaseProcess={startReleaseProcess}
									/>
								))}
							</Stack>
						</>
					);
				})}
			</Stack>
		);
	}
	if (pokemonFilter === 'LOCATION') {
		return (
			<Stack mode={'column'}>
				{[...mapIds].map((mapId) => {
					const filtered = stored.filter((s) => s.caughtOnMap === mapId);

					if (filtered.length === 0) {
						return <></>;
					}
					return (
						<>
							<h3 style={{ display: 'flex', alignItems: 'center' }}>
								{replaceRouteName(mapId)}
							</h3>
							<Stack mode="row">
								{filtered.sort(sortFunction).map((pokemon) => (
									<Entry
										pokemon={pokemon}
										teamIsFull={teamIsFull}
										togglePokemonOnTeam={togglePokemonOnTeam}
										startReleaseProcess={startReleaseProcess}
									/>
								))}
							</Stack>
						</>
					);
				})}
			</Stack>
		);
	}

	const happinessSteps = [200, 160, 120, 80, 40, 0];
	if (pokemonFilter === 'HAPPINESS') {
		return (
			<Stack mode={'column'}>
				{happinessSteps.map((happiness, index) => {
					const filtered = stored.filter((s) => {
						if (index === 0) {
							return s.happiness > happiness;
						} else
							return (
								s.happiness > happiness &&
								s.happiness <= happinessSteps[index - 1]
							);
					});

					if (filtered.length === 0) {
						return <></>;
					}
					return (
						<>
							<h3 style={{ display: 'flex', alignItems: 'center' }}>
								Happiness {happiness}+
							</h3>
							<Stack mode="row">
								{filtered.sort(sortFunction).map((pokemon) => (
									<Entry
										pokemon={pokemon}
										teamIsFull={teamIsFull}
										togglePokemonOnTeam={togglePokemonOnTeam}
										startReleaseProcess={startReleaseProcess}
									/>
								))}
							</Stack>
						</>
					);
				})}
			</Stack>
		);
	}
	const levelSteps = [90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
	if (pokemonFilter === 'XP') {
		return (
			<Stack mode={'column'}>
				{levelSteps.map((level, index) => {
					const filtered = stored.filter((s) => {
						const l = calculateLevelData(s.xp, s.growthRate).level;
						if (index === 0) {
							return l > level;
						} else return l > level && l <= levelSteps[index - 1];
					});

					if (filtered.length === 0) {
						return <></>;
					}
					return (
						<>
							<h3 style={{ display: 'flex', alignItems: 'center' }}>
								Level {level}+
							</h3>
							<Stack mode="row">
								{filtered.sort(sortFunction).map((pokemon) => (
									<Entry
										pokemon={pokemon}
										teamIsFull={teamIsFull}
										togglePokemonOnTeam={togglePokemonOnTeam}
										startReleaseProcess={startReleaseProcess}
									/>
								))}
							</Stack>
						</>
					);
				})}
			</Stack>
		);
	}
	return (
		<Stack mode="row">
			{stored.sort(sortFunction).map((pokemon) => (
				<Entry
					pokemon={pokemon}
					teamIsFull={teamIsFull}
					togglePokemonOnTeam={togglePokemonOnTeam}
					startReleaseProcess={startReleaseProcess}
				/>
			))}
		</Stack>
	);
};

const Entry = ({
	pokemon,
	teamIsFull,
	togglePokemonOnTeam,
	startReleaseProcess,
}: {
	pokemon: OwnedPokemon;
	teamIsFull: boolean;
	togglePokemonOnTeam: (id: string) => void;
	startReleaseProcess: (id: string) => void;
}) => {
	const { addMessage } = useContext(MessageQueueContext);

	return (
		<div style={{ display: 'flex' }} key={pokemon.id}>
			<IconSolarSystem
				sun={{
					url: getPokemonSprite(pokemon.name, { shiny: pokemon.shiny }),
				}}
				firstPlanet={
					<Chip>
						<strong>
							Lvl {calculateLevelData(pokemon.xp, pokemon.growthRate).level}
						</strong>
					</Chip>
				}
				secondPlanetUrl={getItemUrl(pokemon.ball)}
				thirdPlanetUrl={
					pokemon.heldItemName ? getItemUrl(pokemon.heldItemName) : undefined
				}
				onClick={() => {
					if (teamIsFull) {
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
};
