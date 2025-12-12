import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Login } from './modules/Login/Login';
import { VersionSelection } from './modules/VersionSelection/VersionSelection';

document.addEventListener('contextmenu', (e) => {
	e.preventDefault();
});
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Login>
			<VersionSelection />
		</Login>
	</StrictMode>
);
