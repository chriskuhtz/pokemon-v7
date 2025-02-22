import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { MessageContainer } from './uiComponents/Message/MessageContainer';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MessageContainer />
	</StrictMode>
);
