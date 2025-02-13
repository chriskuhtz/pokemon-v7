import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ToastContainer } from './uiComponents/Toast/ToastContainer';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ToastContainer />
	</StrictMode>
);
