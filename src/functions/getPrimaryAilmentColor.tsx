import { typeColors } from '../constants/typeColors';
import { AilmentType } from '../interfaces/Ailment';

export const getPrimaryAilmentColor = (ailment?: AilmentType) => {
	if (ailment === 'burn') {
		return typeColors['fire'];
	}
	if (ailment === 'paralysis') {
		return typeColors['electric'];
	}
	if (ailment === 'sleep') {
		return typeColors['normal'];
	}
	if (ailment === 'freeze') {
		return typeColors['ice'];
	}
	if (ailment === 'poison' || ailment === 'toxic') {
		return typeColors['poison'];
	}
	return 'black';
};
