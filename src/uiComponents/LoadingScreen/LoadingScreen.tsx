import { useContext, useEffect, useState } from 'react';
import { Sprite } from '../../components/Sprite/Sprite';
import { LocationContext } from '../../hooks/LocationProvider';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Page } from '../Page/Page';

export const LoadingScreen = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { resetLocation } = useContext(LocationContext);
	const [showReturnButton, setShowReturnButton] = useState<boolean>(false);

	useEffect(() => {
		const t = setTimeout(() => setShowReturnButton(true), 5000);

		return () => clearTimeout(t);
	}, []);
	const returnToWorldMap = () => {
		patchSaveFileReducer({
			...saveFile,
			meta: { activeTab: 'OVERWORLD' },
		});
		resetLocation();
	};
	return (
		<Page headline="">
			<div
				style={{
					display: 'flex',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<h2>Loading lots of data</h2>
				<div style={{ display: 'flex' }}>
					<Sprite
						canvasKey={SpriteEnum.elm}
						id={SpriteEnum.elm}
						rotating={true}
					/>{' '}
					<Sprite
						canvasKey={SpriteEnum.oak}
						id={SpriteEnum.oak}
						rotating={true}
					/>{' '}
					<Sprite
						canvasKey={SpriteEnum.rowan}
						id={SpriteEnum.rowan}
						rotating={true}
					/>
				</div>
				{showReturnButton && (
					<button onClick={() => returnToWorldMap()}>
						Return to World Map
					</button>
				)}
			</div>
		</Page>
	);
};
