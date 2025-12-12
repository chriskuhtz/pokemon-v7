import { useCallback, useContext } from 'react';
import { v4 } from 'uuid';
import { getRewardItemsForQuest } from '../functions/getRewardForQuest';
import { getTeamSize } from '../functions/getTeamSize';
import {
	EmptyCatchBoosts,
	joinCatchBoosts,
} from '../functions/joinCatchBoosts';
import { joinInventories } from '../interfaces/Inventory';
import { CatchBoosts } from '../interfaces/SaveFile';
import { KumaQuestName, KumaQuestsRecord } from '../versions/kuma/questsRecord';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useFulfillQuest = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);
	return useCallback(
		(q: KumaQuestName) => {
			const quest = KumaQuestsRecord[q];

			const reward = getRewardItemsForQuest(q);
			const updatedInventory = joinInventories(saveFile.bag, reward);

			const pokemon = quest.rewardPokemon
				? [
						...saveFile.pokemon,
						{
							...quest.rewardPokemon,
							id: v4(),
							ownerId: saveFile.playerId,
							onTeam:
								saveFile.pokemon.filter((p) => p.onTeam).length <
								getTeamSize(saveFile),
						},
				  ]
				: saveFile.pokemon;

			const existingCatchBoosts: CatchBoosts =
				saveFile.catchBoosts ?? EmptyCatchBoosts;

			const updatedCampUpgrades = { ...saveFile.campUpgrades };

			if (quest.campUpgrade) {
				updatedCampUpgrades[quest.campUpgrade] = true;
			}

			const rewardStrings: string[] = [
				`${quest.researchPoints} Research Points`,
				quest.rangerLevels ? `${quest.rangerLevels} Ranger Levels` : undefined,
				...Object.entries(reward).map(([item, amount]) => `${amount} ${item}`),
				quest.rewardPokemon ? `a ${quest.rewardPokemon.name}` : undefined,
				quest.campUpgrade ? quest.campUpgrade : undefined,
				quest.badge ? quest.badge : undefined,
			].filter((s) => s !== undefined);

			addMessage({
				message: `Received ${rewardStrings.join(' + ')} `,
			});
			patchSaveFileReducer({
				bag: updatedInventory,
				quests: { ...saveFile.quests, [q]: 'COLLECTED' },
				researchPoints: saveFile.researchPoints + quest.researchPoints,
				rangerLevel: (saveFile.rangerLevel ?? 0) + (quest.rangerLevels ?? 0),
				catchBoosts: joinCatchBoosts(
					existingCatchBoosts,
					quest.catchBoosts ?? {}
				),
				campUpgrades: updatedCampUpgrades,
				pokemon,
			});
		},
		[addMessage, patchSaveFileReducer, saveFile]
	);
};
