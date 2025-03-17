import { useMemo } from 'react';
import { BerryBush, BerryBushStatus } from '../../../interfaces/SaveFile';

export const BerryBushIcon = ({ bush }: { bush: BerryBush }) => {
	const status: BerryBushStatus = useMemo(() => {
		const timeUntilReady = new Date().getTime() - bush.readyAt;

		if (timeUntilReady < 0 && bush.successful) {
			return 'READY';
		}
		if (timeUntilReady < 0 && !bush.successful) {
			return 'WITHERED';
		}
		if (timeUntilReady < 900000) {
			return 'FLOWERING';
		}
		if (timeUntilReady < 1800000) {
			return 'SAPLING';
		}
		if (timeUntilReady < 2700000) {
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
