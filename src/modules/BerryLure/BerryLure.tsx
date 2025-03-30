import { useCallback, useContext, useMemo } from 'react';
import { PokemonName } from '../../constants/pokemonNames';
import { getItemUrl } from '../../functions/getItemUrl';
import { getMiddleOfThree } from '../../functions/getMiddleOfThree';
import {
	makeChallengerPokemon,
	OPPO_ID,
} from '../../functions/makeChallengerPokemon';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { EmptyInventory } from '../../interfaces/Inventory';
import { BerryType, superEffectiveSaveTable } from '../../interfaces/Item';
import { Occupant } from '../../interfaces/OverworldMap';
import { PokemonType } from '../../interfaces/PokemonType';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { useStartEncounter } from '../Overworld/hooks/useStartEncounter';

export const lureBerryEncounters: Record<PokemonType, PokemonName> = {
	fire: 'vulpix',
	water: 'buizel',
	electric: 'morpeko-full-belly',
	grass: 'deerling',
	ice: 'vulpix-alola',
	fighting: 'tyrogue',
	poison: 'bulbasaur',
	ground: 'phanpy',
	flying: 'pidove',
	psychic: 'natu',
	bug: 'blipbug',
	rock: 'rockruff',
	ghost: 'phantump',
	dragon: 'applin',
	dark: 'pancham',
	steel: 'cufant',
	normal: 'dunsparce',
	fairy: 'marill',
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

			const succeded = Math.random() > 0.6;

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
						onRemoval: () =>
							startEncounter(0, {
								type: 'WILD',
								id: OPPO_ID,
								inventory: EmptyInventory,
								team: [
									makeChallengerPokemon({
										name: lureBerryEncounters[lureType[0] as PokemonType],
										xp: getMiddleOfThree([
											125,
											1000,
											Math.floor(Math.random() * 3375),
										]),
									}),
								],
							}),
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
		[addMultipleMessages, navigate, startEncounter]
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
									icon={<img src={getItemUrl(berry)} />}
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
								icon={<img src={getItemUrl('sitrus-berry')} />}
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
	//conditionFunction: (s) => s.campUpgrades['berry lure station routeN1']
	conditionFunction: () => true,
};
