import { AddToastFunction } from '../hooks/useToasts';
import { PrimaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getTypeNames } from './getTypeNames';
import { isKO } from './isKo';

export const applyPrimaryAilmentToPokemon = (
	target: BattlePokemon,
	applicator: BattlePokemon,
	ailment: PrimaryAilment['type'],
	dispatchToast: AddToastFunction,
	toastSuffix?: string
): { updatedTarget: BattlePokemon; updatedApplicator: BattlePokemon } => {
	if (isKO(target)) {
		//already knocked out, no need to add ailments
		return { updatedTarget: target, updatedApplicator: applicator };
	}
	if (target.primaryAilment) {
		//already has an ailment
		return { updatedTarget: target, updatedApplicator: applicator };
	}

	if (
		ailment === 'burn' &&
		//fire pokemon cant get burned
		!getTypeNames(target).includes('fire') &&
		//flash fire pokemon cant get burned
		!['flash-fire', 'water-veil'].includes(target.ability)
	) {
		dispatchToast(
			`${target.data.name} was burned ${toastSuffix ? 'by ' + toastSuffix : ''}`
		);
		if (
			target.id !== applicator.id &&
			target.ability === 'synchronize' &&
			!applicator.primaryAilment
		) {
			dispatchToast(`${target.data.name} synchronized the status condition`);
			return {
				updatedTarget: { ...target, primaryAilment: { type: 'burn' } },
				updatedApplicator: { ...applicator, primaryAilment: { type: 'burn' } },
			};
		}

		return {
			updatedTarget: { ...target, primaryAilment: { type: 'burn' } },
			updatedApplicator: applicator,
		};
	}
	if (
		ailment === 'paralysis' &&
		//electric pokemon cant get paralyzed
		!getTypeNames(target).includes('electric') &&
		//limber pokemon cant get paralyzed
		target.ability !== 'limber'
	) {
		dispatchToast(
			`${target.data.name} was paralyzed ${
				toastSuffix ? 'by ' + toastSuffix : ''
			}`
		);
		if (
			target.id !== applicator.id &&
			target.ability === 'synchronize' &&
			!applicator.primaryAilment
		) {
			dispatchToast(`${target.data.name} synchronized the status condition`);
			return {
				updatedTarget: { ...target, primaryAilment: { type: 'paralysis' } },
				updatedApplicator: {
					...applicator,
					primaryAilment: { type: 'paralysis' },
				},
			};
		}

		return {
			updatedTarget: { ...target, primaryAilment: { type: 'paralysis' } },
			updatedApplicator: applicator,
		};
	}
	if (
		ailment === 'freeze' &&
		//ice pokemon cant get frozen
		!getTypeNames(target).includes('ice') &&
		target.ability !== 'magma-armor'
	) {
		dispatchToast(
			`${target.data.name} was frozen solid ${
				toastSuffix ? 'by ' + toastSuffix : ''
			}`
		);
		return {
			updatedTarget: { ...target, primaryAilment: { type: 'freeze' } },
			updatedApplicator: applicator,
		};
	}
	if (
		ailment === 'sleep' &&
		!['vital-spirit', 'insomnia'].includes(target.ability)
	) {
		const duration = getMiddleOfThree([1, Math.round(Math.random() * 5), 4]);
		dispatchToast(
			`${target.data.name} was put to sleep for ${duration} turns ${
				toastSuffix ? 'by ' + toastSuffix : ''
			}`
		);
		return {
			updatedTarget: {
				...target,
				primaryAilment: {
					type: 'sleep',
					duration,
				},
			},
			updatedApplicator: applicator,
		};
	}
	if (
		(ailment === 'poison' || ailment === 'toxic') &&
		!['immunity'].includes(target.ability) &&
		//poison and steel pokemon cant get poisoned
		!getTypeNames(target).includes('poison') &&
		!getTypeNames(target).includes('steel')
	) {
		dispatchToast(
			`${target.data.name} was ${ailment === 'toxic' ? 'badly' : ''} poisoned ${
				toastSuffix ? 'by ' + toastSuffix : ''
			}`
		);
		if (
			target.id !== applicator.id &&
			target.ability === 'synchronize' &&
			!applicator.primaryAilment
		) {
			dispatchToast(`${target.data.name} synchronized the status condition`);
			return {
				updatedTarget: { ...target, primaryAilment: { type: ailment } },
				updatedApplicator: { ...applicator, primaryAilment: { type: ailment } },
			};
		}

		return {
			updatedTarget: { ...target, primaryAilment: { type: ailment } },
			updatedApplicator: applicator,
		};
	}
	return { updatedTarget: target, updatedApplicator: applicator };
};
