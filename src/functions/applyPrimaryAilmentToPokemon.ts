import { Message } from '../hooks/useMessageQueue';
import { PrimaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleTerrain';
import { applySecondaryAilmentToPokemon } from './applySecondaryAilmentToPokemon';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getTypeNames } from './getTypeNames';
import { isKO } from './isKo';

export const applyPrimaryAilmentToPokemon = (
	target: BattlePokemon,
	applicator: BattlePokemon,
	ailment: PrimaryAilment['type'],
	addMessage: (x: Message) => void,
	weather: WeatherType | undefined,
	battleFieldEffects: BattleFieldEffect[],
	terrain: BattleTerrain | undefined,
	suffix?: string
): { updatedTarget: BattlePokemon; updatedApplicator: BattlePokemon } => {
	if (
		battleFieldEffects.some(
			(b) => b.type === 'pastel-veil' && b.ownerId === target.ownerId
		) &&
		['poison', 'toxic'].includes(ailment)
	) {
		addMessage({ message: 'pastel veil stop the poison' });
		return { updatedApplicator: applicator, updatedTarget: target };
	}
	if (terrain === 'misty') {
		addMessage({ message: 'The misty terrain prevents all status conditions' });
		return { updatedApplicator: applicator, updatedTarget: target };
	}
	if (target.ability === 'purifying-salt') {
		addMessage({
			message: `${target.name} prevents status conditions with purifying salt`,
		});
		return { updatedApplicator: applicator, updatedTarget: target };
	}
	if (
		target.id !== applicator.id &&
		terrain === 'electric' &&
		ailment === 'sleep'
	) {
		addMessage({ message: 'The electric terrain prevents sleep' });
		return { updatedApplicator: applicator, updatedTarget: target };
	}

	if (target.ability === 'leaf-guard' && weather === 'sun') {
		addMessage({
			message: `${target.name} protects itself from ${ailment} with leaf guard`,
		});
		return { updatedTarget: target, updatedApplicator: applicator };
	}
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
		!['flash-fire', 'water-veil', 'water-bubble', 'thermal-exchange'].includes(
			target.ability
		)
	) {
		addMessage({
			message: `${target.data.name} was burned ${suffix ? 'by ' + suffix : ''}`,
		});
		if (
			target.id !== applicator.id &&
			target.ability === 'synchronize' &&
			!applicator.primaryAilment
		) {
			addMessage({
				message: `${target.data.name} synchronized the status condition`,
			});
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
		addMessage({
			message: `${target.data.name} was paralyzed ${
				suffix ? 'by ' + suffix : ''
			}`,
		});
		if (
			target.id !== applicator.id &&
			target.ability === 'synchronize' &&
			!applicator.primaryAilment
		) {
			addMessage({
				message: `${target.data.name} synchronized the status condition`,
			});
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
		addMessage({
			message: `${target.data.name} was frozen solid ${
				suffix ? 'by ' + suffix : ''
			}`,
		});
		return {
			updatedTarget: { ...target, primaryAilment: { type: 'freeze' } },
			updatedApplicator: applicator,
		};
	}
	if (
		ailment === 'sleep' &&
		!['vital-spirit', 'insomnia'].includes(target.ability)
	) {
		if (
			battleFieldEffects.some(
				(b) => b.type === 'sweet-veil' && b.ownerId === target.ownerId
			)
		) {
			addMessage({
				message: `${target.data.name} prevents sleep with sweet veil`,
			});
			return {
				updatedTarget: target,
				updatedApplicator: applicator,
			};
		}
		const duration = getMiddleOfThree([1, Math.round(Math.random() * 5), 4]);
		addMessage({
			message: `${target.data.name} was put to sleep ${
				suffix ? 'by ' + suffix : ''
			}`,
		});
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

	const blockPoisonWithType =
		applicator.ability !== 'corrosion' &&
		(getTypeNames(target).includes('poison') ||
			getTypeNames(target).includes('steel'));
	if (
		(ailment === 'poison' || ailment === 'toxic') &&
		!['immunity'].includes(target.ability) &&
		//poison and steel pokemon cant get poisoned
		!blockPoisonWithType
	) {
		addMessage({
			message: `${target.data.name} was ${
				ailment === 'toxic' ? 'badly' : ''
			} poisoned ${suffix ? 'by ' + suffix : ''}`,
		});
		if (
			target.id !== applicator.id &&
			target.ability === 'synchronize' &&
			!applicator.primaryAilment
		) {
			addMessage({
				message: `${target.data.name} synchronized the status condition`,
			});
			return {
				updatedTarget: { ...target, primaryAilment: { type: ailment } },
				updatedApplicator: { ...applicator, primaryAilment: { type: ailment } },
			};
		}
		const updatedT = { ...target, primaryAilment: { type: ailment } };

		if (applicator.ability === 'poison-puppeteer') {
			return {
				updatedTarget: applySecondaryAilmentToPokemon({
					pokemon: updatedT,
					addMessage,
					ailment: 'confusion',
					applicator,
				}),
				updatedApplicator: applicator,
			};
		}

		return {
			updatedTarget: updatedT,
			updatedApplicator: applicator,
		};
	}
	return { updatedTarget: target, updatedApplicator: applicator };
};
