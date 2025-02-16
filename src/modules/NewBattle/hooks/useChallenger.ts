import { useCallback, useEffect, useState } from 'react';
import { isKO } from '../../../functions/isKo';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { BattleChallenger, Challenger } from '../../../interfaces/Challenger';

export const useChallenger = (
	init: Challenger
): {
	challenger: BattleChallenger | undefined;
	putPokemonOnField: (id: string) => void;
} => {
	if (init.team.length > 6) {
		throw new Error(`Too many members for 1 battle, ${init}`);
	}
	const [challenger, setChallenger] = useState<BattleChallenger | undefined>();

	const { res } = useGetBattleTeam(init);
	useEffect(() => {
		if (res) {
			setChallenger({
				...init,
				team: res
					.map((r) => (r.status === 'fulfilled' ? r.value : undefined))
					.filter((t) => t !== undefined),
			});
		}
	}, [init, res]);

	const putPokemonOnField = useCallback((id: string) => {
		setChallenger((challenger) => {
			if (!challenger) {
				return;
			}
			const mon = challenger?.team.find((p) => p.id === id);

			if (!mon) {
				return;
			}
			if (isKO(mon)) {
				return;
			}
			return {
				...challenger,
				team: challenger.team.map((p) => {
					if (p.id === id) {
						return { ...p, onField: true };
					}
					return p;
				}),
			};
		});
	}, []);

	return { challenger, putPokemonOnField };
};
