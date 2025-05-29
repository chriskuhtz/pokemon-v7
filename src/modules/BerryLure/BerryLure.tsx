import { useCallback, useContext, useMemo } from 'react';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { battleSpriteSize } from '../../constants/gameData';
import {
	getAllBerryLureMonForRoute,
	getBerryLureMon,
} from '../../constants/internalDex';
import { internalDex } from '../../constants/internalDexData';
import { PokemonName } from '../../constants/pokemonNames';
import {
	makeChallengerPokemon,
	OPPO_ID,
} from '../../functions/makeChallengerPokemon';
import { LocationContext } from '../../hooks/LocationProvider';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Challenger } from '../../interfaces/Challenger';
import { EmptyInventory, joinInventories } from '../../interfaces/Inventory';
import { BerryType, superEffectiveSaveTable } from '../../interfaces/Item';
import { OverworldBerryLure } from '../../interfaces/OverworldMap';
import { PokemonType } from '../../interfaces/PokemonType';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const BerryLure = () => {
	const navigate = useNavigate();
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	const pokemon: PokemonName[] = useMemo(
		() => getAllBerryLureMonForRoute(location.mapId),
		[location.mapId]
	);
	const possibleBerries: BerryType[] = useMemo(
		() =>
			pokemon.map(
				(p) => superEffectiveSaveTable[internalDex[p].types.at(0) ?? 'normal']
			) as BerryType[],
		[pokemon]
	);
	const availableBerries: BerryType[] = useMemo(
		() => possibleBerries.filter((b) => saveFile.bag[b] > 0) as BerryType[],
		[possibleBerries, saveFile.bag]
	);

	const lure = useCallback(
		(berry: BerryType) => {
			const lureType = Object.entries(superEffectiveSaveTable).find(
				([, typeBerry]) => typeBerry === berry
			)?.[0] as PokemonType | undefined;
			if (!lureType) {
				throw new Error('What did you put in the lure');
			}

			const succeded = Math.random() > 0.25;

			const encounterName = getBerryLureMon(location.mapId, lureType);

			if (!encounterName) {
				addMultipleMessages([
					{ message: `No Pokemon around here seem interested in this berry` },
				]);
				return;
			}

			const xp = () => {
				if (location.mapId === 'routeN1E1') {
					return 3375;
				}
				if (location.mapId === 'routeE1') {
					return 8000;
				}
				if (location.mapId === 'routeS1E1') {
					return 15625;
				}
				if (location.mapId === 'routeS1W1') {
					return 27000;
				}
				return 1000;
			};
			const challenger: Challenger = {
				type: 'WILD',
				id: OPPO_ID,
				inventory: EmptyInventory,
				team: [
					makeChallengerPokemon({
						name: encounterName,
						xp: xp(),
					}),
				],
			};

			if (succeded) {
				addMultipleMessages([
					{
						icon: <ItemSprite item={berry} />,
						message: `You place a ${berry} in the lure and hide nearby`,
						needsNoConfirmation: true,
					},
					{
						icon: <ItemSprite item={berry} />,
						message: `...waiting`,
						needsNoConfirmation: true,
					},
					{
						icon: <ItemSprite item={berry} />,
						message: `..waiting.`,
						needsNoConfirmation: true,
					},
					{
						icon: <ItemSprite item={berry} />,
						message: `.waiting..`,
						needsNoConfirmation: true,
					},
					{
						icon: <ItemSprite item={berry} />,
						message: `A Pokemon tries to snatch the berry`,
						onRemoval: () => {
							patchSaveFileReducer({
								meta: {
									...saveFile.meta,
									activeTab: 'BATTLE',
									currentChallenger: challenger,
								},
								bag: joinInventories(saveFile.bag, { [berry]: 1 }, true),
								mileStones: {
									...saveFile.mileStones,
									luredWithBerries: [
										...new Set([
											...saveFile.mileStones.luredWithBerries,
											challenger.team[0].name,
										]),
									],
								},
							});
						},
					},
				]);
			} else {
				addMultipleMessages([
					{
						icon: <ItemSprite item={berry} />,
						message: `You place a ${berry} in the lure and hide nearby`,
						needsNoConfirmation: true,
					},
					{
						icon: <ItemSprite item={berry} />,
						message: `...waiting`,
						needsNoConfirmation: true,
					},
					{
						icon: <ItemSprite item={berry} />,
						message: `..waiting.`,
						needsNoConfirmation: true,
					},
					{
						icon: <ItemSprite item={berry} />,
						message: `.waiting..`,
						needsNoConfirmation: true,
					},
					{
						icon: <ItemSprite item={berry} />,
						message: 'A nimble pokemon must have snatched the berry',
					},
					{
						icon: <ItemSprite item={berry} />,
						message: 'while you looked away',
						onRemoval: () => {
							patchSaveFileReducer({
								meta: {
									...saveFile.meta,
									activeTab: 'OVERWORLD',
								},
								bag: joinInventories(saveFile.bag, { [berry]: 1 }, true),
							});
						},
					},
				]);
			}
		},
		[
			addMultipleMessages,
			location.mapId,
			patchSaveFileReducer,
			saveFile.bag,
			saveFile.meta,
			saveFile.mileStones,
		]
	);
	return (
		<Page
			headline="Berry Lure Station"
			goBack={() => navigate('BERRY_LURE', 'OVERWORLD')}
		>
			<Stack mode="column">
				{availableBerries.length > 0
					? availableBerries.map((berry) => {
							const lureType = Object.entries(superEffectiveSaveTable).find(
								([, typeBerry]) => typeBerry === berry
							);

							return (
								<Card
									key={berry}
									icon={<ItemSprite item={berry} />}
									onClick={() => lure(berry)}
									content={
										<h3>
											Put a {berry} into the lure to attract {lureType?.[0]}{' '}
											pokemon
										</h3>
									}
									actionElements={[]}
								/>
							);
					  })
					: [
							<Card
								key="no-berries"
								icon={<FaRegCircleQuestion size={battleSpriteSize} />}
								content={
									<div>
										<strong>
											You dont have any berries that could be used as lures.
										</strong>
										<br />
										<strong>
											The Pokemon in this area like the following berries:
										</strong>
										<Stack mode="row">
											{possibleBerries.map((p) => (
												<p style={{ display: 'flex', alignItems: 'center' }}>
													<ItemSprite key={p} item={p} />
													{p}
												</p>
											))}
										</Stack>
									</div>
								}
								actionElements={[]}
							/>,
					  ]}
			</Stack>
		</Page>
	);
};

export const routeN1Lure: OverworldBerryLure = {
	id: 'routeN1_berryLure',
	type: 'BERRY_LURE',
	x: 25,
	y: 44,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeN1'],
};
export const routeN1E1Lure: OverworldBerryLure = {
	id: 'routeN1E1_berryLure',
	type: 'BERRY_LURE',
	x: 4,
	y: 22,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeN1E1'],
};
export const routeE1Lure: OverworldBerryLure = {
	id: 'routeE1_berryLure',
	type: 'BERRY_LURE',
	x: 26,
	y: 24,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeE1'],
};
export const routeS1E1Lure: OverworldBerryLure = {
	id: 'routeS1E1_berryLure',
	type: 'BERRY_LURE',
	x: 24,
	y: 25,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeS1E1'],
};
export const routeS1W1Lure: OverworldBerryLure = {
	id: 'routeS1W1_berryLure',
	type: 'BERRY_LURE',
	x: 47,
	y: 26,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeS1W1'],
};
export const routeW1Lure: OverworldBerryLure = {
	id: 'routeW1_berryLure',
	type: 'BERRY_LURE',
	x: 43,
	y: 18,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeW1'],
};
