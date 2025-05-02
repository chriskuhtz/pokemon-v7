import { useCallback, useContext, useMemo } from 'react';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { PokemonName } from '../../constants/pokemonNames';
import {
	makeChallengerPokemon,
	OPPO_ID,
} from '../../functions/makeChallengerPokemon';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Challenger } from '../../interfaces/Challenger';
import { EmptyInventory, joinInventories } from '../../interfaces/Inventory';
import { BerryType, superEffectiveSaveTable } from '../../interfaces/Item';
import { Occupant } from '../../interfaces/OverworldMap';
import { PokemonType } from '../../interfaces/PokemonType';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const lureBerryEncountersN1: Record<PokemonType, PokemonName> = {
	fire: 'tauros-paldea-blaze-breed',
	water: 'tauros-paldea-aqua-breed',
	electric: 'pikachu-rock-star',
	grass: 'deerling',
	ice: 'vulpix-alola',
	fighting: 'tauros-paldea-combat-breed',
	poison: 'bulbasaur',
	ground: 'phanpy',
	flying: 'pidove',
	psychic: 'natu',
	bug: 'blipbug',
	rock: 'growlithe-hisui',
	ghost: 'phantump',
	dragon: 'applin',
	dark: 'rattata-alola',
	steel: 'cufant',
	normal: 'dunsparce',
	fairy: 'marill',
	typeless: 'spiritomb',
};
export const lureBerryEncountersN1E1: Record<PokemonType, PokemonName> = {
	fire: 'sizzlipede',
	water: 'dewpider',
	electric: 'pikachu-belle',
	grass: 'sewaddle',
	ice: 'snom',
	fighting: 'shroomish',
	poison: 'venonat',
	ground: 'nincada',
	flying: 'butterfree',
	psychic: 'abra',
	bug: 'kricketot',
	rock: 'growlithe-hisui',
	ghost: 'shuppet',
	dragon: 'jangmo-o',
	dark: 'meowth-alola',
	steel: 'meowth-galar',
	normal: 'miltank',
	fairy: 'cottonee',
	typeless: 'spiritomb',
};
export const lureBerryEncountersE1: Record<PokemonType, PokemonName> = {
	fire: 'slugma',
	water: 'quagsire',
	electric: 'pikachu-pop-star',
	grass: 'bellsprout',
	ice: 'bergmite',
	fighting: 'tyrogue',
	poison: 'grimer',
	ground: 'trapinch',
	flying: 'hawlucha',
	psychic: 'girafarig',
	bug: 'dwebble',
	rock: 'nosepass',
	ghost: 'haunter',
	dragon: 'vibrava',
	dark: 'absol',
	steel: 'orthworm',
	normal: 'furfrou',
	fairy: 'slurpuff',
	typeless: 'spiritomb',
};
export const lureBerryEncountersS1E1: Record<PokemonType, PokemonName> = {
	fire: 'magmar',
	water: 'panpour',
	electric: 'pikachu-phd',
	grass: 'gogoat',
	ice: 'vulpix-alola',
	fighting: 'makuhita',
	poison: 'venipede',
	ground: 'bunnelby',
	flying: 'vivillon',
	psychic: 'natu',
	bug: 'paras',
	rock: 'rhyhorn',
	ghost: 'shedinja',
	dragon: 'dratini',
	dark: 'grimer-alola',
	steel: 'togedemaru',
	normal: 'doduo',
	fairy: 'snubbull',
	typeless: 'spiritomb',
};
export const lureBerryEncountersS1W1: Record<PokemonType, PokemonName> = {
	fire: 'heatmor',
	water: 'simipour',
	electric: 'pikachu-libre',
	grass: 'nuzleaf',
	ice: 'avalugg',
	fighting: 'hawlucha',
	poison: 'weezing',
	ground: 'marowak',
	flying: 'corvisquire',
	psychic: 'mr-mime',
	bug: 'accelgor',
	rock: 'rhydon',
	ghost: 'yamask',
	dragon: 'shelgon',
	dark: 'deino',
	steel: 'mawile',
	normal: 'bouffalant',
	fairy: 'swirlix',
	typeless: 'spiritomb',
};
export const BerryLure = () => {
	const navigate = useNavigate();
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	const availableBerries: BerryType[] = useMemo(() => {
		return Object.values(superEffectiveSaveTable).filter((b) => {
			if (b === 'odd-keystone') {
				return false;
			}
			const berry = b as BerryType;

			return saveFile.bag[berry] > 0;
		}) as BerryType[];
	}, [saveFile.bag]);

	const lure = useCallback(
		(berry: BerryType) => {
			const lureType = Object.entries(superEffectiveSaveTable).find(
				([, typeBerry]) => typeBerry === berry
			);
			if (!lureType) {
				throw new Error('What did you put in the lure');
			}

			const succeded = Math.random() > 0.25;

			const getRouteBasedLureEncounter = (): PokemonName => {
				if (saveFile.location.mapId === 'routeN1E1') {
					return lureBerryEncountersN1E1[lureType[0] as PokemonType];
				}
				if (saveFile.location.mapId === 'routeE1') {
					return lureBerryEncountersE1[lureType[0] as PokemonType];
				}
				if (saveFile.location.mapId === 'routeS1E1') {
					return lureBerryEncountersS1E1[lureType[0] as PokemonType];
				}
				if (saveFile.location.mapId === 'routeS1W1') {
					return lureBerryEncountersS1W1[lureType[0] as PokemonType];
				}
				return lureBerryEncountersN1[lureType[0] as PokemonType];
			};

			const xp = () => {
				if (saveFile.location.mapId === 'routeN1E1') {
					return 3375;
				}
				if (saveFile.location.mapId === 'routeE1') {
					return 8000;
				}
				if (saveFile.location.mapId === 'routeS1E1') {
					return 15625;
				}
				if (saveFile.location.mapId === 'routeS1W1') {
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
						name: getRouteBasedLureEncounter(),
						xp: xp(),
					}),
				],
			};

			if (succeded) {
				addMultipleMessages([
					{
						message: `You place a ${berry} in the lure and hide nearby`,
						needsNoConfirmation: true,
					},
					{
						message: `...waiting`,
						needsNoConfirmation: true,
					},
					{
						message: `..waiting.`,
						needsNoConfirmation: true,
					},
					{
						message: `.waiting..`,
						needsNoConfirmation: true,
					},
					{
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
						message: `You place a ${berry} in the lure and hide nearby`,
						needsNoConfirmation: true,
					},
					{
						message: `...waiting`,
						needsNoConfirmation: true,
					},
					{
						message: `..waiting.`,
						needsNoConfirmation: true,
					},
					{
						message: `.waiting..`,
						needsNoConfirmation: true,
					},
					{
						message: 'A nimble pokemon must have snatched the berry',
					},
					{
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
		[addMultipleMessages, patchSaveFileReducer, saveFile]
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
								icon={<ItemSprite item={'sitrus-berry'} grayscale />}
								content={
									'You dont have any berries that could be used as lures'
								}
								actionElements={[]}
							/>,
					  ]}
			</Stack>
		</Page>
	);
};

export const routeN1Lure: Occupant = {
	id: 'routeN1_berryLure',
	type: 'BERRY_LURE',
	x: 25,
	y: 44,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeN1'],
};
export const routeN1E1Lure: Occupant = {
	id: 'routeN1E1_berryLure',
	type: 'BERRY_LURE',
	x: 4,
	y: 22,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeN1E1'],
};
export const routeE1Lure: Occupant = {
	id: 'routeE1_berryLure',
	type: 'BERRY_LURE',
	x: 26,
	y: 24,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeE1'],
};
export const routeS1E1Lure: Occupant = {
	id: 'routeS1E1_berryLure',
	type: 'BERRY_LURE',
	x: 24,
	y: 25,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeS1E1'],
};
export const routeS1W1Lure: Occupant = {
	id: 'routeS1W1_berryLure',
	type: 'BERRY_LURE',
	x: 47,
	y: 26,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeS1W1'],
};
