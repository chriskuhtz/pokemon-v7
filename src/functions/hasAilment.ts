import { AilmentType } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const hasAilment = (
	mon: BattlePokemon,
	ailment: AilmentType
): boolean => {
	return (
		mon.primaryAilment?.type === ailment ||
		mon.secondaryAilments.some((s) => s.type === ailment)
	);
};
