import { Game } from '../../modules/Game/Game';
import { gameData } from './gameData';

export const Labyrinth = (): JSX.Element => {
	return <Game {...gameData} />;
};
