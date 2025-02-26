import { App } from '../../App';
import { useMessageQueue } from '../../hooks/useMessageQueue';
import { SaveFileProvider } from '../../hooks/useSaveFile';
import { Banner } from '../Banner/Banner';

export const MessageContainer = () => {
	const {
		confirmLatestMessage,
		addMessage,
		latestMessage,
		addMultipleMessages,
	} = useMessageQueue();
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
