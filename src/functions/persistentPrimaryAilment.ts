import { PrimaryAilment } from '../interfaces/Ailment';

export const persistentPrimaryAilment = (
	ailment?: PrimaryAilment
): PrimaryAilment | undefined => {
	if (ailment?.type === 'toxic') {
		return { type: 'toxic', duration: 1 };
	}

	return ailment;
};
