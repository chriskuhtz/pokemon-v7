import { useContext } from 'react';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';

export const ReleaseButton = ({
	ownedPokemon,
}: {
	ownedPokemon: OwnedPokemon;
}) => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	return saveFile.pokemon.length > 1 && !ownedPokemon.starter ? (
		<button
			onClick={() => {
				patchSaveFileReducer({
					pokemon: saveFile.pokemon.filter((p) => p.id !== ownedPokemon?.id),
					meta: { ...saveFile.meta, activeTab: 'OVERWORLD' },
				});
			}}
		>
			Release this Pokemon
		</button>
	) : (
		<></>
	);
};
