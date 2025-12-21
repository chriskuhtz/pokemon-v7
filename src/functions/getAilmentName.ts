import {
	AilmentType,
	isPrimaryAilment,
	isSecondaryAilment,
} from '../interfaces/Ailment';
import { BattleAttack } from '../interfaces/BattleActions';
import { ArrayHelpers } from './ArrayHelpers';

export const getAilmentName = (
	attack: BattleAttack
): AilmentType | undefined => {
	if (attack.name === 'toxic') {
		return 'toxic';
	}
	if (attack.name === 'tri-attack') {
		return ArrayHelpers.getRandomEntry(['paralysis', 'freeze', 'burn']);
	}

	if (
		isPrimaryAilment({ type: attack.data.meta.ailment.name }) ||
		isSecondaryAilment({ type: attack.data.meta.ailment.name })
	) {
		return attack.data.meta.ailment.name as AilmentType;
	}

	return undefined;
};
