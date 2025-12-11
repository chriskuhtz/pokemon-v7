import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { getHeldItem } from './getHeldItem';
import { hasAilment } from './hasAilment';
import { hasType } from './hasType';
import { isOnGround } from './isOnGround';
import { isTrapped } from './isTrapped';

export const canRunOrSwitch = (
	controlled: BattlePokemon,
	battleFieldEffects: BattleFieldEffect[]
): boolean => {
	const runAwayer =
		controlled.ability === 'run-away' ||
		getHeldItem(controlled) === 'smoke-ball' ||
		getHeldItem(controlled) === 'shed-shell';

	if (runAwayer) {
		return true;
	}
	const trapped = isTrapped(controlled);
	const shadowTagged =
		controlled.ability !== 'shadow-tag' &&
		battleFieldEffects.some(
			(b) => b.type === 'shadow-tag' && b.ownerId !== controlled.ownerId
		);
	const arenaTrapped =
		isOnGround(controlled) &&
		battleFieldEffects.some(
			(b) => b.type === 'arena-trap' && b.ownerId !== controlled.ownerId
		);
	const magnetPulled =
		hasType(controlled, 'steel') &&
		battleFieldEffects.some(
			(b) => b.type === 'magnet-pull' && b.ownerId !== controlled.ownerId
		);
	const spiderWebbed = battleFieldEffects.some(
		(b) => b.type === 'spider-web' && b.ownerId !== controlled.ownerId
	);
	const meanLooked = hasAilment(controlled, 'mean-looked');
	const ingrained = hasAilment(controlled, 'ingrained');

	return !(
		trapped ||
		shadowTagged ||
		arenaTrapped ||
		magnetPulled ||
		spiderWebbed ||
		meanLooked ||
		ingrained
	);
};
