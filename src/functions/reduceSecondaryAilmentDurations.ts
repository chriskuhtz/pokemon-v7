import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const reduceSecondaryAilmentDurations = (
	p: BattlePokemon,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	const updated = { ...p };
	//reduce ailment duration
	updated.secondaryAilments = updated.secondaryAilments
		.map((a) => {
			if (['trap', 'guard-spec'].includes(a.type)) {
				if (a.duration === 0) {
					if (a.type === 'trap') {
						dispatchToast(`${p.data.name} is no longer trapped`);
					}
					if (a.type === 'guard-spec') {
						dispatchToast(`${p.data.name}'s guard spec effect ended`);
					}
					if (a.type === 'disable') {
						dispatchToast(`${p.data.name} is no longer disabled`);
					}
					return undefined;
				} else {
					return { ...a, duration: a.duration - 1 };
				}
			}
		})
		.filter((a) => a !== undefined);

	return updated;
};
