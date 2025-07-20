import { useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { App, FullScreenToggle } from '../../App';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { LocationProvider } from '../../hooks/LocationProvider';
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
					<h2
						style={{
							display: 'grid',
							gap: '1rem',
							alignItems: 'center',
							gridTemplateColumns: '1fr 10fr 1fr',
							padding: '0 2rem',
						}}
					>
						{latestMessage.icon ? (
							<span>{latestMessage.icon}</span>
						) : (
							<span></span>
						)}
						<span style={{ textAlign: 'center' }}>
							{latestMessage?.message}
						</span>{' '}
						{!latestMessage.needsNoConfirmation && (
							<FaRegCircleCheck size={battleSpriteSize} />
						)}
					</h2>
				</Banner>
			)}
			<BaseSizeProvider>
				<SaveFileProvider>
					<LocationProvider>
						<FullScreenToggle />
						<App />
					</LocationProvider>
				</SaveFileProvider>
			</BaseSizeProvider>
		</ErrorBoundary>
	);
};
