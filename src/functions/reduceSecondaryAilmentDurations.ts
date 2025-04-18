import { BattlePokemon } from '../interfaces/BattlePokemon';

export const reduceSecondaryAilmentDurations = (
	p: BattlePokemon,
	addMessage: (x: string) => void,
	allOnField: BattlePokemon[]
): BattlePokemon => {
	const updated = { ...p };
	//reduce ailment duration
	updated.secondaryAilments = updated.secondaryAilments
		.map((a) => {
			if (a.by && !allOnField.some((onfielder) => onfielder.id === a.by)) {
				addMessage(`${p.data.name} is no longer affected by ${a.type}`);
				return undefined;
			}
			if (a.duration === 0) {
				if (a.type === 'perish-songed') {
					addMessage(`${p.data.name} fainted`);
					updated.damage = updated.stats.hp;
					return;
				}
				addMessage(`${p.data.name} is no longer affected by ${a.type}`);
				return undefined;
			} else {
				if (a.type === 'perish-songed') {
					addMessage(
						`${p.data.name} will faint in ${a.duration} turns due to perish song`
					);
				}
				return { ...a, duration: a.duration - 1 };
			}
		})
		.filter((a) => a !== undefined);
	updated.protected = false;
	updated.endured = false;
	updated.helpingHanded = false;

	return updated;
};
