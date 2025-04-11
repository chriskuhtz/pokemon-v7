import { useCallback, useContext, useMemo } from 'react';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { PokemonName } from '../../constants/pokemonNames';
import { getMiddleOfThree } from '../../functions/getMiddleOfThree';
import {
	makeChallengerPokemon,
	OPPO_ID,
} from '../../functions/makeChallengerPokemon';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Challenger } from '../../interfaces/Challenger';
import { EmptyInventory } from '../../interfaces/Inventory';
import { BerryType, superEffectiveSaveTable } from '../../interfaces/Item';
import { Occupant } from '../../interfaces/OverworldMap';
import { PokemonType } from '../../interfaces/PokemonType';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { useStartEncounter } from '../Overworld/hooks/useStartEncounter';

export const lureBerryEncountersN1: Record<PokemonType, PokemonName> = {
	fire: 'tauros-paldea-blaze-breed',
	water: 'tauros-paldea-aqua-breed',
	electric: 'pikachu-cosplay',
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
	electric: 'pikachu-original-cap',
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
	electric: 'pikachu-hoenn-cap',
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
	fire: 'litleo',
	water: 'panpour',
	electric: 'pikachu-sinnoh-cap',
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
export const BerryLure = () => {
	const navigate = useNavigate();
	const { saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);
	const startEncounter = useStartEncounter();

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

			const succeded = Math.random() > 0.5;

			const getRouteBasedLureEncounter = (): PokemonName => {
				if (saveFile.location.mapId === 'routeN1E1') {
					return lureBerryEncountersN1E1[lureType[0] as PokemonType];
				}
				return lureBerryEncountersN1[lureType[0] as PokemonType];
			};
			const challenger: Challenger = {
				type: 'WILD',
				id: OPPO_ID,
				inventory: EmptyInventory,
				team: [
					makeChallengerPokemon({
						name: getRouteBasedLureEncounter(),
						xp: getMiddleOfThree([125, 1000, Math.floor(Math.random() * 3375)]),
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
						onRemoval: () => startEncounter(0, challenger),
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
						message: 'No Pokemon seem interested right now',
						onRemoval: () => navigate('OVERWORLD', 'BERRY_LURE'),
					},
				]);
			}
		},
		[addMultipleMessages, navigate, saveFile.location.mapId, startEncounter]
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
											Put a {berry} into the lure to attract {lureType?.[0]}
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
	x: 24,
	y: 25,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeE1'],
};
export const routeS1E1Lure: Occupant = {
	id: 'routeS1E1_berryLure',
	type: 'BERRY_LURE',
	x: 24,
	y: 25,
	conditionFunction: (s) => s.campUpgrades['berry lure station routeS1E1'],
};
