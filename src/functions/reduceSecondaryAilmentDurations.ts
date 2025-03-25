import { BattlePokemon } from '../interfaces/BattlePokemon';

export const reduceSecondaryAilmentDurations = (
	p: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	const updated = { ...p };
	//reduce ailment duration
	updated.secondaryAilments = updated.secondaryAilments
		.map((a) => {
			if (a.duration === 0) {
				addMessage(`${p.data.name} is no longer affected by ${a.type}`);
				return undefined;
			} else {
				return { ...a, duration: a.duration - 1 };
			}
		})
		.filter((a) => a !== undefined);

	return updated;
};
