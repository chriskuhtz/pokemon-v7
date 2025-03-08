import { BerryBushStatus } from '../../../interfaces/SaveFile';

export const BerryBushIcon = ({ status }: { status: BerryBushStatus }) => {
	return (
		<img
			style={status === 'WITHERED' ? { filter: 'grayscale(1)' } : undefined}
			src={`./berryStates/${status}.png`}
		/>
	);
};
