import React, { useContext, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { battleSpriteSize } from '../../constants/gameData';
import { isNotCatchable } from '../../constants/internalDex';
import { internalDex, InternalDexEntry } from '../../constants/internalDexData';
import { MapId, mapIds } from '../../constants/maps/mapsRecord';
import { PokemonName } from '../../constants/pokemonNames';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { replaceRouteName } from '../../functions/replaceRouteName';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

const devmode = !!window.localStorage.getItem('devmode');

export const InternalDex = (): JSX.Element => {
	const { saveFile } = useContext(SaveFileContext);
	const [searchString, setSearchString] = useState<string>('');
	const navigate = useNavigate();

	const availableEntries: [PokemonName, InternalDexEntry][] = useMemo(() => {
		return Object.entries(internalDex).filter(([key]) => {
			if (devmode) {
				return true;
			}
			return saveFile.pokedex[key as PokemonName].caughtOnRoutes.length > 0;
		}) as [PokemonName, InternalDexEntry][];
	}, [saveFile]);

	const [routeFilter, setRouteFilter] = useState<MapId>();

	const filtered = useMemo(() => {
		return availableEntries.filter(([, value]) => {
			if (
				routeFilter &&
				value.encounterOptions?.every((op) => op.route !== routeFilter)
			) {
				return false;
			}

			return true;
		});
	}, [availableEntries, routeFilter]);

	return (
		<Page
			headline="Internal Dex"
			goBack={() => navigate('INTERNAL_DEX', 'MAIN')}
		>
			<Stack mode="column">
				<h4>Search:</h4>
				<Card
					icon={<FaSearch size={battleSpriteSize} />}
					content={
						<input
							value={searchString}
							onChange={(e) => setSearchString(e.target.value.toLowerCase())}
						/>
					}
					actionElements={[]}
				/>
				<h4>Filter By Route:</h4>
				<Stack mode={'row'}>
					<button
						style={{
							backgroundColor: routeFilter === undefined ? 'black' : undefined,
							color: routeFilter === undefined ? 'white' : undefined,
						}}
						onClick={() => setRouteFilter(undefined)}
					>
						All
					</button>
					{mapIds.map((id) => (
						<button
							key={id}
							style={{
								backgroundColor: routeFilter === id ? 'black' : undefined,
								color: routeFilter === id ? 'white' : undefined,
							}}
							onClick={() => setRouteFilter(id)}
						>
							{id}
						</button>
					))}
				</Stack>
				{filtered.map(([key, entry]) => {
					if (!key.includes(searchString)) {
						return <React.Fragment key={key}></React.Fragment>;
					}
					return (
						<Card
							key={key}
							icon={
								<h3>
									{entry.dexId}:{key}
								</h3>
							}
							actionElements={[]}
							content={<InternalDexCardContent entry={entry} />}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};

export const InternalDexCardContent = ({
	entry,
}: {
	entry: InternalDexEntry;
}): JSX.Element => {
	if (isNotCatchable(entry)) {
		return <h4>Not Catchable</h4>;
	}
	return (
		<div>
			<h4>Catchable at:</h4>
			<Stack mode={'column'}>
				{entry.berryLureMapId && <h5> berry lure {entry.berryLureMapId}</h5>}
				{entry.honey && <h5> honey trees</h5>}
				{entry.underRock && <h5> smashable rocks</h5>}
				{entry.swarm && <h5> swarm type: {entry.swarm}</h5>}
				{entry.rampager && <h5> Rampaging</h5>}
				{entry.encounterOptions.map((op) => (
					<h5 key={op.route}>
						{replaceRouteName(op.route)} | Time: {op.timeOfDay} | Biome:{' '}
						{op.area} | between lvl {calculateLevelData(op.minXp, 'fast').level}{' '}
						and {calculateLevelData(op.maxXp, 'fast').level} | rarity:{' '}
						{op.rarity}
					</h5>
				))}
			</Stack>
		</div>
	);
};
