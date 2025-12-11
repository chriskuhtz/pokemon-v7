import { GameDataProvider } from '../../hooks/useGameData';
import { MessageQueueProvider } from '../../hooks/useMessageQueue';
import { GameData } from '../../interfaces/GameData';
import { MessageContainer } from '../../uiComponents/Message/MessageContainer';

export const Game = (gameData: GameData): JSX.Element => {
	return (
		<GameDataProvider gameData={gameData}>
			<MessageQueueProvider>
				<MessageContainer />
			</MessageQueueProvider>
		</GameDataProvider>
	);
};
