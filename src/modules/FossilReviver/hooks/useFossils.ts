import { useCallback, useContext } from 'react';
import { PokemonName } from '../../../constants/pokemonNames';
import { makeChallengerPokemon } from '../../../functions/makeChallengerPokemon';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import { fossilTable, FossilType } from '../../../interfaces/Item';
import { getRandomNature } from '../../../interfaces/Natures';

export const useFossils = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, putSaveFileReducer } = useContext(SaveFileContext);

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
				message: `Revived the ${fossil} for 5 research points`,
			});
			putSaveFileReducer({
				...saveFile,
				bag: joinInventories(
					saveFile.bag,
					Object.fromEntries(fossils.map((f) => [f, 1])),
					true
				),
				researchPoints: saveFile.researchPoints - 5,
				pokemon: [
					...saveFile.pokemon,
					makeChallengerPokemon({
						name: pokemon,
						xp: 1000,
						nature: getRandomNature(),
						onTeam: saveFile.pokemon.filter((p) => p.onTeam).length < 6,
						ownerId: saveFile.playerId,
						weightModifier: Math.random(),
					}),
				],
			});
		},
		[addMessage, putSaveFileReducer, saveFile]
	);

	return { revive };
};
