import { ForwardFoot } from '../interfaces/SaveFile';

export const getNextForwardFoot = (current: ForwardFoot): ForwardFoot => {
	if (current === 'CENTER1') {
		return 'RIGHT';
	}
	if (current === 'RIGHT') {
		return 'CENTER2';
	}
	if (current === 'CENTER2') {
		return 'LEFT';
	}
	return 'CENTER1';
};
