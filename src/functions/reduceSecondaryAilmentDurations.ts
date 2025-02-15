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
			if (a.duration === 0) {
				if (a.type === 'confusion') {
					dispatchToast(`${p.data.name} is no longer confused`);
				}
				if (a.type === 'trap') {
					dispatchToast(`${p.data.name} is no longer trapped`);
				}

				return undefined;
			} else {
				return { ...a, duration: a.duration - 1 };
			}
		})
		.filter((a) => a !== undefined);

	return updated;
};
