import { useContext } from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { App, FullScreenToggle } from '../../App';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileProvider } from '../../hooks/useSaveFile';
import { Banner } from '../Banner/Banner';
import { battleSpriteSize } from '../../constants/gameData';

export const MessageContainer = () => {
	const { confirmLatestMessage, addMessage, latestMessage } =
		useContext(MessageQueueContext);

	return (
		<>
			{latestMessage && (
				<Banner onClick={confirmLatestMessage}>
					<h2 style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
						{latestMessage?.message}{' '}
						{!latestMessage.needsNoConfirmation && (
							<FaRegCircleCheck size={battleSpriteSize} />
						)}
					</h2>
				</Banner>
			)}
			<SaveFileProvider addMessage={addMessage}>
				<FullScreenToggle />
				<App />
			</SaveFileProvider>
		</>
	);
};
