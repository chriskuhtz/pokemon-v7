import { useContext, useEffect, useState } from 'react';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Page } from '../Page/Page';

export const LoadingScreen = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const [showReturnButton, setShowReturnButton] = useState<boolean>(false);

	useEffect(() => {
		const t = setTimeout(() => setShowReturnButton(true), 5000);

		return () => clearTimeout(t);
	}, []);
	const returnToWorldMap = () => {
		patchSaveFileReducer({
			...saveFile,
			meta: { activeTab: 'OVERWORLD' },
			location: {
				mapId: 'camp',
				x: 1,
				y: 1,
				orientation: 'DOWN',
				forwardFoot: 'CENTER1',
			},
		});
	};
	return (
		<Page headline="">
			<h2>Loading lots of data</h2>

			{showReturnButton && (
				<button onClick={() => returnToWorldMap()}>Return to World Map</button>
			)}
		</Page>
	);
};
