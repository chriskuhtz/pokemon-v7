import { Game } from '../../modules/Game/Game';

export const Labyrinth = (): JSX.Element => {
	return (
		<Game
			saveFileId="pokemonLabyrinthSaveFile"
			locationId="pokemonLabyrinthLocation"
		/>
	);
};
