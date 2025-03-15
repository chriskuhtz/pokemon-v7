import { useContext } from 'react';
import { App, FullScreenToggle } from '../../App';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileProvider } from '../../hooks/useSaveFile';
import { Banner } from '../Banner/Banner';

export const MessageContainer = () => {
	const {
		confirmLatestMessage,
		addMessage,
		latestMessage,
		addMultipleMessages,
	} = useContext(MessageQueueContext);

	return (
		<>
			{latestMessage && (
				<Banner onClick={confirmLatestMessage}>
					<h2>{latestMessage?.message}</h2>
				</Banner>
			)}
			<SaveFileProvider addMessage={addMessage}>
				<FullScreenToggle />
				<App
					addMessage={addMessage}
					latestMessage={latestMessage}
					addMultipleMessages={addMultipleMessages}
				/>
			</SaveFileProvider>
		</>
	);
};
