import { useContext } from 'react';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { LocationContext } from '../../hooks/LocationProvider';
import { useReset } from '../../hooks/useReset';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const LabyrintSuccess = (): JSX.Element => {
	const reset = useReset();
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const locationContext = useContext(LocationContext);
	return (
		<Page headline="Safety at last">
			<Stack mode={'column'}>
				<h3>
					With the help of your courageous pokemon, you have made it to safety
				</h3>
				<Stack mode={'row'}>
					{saveFile.pokemon
						.filter((p) => p.onTeam)
						.map((p) => (
							<PokemonSprite name={p.name} config={{ officalArtwork: true }} />
						))}
				</Stack>
				<button onClick={reset}>start a new game</button>
				<button
					onClick={() => {
						locationContext.resetLocation();
						patchSaveFileReducer({
							meta: { ...saveFile.meta, activeTab: 'OVERWORLD' },
						});
					}}
				>
					return to current round
				</button>
			</Stack>
		</Page>
	);
};
