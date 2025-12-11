import { useState } from 'react';

export const FullScreenToggle = () => {
	const [f, setF] = useState<boolean>(!!document.fullscreenElement);

	if (f || (window.innerHeight > 800 && window.innerWidth > 800)) {
		return <></>;
	}
	return (
		<div
			style={{
				position: 'absolute',
				zIndex: 9000,
				backgroundColor: 'rgba(0,0,0,.8)',
				width: '100dvw',
				height: '100dvh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<button
				style={{ color: 'white', borderColor: 'white' }}
				onClick={() => {
					setF(true);
					document
						.getElementById('root')
						?.requestFullscreen({ navigationUI: 'hide' });
				}}
			>
				Enter FullScreen mode
			</button>
		</div>
	);
};
