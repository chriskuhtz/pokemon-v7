import { SecondaryAilment } from '../interfaces/Ailment';

export const removeHealableAilments = (
	arr: SecondaryAilment[]
): SecondaryAilment[] => {
	const filtered = [...arr].filter((ailment) =>
		['confusion'].includes(ailment.type)
	);
	return filtered;
};
