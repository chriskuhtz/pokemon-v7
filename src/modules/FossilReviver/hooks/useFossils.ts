import { useCallback, useContext } from 'react';
import { PokemonName } from '../../../constants/pokemonNames';
import { getTeamSize } from '../../../functions/getTeamSize';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { GameDataContext } from '../../../hooks/useGameData';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import { fossilTable, FossilType } from '../../../interfaces/Item';
import { getRandomNature } from '../../../interfaces/Natures';

export const useFossils = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const gameData = useContext(GameDataContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const revive = useCallback(
		(fossils: FossilType[]) => {
			const fossil = Object.entries(fossilTable).find(([, requiredFossils]) =>
				requiredFossils.every((rf) => fossils.includes(rf))
			);

			if (!fossil) {
				console.error('what are these fossils supposed to yield?', fossils);
				return;
			}
			const pokemon = fossil[0] as PokemonName;
			addMessage({
				message: `Revived a ${pokemon}s`,
			});
			patchSaveFileReducer({
				...saveFile,
				bag: joinInventories(
					saveFile.bag,
					Object.fromEntries(fossils.map((f) => [f, 1])),
					true
				),
				researchPoints: saveFile.researchPoints,
				pokemon: [
					...saveFile.pokemon,
					makeChallengerPokemon({
						name: pokemon,
						xp: 1000,
						nature: getRandomNature(),
						onTeam:
							saveFile.pokemon.filter((p) => p.onTeam).length <
							getTeamSize(saveFile, gameData),
						ownerId: saveFile.playerId,
						weightModifier: Math.random(),
					}),
				],
			});
		},
		[addMessage, gameData, patchSaveFileReducer, saveFile]
	);

	return { revive };
};
