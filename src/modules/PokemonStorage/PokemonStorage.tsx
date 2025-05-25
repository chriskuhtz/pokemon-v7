import React, { useContext, useMemo, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { GiBreakingChain } from 'react-icons/gi';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { getPokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import {
	allBst,
	highBstPokemon,
	lowBstPokemon,
	midBstPokemon,
	ultraHighBstPokemon,
} from '../../constants/baseStatRecord';
import { battleSpriteSize } from '../../constants/gameData';
import { internalDex } from '../../constants/internalDex';
import { mapIds } from '../../constants/maps/mapsRecord';
import { byName } from '../../constants/typeRecord';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getHeldItem } from '../../functions/getHeldItem';
import { getItemUrl } from '../../functions/getItemUrl';
import { getTeamSize } from '../../functions/getTeamSize';
import { replaceRouteName } from '../../functions/replaceRouteName';
import { sumOfIvs } from '../../functions/sumOfIvs';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Inventory, joinInventories } from '../../interfaces/Inventory';
import { balltypes } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonType, realTypes } from '../../interfaces/PokemonType';
import { Chip } from '../../uiComponents/Chip/Chip';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { Modal } from '../../uiComponents/Modal/Modal';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const sortByTypes = [
	'FAVORITE',
	'DEX ID',
	'NAME',
	'CATCHDATE',
	'TYPE',
	'XP',
	'HAPPINESS',
	'BALL',
	'LOCATION',
	'IVs',
	'BASE POWER',
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
	const [sortBy, setSortBy] = useState<PokemonFilter>('FAVORITE');
	const sortFunction = useMemo(() => {
		if (sortBy === 'CATCHDATE') {
			return (a: OwnedPokemon, b: OwnedPokemon) =>
				b.caughtAtDate - a.caughtAtDate;
		}
		if (sortBy === 'DEX ID') {
			return (a: OwnedPokemon, b: OwnedPokemon) =>
				internalDex[a.name].dexId - internalDex[b.name].dexId;
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
		if (sortBy === 'IVs') {
			return (a: OwnedPokemon, b: OwnedPokemon) =>
				sumOfIvs(b.intrinsicValues) - sumOfIvs(a.intrinsicValues);
		}
		if (sortBy === 'BASE POWER') {
			return (a: OwnedPokemon, b: OwnedPokemon) =>
				(allBst[b.name] ?? 0) - (allBst[a.name] ?? 0);
		}

		return (a: OwnedPokemon, b: OwnedPokemon) => b.xp - a.xp;
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

	const [releaseToConfirm, setReleaseToConfirm] = useState<
		OwnedPokemon | undefined
	>();

	const startReleaseProcess = (id: string) => {
		const pokemon = allPokemon.find((p) => p.id === id);

		if (!pokemon) {
			return;
		}
		setReleaseToConfirm(pokemon);
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
	const toggleFavoriteStatus = (id: string) => {
		patchSaveFileReducer({
			pokemon: allPokemon.map((p) => {
				if (p.id === id) {
					return { ...p, favorite: !p.favorite };
				}
				return p;
			}),
		});
	};

	return (
		<Page goBack={goBack} headline="Your Pokemon:">
			<Modal
				close={() => setReleaseToConfirm(undefined)}
				open={!!releaseToConfirm}
			>
				<div>
					<p>Do you really want to release {releaseToConfirm?.name}</p>
					<button
						onClick={() => {
							patchSaveFileReducer({
								pokemon: allPokemon.filter(
									(p) => p.id !== releaseToConfirm?.id
								),
							});
							setReleaseToConfirm(undefined);
						}}
					>
						Yes
					</button>
					<button onClick={() => setReleaseToConfirm(undefined)}>No</button>
				</div>
			</Modal>
			<h2>Team:</h2>
			<Stack mode="row">
				{team.map((pokemon) => {
					const heldItem = getHeldItem(pokemon);
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
							<FaveToggle
								on={!!pokemon.favorite}
								onClick={() => toggleFavoriteStatus(pokemon.id)}
							/>
						</div>
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

				<div
					style={{
						display: 'flex',
						gap: '.5rem',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
				>
					Sort By
					{sortByTypes.map((filter) => (
						<button
							key={filter}
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
				teamIsFull={team.length >= getTeamSize(saveFile)}
				togglePokemonOnTeam={togglePokemonOnTeam}
				startReleaseProcess={startReleaseProcess}
				toggleFavoriteStatus={toggleFavoriteStatus}
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
	toggleFavoriteStatus,
}: {
	pokemonFilter: PokemonFilter;
	stored: OwnedPokemon[];
	sortFunction: ((a: OwnedPokemon, b: OwnedPokemon) => number) | undefined;
	teamIsFull: boolean;
	togglePokemonOnTeam: (id: string) => void;
	startReleaseProcess: (id: string) => void;
	toggleFavoriteStatus: (id: string) => void;
}) => {
	const [selectedType, setSelectedType] = useState<PokemonType>(realTypes[0]);
	if (pokemonFilter === 'FAVORITE') {
		return (
			<Stack mode={'column'}>
				<h3 style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
					<FaStar size={battleSpriteSize / 1.5} />
					Favorites:
				</h3>
				<Stack mode="row">
					{stored
						.filter((s) => s.favorite)
						.map((pokemon) => (
							<Entry
								pokemon={pokemon}
								teamIsFull={teamIsFull}
								togglePokemonOnTeam={togglePokemonOnTeam}
								startReleaseProcess={startReleaseProcess}
								toggleFavoriteStatus={toggleFavoriteStatus}
							/>
						))}
				</Stack>
				<h3 style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
					<FaRegStar size={battleSpriteSize / 1.5} />
					Other:
				</h3>
				<Stack mode="row">
					{stored
						.filter((s) => !s.favorite)
						.map((pokemon) => (
							<Entry
								key={pokemon.id}
								pokemon={pokemon}
								teamIsFull={teamIsFull}
								togglePokemonOnTeam={togglePokemonOnTeam}
								startReleaseProcess={startReleaseProcess}
								toggleFavoriteStatus={toggleFavoriteStatus}
							/>
						))}
				</Stack>
			</Stack>
		);
	}
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
										toggleFavoriteStatus={toggleFavoriteStatus}
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
										toggleFavoriteStatus={toggleFavoriteStatus}
									/>
								))}
							</Stack>
						</>
					);
				})}
			</Stack>
		);
	}
	if (pokemonFilter === 'TYPE') {
		const filtered = stored.filter(
			(s) =>
				byName[s.name].at(0) === selectedType ||
				byName[s.name].at(1) === selectedType
		);

		return (
			<>
				<div style={{ margin: '1rem' }}>
					<Stack mode={'row'} gap={2}>
						{realTypes.map((t) => (
							<img
								key={t}
								style={{
									outline: t === selectedType ? '2px solid black' : undefined,
									borderRadius: 9000,
								}}
								height={battleSpriteSize}
								src={`/typeIcons/${t}.png`}
								onClick={() => setSelectedType(t)}
							/>
						))}
					</Stack>
				</div>
				{filtered.length === 0 ? (
					<React.Fragment key={selectedType}></React.Fragment>
				) : (
					<Stack mode="row">
						{filtered.sort(sortFunction).map((pokemon) => (
							<Entry
								key={pokemon.id}
								pokemon={pokemon}
								teamIsFull={teamIsFull}
								togglePokemonOnTeam={togglePokemonOnTeam}
								startReleaseProcess={startReleaseProcess}
								toggleFavoriteStatus={toggleFavoriteStatus}
							/>
						))}
					</Stack>
				)}
			</>
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
										toggleFavoriteStatus={toggleFavoriteStatus}
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
										toggleFavoriteStatus={toggleFavoriteStatus}
									/>
								))}
							</Stack>
						</>
					);
				})}
			</Stack>
		);
	}
	const ivSteps = [186, 155, 124, 93, 62, 31, 0];
	if (pokemonFilter === 'IVs') {
		return (
			<Stack mode={'column'}>
				{ivSteps.map((ivStep, index) => {
					const filtered = stored.filter((s) => {
						const sum = sumOfIvs(s.intrinsicValues);
						if (index === 0) {
							return sum > ivStep;
						} else return sum > ivStep && sum <= ivSteps[index - 1];
					});

					if (filtered.length === 0) {
						return <></>;
					}
					return (
						<>
							<h3 style={{ display: 'flex', alignItems: 'center' }}>
								Total IVs {ivStep}+
							</h3>
							<Stack mode="row">
								{filtered.sort(sortFunction).map((pokemon) => (
									<Entry
										pokemon={pokemon}
										teamIsFull={teamIsFull}
										togglePokemonOnTeam={togglePokemonOnTeam}
										startReleaseProcess={startReleaseProcess}
										toggleFavoriteStatus={toggleFavoriteStatus}
									/>
								))}
							</Stack>
						</>
					);
				})}
			</Stack>
		);
	}
	const bstSteps = [
		ultraHighBstPokemon,
		highBstPokemon,
		midBstPokemon,
		lowBstPokemon,
	];
	if (pokemonFilter === 'BASE POWER') {
		return (
			<Stack mode={'column'}>
				{bstSteps.map((bstStep, index) => {
					const filtered = stored.filter((s) => {
						return !!bstStep[s.name];
					});

					if (filtered.length === 0) {
						return <React.Fragment key={index}></React.Fragment>;
					}

					return (
						<React.Fragment key={index}>
							<h3 style={{ display: 'flex', alignItems: 'center' }}>
								{index === 0 && 'Ultra Strong Pokemon'}
								{index === 1 && 'Strong Pokemon'}
								{index === 2 && 'Medium Strong Pokemon'}
								{index === 3 && 'Weak Pokemon'}
							</h3>
							<Stack mode="row">
								{filtered.sort(sortFunction).map((pokemon) => (
									<Entry
										key={pokemon.id}
										pokemon={pokemon}
										teamIsFull={teamIsFull}
										togglePokemonOnTeam={togglePokemonOnTeam}
										startReleaseProcess={startReleaseProcess}
										toggleFavoriteStatus={toggleFavoriteStatus}
									/>
								))}
							</Stack>
						</React.Fragment>
					);
				})}
			</Stack>
		);
	}
	return (
		<Stack mode="row">
			{stored.sort(sortFunction).map((pokemon) => (
				<Entry
					key={pokemon.id}
					pokemon={pokemon}
					teamIsFull={teamIsFull}
					togglePokemonOnTeam={togglePokemonOnTeam}
					startReleaseProcess={startReleaseProcess}
					toggleFavoriteStatus={toggleFavoriteStatus}
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
	toggleFavoriteStatus,
}: {
	pokemon: OwnedPokemon;
	teamIsFull: boolean;
	togglePokemonOnTeam: (id: string) => void;
	startReleaseProcess: (id: string) => void;
	toggleFavoriteStatus: (id: string) => void;
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
				secondPlanetUrl={`/typeIcons/${byName[pokemon.name].at(0)}.png`}
				thirdPlanetUrl={
					byName[pokemon.name].at(1)
						? `/typeIcons/${byName[pokemon.name].at(1)}.png`
						: undefined
				}
				fourthPlanetUrl={getItemUrl(pokemon.ball)}
				fifthPlanetUrl={
					pokemon.heldItemName ? getItemUrl(pokemon.heldItemName) : undefined
				}
				onClick={() => {
					if (teamIsFull) {
						addMessage({
							message: `You cant take more Pokemon on your team!`,
						});
						return;
					}
					togglePokemonOnTeam(pokemon.id);
				}}
			/>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
				<FaveToggle
					on={!!pokemon.favorite}
					onClick={() => toggleFavoriteStatus(pokemon.id)}
				/>
				<GiBreakingChain
					size={battleSpriteSize / 1.5}
					onClick={() => startReleaseProcess(pokemon.id)}
				/>
			</div>
		</div>
	);
};

const FaveToggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => {
	return (
		<>
			{on ? (
				<FaStar size={battleSpriteSize / 1.5} onClick={onClick} />
			) : (
				<FaRegStar size={battleSpriteSize / 1.5} onClick={onClick} />
			)}
		</>
	);
};
