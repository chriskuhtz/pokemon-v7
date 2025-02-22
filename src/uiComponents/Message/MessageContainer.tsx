import { App } from '../../App';
import { useMessageQueue } from '../../hooks/useMessageQueue';
import { Banner } from '../Banner/Banner';

export const MessageContainer = () => {
	const { addMessage, latestMessage, addMultipleMessages, interjectMessage } =
		useMessageQueue();
	return (
		<>
			{latestMessage && (
				<Banner>
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
