import { AddToastFunction } from '../hooks/useToasts';
import { SecondaryAilmentType } from '../interfaces/Ailment';
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
				if (a.type === 'locked-in') {
					//pokemon become confused after lock in ends
					dispatchToast(`${p.data.name} became confused from exhaustion`);
					return {
						type: 'confusion' as SecondaryAilmentType,
						duration: 2 + Math.round(Math.random() * 3),
					};
				}
				return undefined;
			} else {
				return { ...a, duration: a.duration - 1 };
			}
		})
		.filter((a) => a !== undefined);

	return updated;
};
