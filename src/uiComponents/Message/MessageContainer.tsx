import { App } from '../../App';
import { useMessageQueue } from '../../hooks/useMessageQueue';
import { Banner } from '../Banner/Banner';

export const MessageContainer = () => {
	const {
		confirmLatestMessage,
		addMessage,
		latestMessage,
		addMultipleMessages,
		interjectMessage,
	} = useMessageQueue();
	return (
		<>
			{latestMessage && (
				<Banner onClick={confirmLatestMessage}>
					<h2>{latestMessage?.message}</h2>
				</Banner>
			)}
			<App
				addMessage={addMessage}
				latestMessage={latestMessage}
				addMultipleMessages={addMultipleMessages}
				interjectMessage={interjectMessage}
			/>
		</>
	);
};
