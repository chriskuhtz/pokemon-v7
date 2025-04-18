import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MessageQueueProvider } from './hooks/useMessageQueue';
import './index.css';
import { MessageContainer } from './uiComponents/Message/MessageContainer';

document.addEventListener('contextmenu', (e) => {
	e.preventDefault();
});
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MessageQueueProvider>
			<MessageContainer />
		</MessageQueueProvider>
	</StrictMode>
);
