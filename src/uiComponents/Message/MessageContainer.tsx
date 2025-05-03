import { useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { App, FullScreenToggle } from '../../App';
import { battleSpriteSize } from '../../constants/gameData';
import { BaseSizeProvider } from '../../hooks/useBaseSize';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileProvider } from '../../hooks/useSaveFile';
import { Banner } from '../Banner/Banner';

export const MessageContainer = () => {
	const { confirmLatestMessage, addMessage, latestMessage } =
		useContext(MessageQueueContext);

	return (
		<ErrorBoundary
			onError={(e) => addMessage({ message: e.message })}
			fallback={<div>{latestMessage?.message}</div>}
		>
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
			<BaseSizeProvider>
				<SaveFileProvider addMessage={addMessage}>
					<FullScreenToggle />
					<App />
				</SaveFileProvider>
			</BaseSizeProvider>
		</ErrorBoundary>
	);
};
