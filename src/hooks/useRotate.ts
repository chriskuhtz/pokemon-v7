import { useEffect, useState } from 'react';
import { animationTimer } from '../constants/gameData/gameData';
import { getNextClockWiseDirection } from '../functions/getNextClockwiseDirection';
import { CharacterOrientation } from '../interfaces/SaveFile';

export const useRotate = (): CharacterOrientation => {
	const [cur, setCur] = useState<CharacterOrientation>('DOWN');
	useEffect(() => {
		const t = setTimeout(
			() => setCur(getNextClockWiseDirection(cur)),
			animationTimer
		);

		return () => clearTimeout(t);
	}, [cur]);

	return cur;
};
