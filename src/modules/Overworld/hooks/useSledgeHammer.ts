import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../../../constants/gameData/gameData';
import { ArrayHelpers } from '../../../functions/ArrayHelpers';
import { getUnderRockEncounters } from '../../../functions/internalDex';
import {
	makeChallengerPokemon,
	OPPO_ID,
} from '../../../functions/makeChallengerPokemon';
import { GameDataContext } from '../../../hooks/useGameData';
import { Message, MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { InternalDex } from '../../../interfaces/GameData';
import { EmptyInventory, joinInventories } from '../../../interfaces/Inventory';
import { undergroundTable } from '../../../interfaces/Item';
import { getRandomNature } from '../../../interfaces/Natures';
import { OverworldRock } from '../../../interfaces/OverworldMap';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';

const SLEDGEHAMMER_ENCOUNTER_OPTIONS = (
	internalDex: InternalDex
): OwnedPokemon[] =>
	getUnderRockEncounters(internalDex).map((h) =>
		makeChallengerPokemon({
			nature: getRandomNature(),
			name: h,
			xp: 3375,
			caughtOnMap: 'routeN1',
		})
	);
export const useSledgeHammer = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);
	const { internalDex } = useContext(GameDataContext);
	return useCallback(
		(rock: OverworldRock) => {
			if (saveFile.handledOccupants.some((occ) => occ.id === rock.id)) {
				return;
			}
			if (saveFile.campUpgrades['sledge hammer certification']) {
				const foundItem =
					Math.random() > 0.9
						? ArrayHelpers.getRandomEntry(undergroundTable)
						: undefined;
				const encounter =
					Math.random() > 0.9
						? ArrayHelpers.getRandomEntry(
								SLEDGEHAMMER_ENCOUNTER_OPTIONS(internalDex)
						  )
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
		[
			addMultipleMessages,
			internalDex,
			patchSaveFileReducer,
			saveFile.bag,
			saveFile.campUpgrades,
			saveFile.handledOccupants,
			saveFile.meta,
			saveFile.mileStones,
		]
	);
};
