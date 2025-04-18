import { contactMoves } from '../../../../../constants/contactMoves';
import { applyPrimaryAilmentToPokemon } from '../../../../../functions/applyPrimaryAilmentToPokemon';
import { applySecondaryAilmentToPokemon } from '../../../../../functions/applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from '../../../../../functions/applyStatChangeToPokemon';
import { DamageAbsorbAbilityMap } from '../../../../../functions/calculateDamage';
import { getRandomIndex } from '../../../../../functions/filterTargets';
import { getHeldItem } from '../../../../../functions/getHeldItem';
import { arePokemonOfOppositeGenders } from '../../../../../functions/getRivalryFactor';
import { handleFlinching } from '../../../../../functions/handleFlinching';
import { isKO } from '../../../../../functions/isKo';
import { Message } from '../../../../../hooks/useMessageQueue';
import {
	CURSED_BODY_CHANCE,
	CUTE_CHARM_CHANCE,
	EFFECT_SPORE_CHANCE,
	FLAME_BODY_CHANCE,
	POISON_POINT_CHANCE,
	PrimaryAilment,
	ROUGH_SKIN_FACTOR,
	STATIC_CHANCE,
} from '../../../../../interfaces/Ailment';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../BattleField';

export const handleAbilitiesAfterAttack = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	move: BattleAttack,
	addMessage: (x: Message) => void,
	attackerIsSafeguarded: boolean,
	battleWeather: WeatherType | undefined,
	criticalHit: boolean | undefined,
	damage: number,
	battleFieldEffects: BattleFieldEffect[]
): {
	updatedAttacker: BattlePokemon;
	updatedTarget: BattlePokemon;
} => {
	let updatedAttacker = { ...attacker };
	let updatedTarget = { ...target };

	//volt-absorb, water-absorb, dry-skin
	const absorbAbility = DamageAbsorbAbilityMap[target.ability];
	if (
		absorbAbility === move.data.type.name &&
		move.data.damage_class.name !== 'status' &&
		updatedTarget.damage > 0
	) {
		addMessage({
			message: `${target.data.name} was healed by ${target.ability}`,
		});

		updatedTarget = {
			...updatedTarget,
			damage: Math.min(
				0,
				updatedTarget.damage - Math.floor(target.stats.hp / 4)
			),
		};
	}
	//check for mummy
	if (target.ability === 'mummy' && contactMoves.includes(move.name)) {
		addMessage({ message: `${updatedAttacker.name}'s ability became mummy` });
		updatedAttacker.ability = 'mummy';
	}
	//check for static
	if (
		target.ability === 'static' &&
		contactMoves.includes(move.name) &&
		Math.random() < STATIC_CHANCE &&
		!attackerIsSafeguarded
	) {
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			'paralysis',
			addMessage,
			battleWeather,
			`by ${target.data.name}'s static`
		);
		updatedAttacker = b;
	}
	//check for magician
	if (
		target.ability === 'magician' &&
		move.data.damage_class.name !== 'status' &&
		updatedAttacker.heldItemName &&
		!target.heldItemName
	) {
		addMessage({
			message: `${updatedTarget.name} stole ${updatedAttacker.name}'s ${updatedAttacker.heldItemName} with magician`,
		});
		updatedTarget = {
			...updatedTarget,
			heldItemName: updatedAttacker.heldItemName,
		};
		updatedAttacker = { ...updatedAttacker, heldItemName: undefined };
	}
	//check for flame-body
	if (
		target.ability === 'flame-body' &&
		contactMoves.includes(move.name) &&
		Math.random() < FLAME_BODY_CHANCE &&
		!attackerIsSafeguarded
	) {
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			'burn',
			addMessage,
			battleWeather,
			`by ${target.data.name}'s flame body`
		);
		updatedAttacker = b;
	}
	//check for cute charm
	if (
		target.ability === 'cute-charm' &&
		arePokemonOfOppositeGenders(attacker.gender, updatedTarget.gender) ===
			'YES' &&
		contactMoves.includes(move.name) &&
		Math.random() < CUTE_CHARM_CHANCE
	) {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'infatuation',
			addMessage,
			targetId: updatedTarget.id,
			applicator: updatedTarget,
		});
	}
	//check for poison-point
	if (
		target.ability === 'poison-point' &&
		contactMoves.includes(move.name) &&
		Math.random() < POISON_POINT_CHANCE &&
		!attackerIsSafeguarded
	) {
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			'poison',
			addMessage,
			battleWeather,
			`by ${target.data.name}'s poison point`
		);
		updatedAttacker = b;
	}
	//check for cursed body
	if (
		target.ability === 'cursed-body' &&
		Math.random() < CURSED_BODY_CHANCE &&
		!attackerIsSafeguarded
	) {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'disable',
			addMessage,
			move: move.name,
			by: 'cursed-body',
			applicator: updatedTarget,
		});
	}
	//check for effect spore
	if (
		target.ability === 'effect-spore' &&
		contactMoves.includes(move.name) &&
		Math.random() < EFFECT_SPORE_CHANCE &&
		!attackerIsSafeguarded
	) {
		const possibleAilments = ['paralysis', 'poison', 'sleep'];
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			possibleAilments[
				getRandomIndex(possibleAilments.length)
			] as PrimaryAilment['type'],
			addMessage,
			battleWeather,
			`by ${target.data.name}'s effect spore`
		);
		updatedAttacker = b;
	}
	//check for rough-skin
	if (target.ability === 'rough-skin' && contactMoves.includes(move.name)) {
		updatedAttacker = {
			...updatedAttacker,
			damage:
				updatedAttacker.damage +
				Math.round(updatedAttacker.stats.hp * ROUGH_SKIN_FACTOR),
		};
		addMessage({
			message: `${updatedAttacker.data.name} was hurt by rough skin`,
		});
	} //check for iron barbs
	if (target.ability === 'iron-barbs' && contactMoves.includes(move.name)) {
		updatedAttacker = {
			...updatedAttacker,
			damage:
				updatedAttacker.damage +
				Math.round(updatedAttacker.stats.hp * ROUGH_SKIN_FACTOR),
		};
		addMessage({
			message: `${updatedAttacker.data.name} was hurt by iron barbs`,
		});
	}
	// check anger point
	if (
		!isKO(updatedTarget) &&
		criticalHit &&
		updatedTarget.ability === 'anger-point'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			6,
			true,
			battleFieldEffects,
			addMessage,
			'with anger point'
		);
	}
	// apply rage boost
	if (
		!isKO(updatedTarget) &&
		damage > 0 &&
		target.secondaryAilments.some((a) => a.type === 'raging')
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			1,
			true,
			battleFieldEffects,
			addMessage,
			' by rage'
		);
	}
	// apply motor drive boost
	if (
		!isKO(updatedTarget) &&
		move.data.type.name === 'electric' &&
		['physical', 'special'].includes(move.data.damage_class.name) &&
		target.ability === 'motor-drive'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'speed',
			1,
			true,
			battleFieldEffects,
			addMessage,
			' by motor drive'
		);
	}
	//check for flinch
	if (!isKO(updatedTarget)) {
		updatedTarget = handleFlinching(
			updatedAttacker,
			updatedTarget,
			move,
			addMessage
		);
	}
	//check flash fire
	if (
		!isKO(updatedTarget) &&
		target.ability === 'flash-fire' &&
		move.data.type.name === 'fire'
	) {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'flash-fire',
			addMessage,
			applicator: updatedTarget,
		});
	}
	//check lightning rod
	if (
		!isKO(updatedTarget) &&
		target.ability === 'lightning-rod' &&
		move.data.type.name === 'electric'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'special-attack',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'lightning-rod'
		);
	}
	//check lightning rod
	if (
		!isKO(updatedTarget) &&
		target.ability === 'sap-sipper' &&
		move.data.type.name === 'grass'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'sap sipper'
		);
	}
	//check storm drain
	if (
		!isKO(updatedTarget) &&
		target.ability === 'storm-drain' &&
		move.data.type.name === 'water'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'special-attack',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'by storm-drain'
		);
	}
	//check color change
	if (
		!isKO(updatedTarget) &&
		updatedTarget.damage > target.damage &&
		updatedTarget.ability === 'color-change'
	) {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'color-changed',
			addMessage,
			newType: move.data.type.name,
			applicator: updatedTarget,
		});
	}

	//pickpocket
	if (
		!isKO(updatedTarget) &&
		contactMoves.includes(move.name) &&
		updatedTarget.ability === 'pickpocket' &&
		!getHeldItem(updatedTarget) &&
		getHeldItem(updatedAttacker, false)
	) {
		updatedTarget.heldItemName = getHeldItem(updatedAttacker, false);
		updatedAttacker.heldItemName = undefined;
		addMessage({
			message: `${updatedTarget.name} stole ${updatedAttacker.name}'s held item with pickpocket`,
		});
	}
	//weak armor
	if (
		!isKO(updatedTarget) &&
		updatedTarget.ability === 'weak-armor' &&
		move.data.damage_class.name == 'physical'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'speed',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'weak armor'
		);
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'defense',
			-1,
			true,
			battleFieldEffects,
			addMessage,
			'weak armor'
		);
	}
	//justified
	if (
		!isKO(updatedTarget) &&
		updatedTarget.ability === 'justified' &&
		move.data.type.name === 'dark'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'justified'
		);
	}
	//rattled
	if (
		!isKO(updatedTarget) &&
		updatedTarget.ability === 'rattled' &&
		(move.data.type.name === 'dark' ||
			move.data.type.name === 'bug' ||
			move.data.type.name === 'ghost')
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'speed',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'rattled'
		);
	}
	//smelling salts para heal
	if (
		!isKO(updatedTarget) &&
		updatedTarget.lastReceivedDamage?.attack.name === 'smelling-salts' &&
		updatedTarget.primaryAilment?.type === 'paralysis'
	) {
		addMessage({ message: `${updatedTarget.name}'s paralysis was cured` });
		updatedTarget = { ...updatedTarget, primaryAilment: undefined };
	}

	//Aftermath
	if (
		isKO(updatedTarget) &&
		updatedTarget.ability === 'aftermath' &&
		contactMoves.includes(move.name)
	) {
		addMessage({ message: `${updatedAttacker.name} is hurt by aftermath` });
		updatedAttacker = {
			...updatedAttacker,
			damage: Math.floor(updatedAttacker.damage + updatedAttacker.stats.hp / 4),
		};
	}
	//Moxie
	if (isKO(updatedTarget) && updatedAttacker.ability === 'moxie') {
		updatedAttacker = applyStatChangeToPokemon(
			updatedAttacker,
			'attack',
			1,
			true,
			[],
			addMessage,
			'moxie'
		);
	}

	return { updatedAttacker, updatedTarget };
};
