import { useMemo } from 'react';
import { ONE_HOUR } from '../../../constants/gameData/gameData';
import { BerryBush, BerryBushStatus } from '../../../interfaces/SaveFile';

export const BerryBushIcon = ({ bush }: { bush: BerryBush }) => {
	const status: BerryBushStatus = useMemo(() => {
		const timeUntilReady = bush.readyAt - new Date().getTime();

		if (timeUntilReady < 0 && bush.successful) {
			return 'READY';
		}
		if (timeUntilReady < 0 && !bush.successful) {
			return 'WITHERED';
		}
		if (timeUntilReady < ONE_HOUR * 0.25) {
			return 'FLOWERING';
		}
		if (timeUntilReady < ONE_HOUR * 0.5) {
			return 'SAPLING';
		}
		if (timeUntilReady < ONE_HOUR * 0.75) {
			return 'SPROUT';
		}
		return 'SEED';
	}, [bush]);
	return (
		<img
			style={status === 'WITHERED' ? { filter: 'grayscale(1)' } : undefined}
			src={`./berryStates/${status}.png`}
		/>
	);
};
