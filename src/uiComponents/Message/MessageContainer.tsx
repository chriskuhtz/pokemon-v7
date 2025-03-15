import { useContext, useEffect } from 'react';
import { App } from '../../App';
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

	useEffect(() => {
		const root = document.getElementById('root');

		if (root && screen.orientation.type === 'landscape-primary') {
			root.requestFullscreen();
		}
	}, []);
	return (
		<>
			{latestMessage && (
				<Banner onClick={confirmLatestMessage}>
					<h2>{latestMessage?.message}</h2>
				</Banner>
			)}
			<SaveFileProvider addMessage={addMessage}>
				<App
					addMessage={addMessage}
					latestMessage={latestMessage}
					addMultipleMessages={addMultipleMessages}
				/>
			</SaveFileProvider>
		</>
	);
};
