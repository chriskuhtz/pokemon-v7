import { useState } from 'react';
import { Challenger, BattleChallenger } from '../../../interfaces/Challenger';

export const useChallenger = (
	init: Challenger
): {
	challenger: BattleChallenger | undefined;
	setChallenger: React.Dispatch<
		React.SetStateAction<BattleChallenger | undefined>
	>;
} => {
	const [challenger, setChallenger] = useState<BattleChallenger | undefined>();

	return { challenger, setChallenger };
};
