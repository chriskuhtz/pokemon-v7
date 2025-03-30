import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../../../constants/gameData';
import { PokemonName } from '../../../constants/pokemonNames';
import { getRandomEntry } from '../../../functions/filterTargets';
import {
	makeChallengerPokemon,
	OPPO_ID,
} from '../../../functions/makeChallengerPokemon';
import { honeyPokemon } from '../../../hooks/useHoneyTree';
import { Message, MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { EmptyInventory, joinInventories } from '../../../interfaces/Inventory';
import { undergroundTable } from '../../../interfaces/Item';
import { getRandomNature } from '../../../interfaces/Natures';
import { OverworldRock } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';

export const sledgeHammerPokemon: PokemonName[] = [
	'geodude',
	'geodude-alola',
	'shuckle',
	'roggenrola',
	'nacli',
	'nosepass',
	'dwebble',
	'bonsly',
	'klawf',
	'riolu',
];

const SLEDGEHAMMER_ENCOUNTER_OPTIONS: OwnedPokemon[] = honeyPokemon.map((h) =>
	makeChallengerPokemon({
		nature: getRandomNature(),
		name: h,
		xp: 200,
		caughtOnMap: 'routeN1',
	})
);
export const useSledgeHammer = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(
		(rock: OverworldRock) => {
			if (saveFile.handledOccupants.some((occ) => occ.id === rock.id)) {
				return;
			}
			if (saveFile.campUpgrades['sledge hammer certification']) {
				const foundItem =
					Math.random() > 0.9 ? getRandomEntry(undergroundTable) : undefined;
				const encounter =
					Math.random() > 0.9
						? getRandomEntry(SLEDGEHAMMER_ENCOUNTER_OPTIONS)
						: undefined;

				const updatedInventory = foundItem
					? joinInventories(saveFile.bag, {
							[foundItem]: 1,
					  })
					: saveFile.bag;
				const meta: SaveFile['meta'] = encounter
					? {
							activeTab: 'BATTLE',
							currentChallenger: {
								team: [encounter],
								type: 'WILD',
								inventory: EmptyInventory,
								id: OPPO_ID,
							},
					  }
					: saveFile.meta;

				const messages: Message[] = [
					{
						message: 'You use your certified sledge hammer skills',
					},
					foundItem
						? { message: `found 1 ${foundItem} in the rubble` }
						: undefined,
					encounter
						? { message: 'You startled a pokemon under the rock' }
						: undefined,
				].filter((m) => m !== undefined);

				addMultipleMessages(
					messages.map((m, i) => {
						if (i === messages.length - 1) {
							return {
								...m,
								onRemoval: () =>
									patchSaveFileReducer({
										handledOccupants: [
											...saveFile.handledOccupants,
											{
												id: rock.id,
												resetAt:
													new Date().getTime() + ONE_HOUR * Math.random(),
											},
										],
										bag: updatedInventory,
										meta,
										mileStones: {
											...saveFile.mileStones,
											hasfoundAPokemonBySmashingRocks: encounter
												? true
												: saveFile.mileStones.hasfoundAPokemonBySmashingRocks,
										},
									}),
							};
						}
						return m;
					})
				);
			} else
				addMultipleMessages([
					{
						message: 'You need a sledge hammer certification to demolish rocks',
					},
					{ message: 'bureaucracy ...' },
				]);
			return;
		},
		[addMultipleMessages, patchSaveFileReducer, saveFile]
	);
};
