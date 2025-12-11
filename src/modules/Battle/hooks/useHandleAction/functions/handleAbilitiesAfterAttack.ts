import {
	isContactMove,
	windMoves,
} from '../../../../../constants/groupedMoves';
import { applyPrimaryAilmentToPokemon } from '../../../../../functions/applyPrimaryAilmentToPokemon';
import { applySecondaryAilmentToPokemon } from '../../../../../functions/applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from '../../../../../functions/applyStatChangeToPokemon';
import { DamageAbsorbAbilityMap } from '../../../../../functions/calculateDamage';
import { getHeldItem } from '../../../../../functions/getHeldItem';
import { arePokemonOfOppositeGenders } from '../../../../../functions/getRivalryFactor';
import { handleFlinching } from '../../../../../functions/handleFlinching';
import { hasAilment } from '../../../../../functions/hasAilment';
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
import { Stat } from '../../../../../interfaces/StatObject';
import { WeatherType } from '../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../BattleField';
import { BattleTerrain, TerrainObject } from '../../useBattleTerrain';
import { WeatherObject } from '../../useBattleWeather';

export const handleAbilitiesAfterAttack = (
	attacker: BattlePokemon,
	target: BattlePokemon,
	move: BattleAttack,
	addMessage: (x: Message) => void,
	attackerIsSafeguarded: boolean,
	battleWeather: WeatherType | undefined,
	criticalHit: boolean | undefined,
	damage: number,
	battleFieldEffects: BattleFieldEffect[],
	originalTargetHp: number,
	terrain: BattleTerrain | undefined,
	setTerrain: (x: TerrainObject) => void,
	setWeather: (x: WeatherObject) => void
): {
	updatedAttacker: BattlePokemon;
	updatedTarget: BattlePokemon;
} => {
	let updatedAttacker = { ...attacker };
	let updatedTarget = { ...target };
	//perish-body
	if (
		!isKO(target) &&
		target.ability === 'perish-body' &&
		target.lastReceivedDamage
	) {
		addMessage({
			message: `${target.name} activates perish body`,
		});
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			addMessage,
			ailment: 'perish-songed',
			applicator: updatedTarget,
		});
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			addMessage,
			ailment: 'perish-songed',
			applicator: updatedTarget,
		});
	}
	//sand-spit
	if (
		!isKO(target) &&
		target.ability === 'sand-spit' &&
		target.lastReceivedDamage &&
		battleWeather !== 'sandstorm' &&
		battleWeather !== 'sandstorm_effectless'
	) {
		addMessage({
			message: `${target.name} uses ability sand spit to create a sandstorm`,
		});
		setWeather({ type: 'sandstorm', duration: 9000 });
	}
	//fell-stinger
	if (isKO(target) && move.name === 'fell-stinger') {
		updatedAttacker = applyStatChangeToPokemon(
			updatedAttacker,
			'attack',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'fell stinger'
		);
	}
	//final gambit
	if (move.name === 'final-gambit') {
		updatedAttacker = { ...updatedAttacker, damage: updatedAttacker.stats.hp };
		addMessage({ message: `${updatedAttacker.name} defeated itself` });
	}
	//innards out
	if (target.ability === 'innards-out' && isKO(target)) {
		addMessage({
			message: `${updatedAttacker.name} is damaged by innards-out`,
		});
		updatedAttacker = {
			...updatedAttacker,
			damage: updatedAttacker.damage + originalTargetHp,
		};
	}
	//wind power
	if (
		!isKO(target) &&
		attacker.ability === 'toxic-chain' &&
		isContactMove(move.name, attacker) &&
		!target.primaryAilment &&
		Math.random() > 0.7
	) {
		const r = applyPrimaryAilmentToPokemon(
			updatedTarget,
			updatedAttacker,
			'toxic',
			addMessage,
			battleWeather,
			battleFieldEffects,
			terrain,
			'by toxic chain'
		);

		updatedTarget = r.updatedTarget;
		updatedAttacker = r.updatedApplicator;
	}
	//wind power
	if (
		!isKO(target) &&
		target.ability === 'wind-power' &&
		windMoves.includes(move.name)
	) {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			addMessage,
			ailment: 'charge',
			applicator: updatedAttacker,
		});
	}
	//wind power
	if (
		!isKO(target) &&
		target.ability === 'electromorphosis' &&
		(target.lastReceivedDamage?.damage ?? 0) > 0
	) {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			addMessage,
			ailment: 'charge',
			applicator: updatedAttacker,
		});
	}
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
			damage: Math.max(
				0,
				updatedTarget.damage - Math.floor(target.stats.hp / 4)
			),
		};
	}

	//seed sower
	if (
		target.ability === 'seed-sower' &&
		terrain !== 'grassy' &&
		isContactMove(move.name, attacker)
	) {
		addMessage({
			message: `${target.name} deploys grassy terrain with seed sower`,
		});
		setTerrain({ type: 'grassy', duration: 5 });
	}
	//check for mummy
	if (target.ability === 'mummy' && isContactMove(move.name, attacker)) {
		addMessage({ message: `${updatedAttacker.name}'s ability became mummy` });
		updatedAttacker.ability = 'mummy';
	}
	//check for 'lingering-aroma',
	if (
		target.ability === 'lingering-aroma' &&
		isContactMove(move.name, attacker)
	) {
		addMessage({
			message: `${updatedAttacker.name}'s ability became lingering aroma`,
		});
		updatedAttacker.ability = 'lingering-aroma';
	}
	//check for wandering spirit
	if (
		target.ability === 'wandering-spirit' &&
		isContactMove(move.name, attacker)
	) {
		addMessage({
			message: `${target.name} traded the wandering spirit ability to ${attacker.name}`,
		});
		updatedAttacker.ability = 'wandering-spirit';
		updatedTarget.ability = attacker.ability;
	}
	if (
		attacker.ability === 'wandering-spirit' &&
		isContactMove(move.name, attacker)
	) {
		addMessage({
			message: `${attacker.name} traded the wandering spirit ability to ${target.name}`,
		});
		updatedAttacker.ability = target.ability;
		updatedTarget.ability = 'wandering-spirit';
	}
	//check for static
	if (
		target.ability === 'static' &&
		isContactMove(move.name, attacker) &&
		Math.random() < STATIC_CHANCE &&
		!attackerIsSafeguarded
	) {
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			'paralysis',
			addMessage,
			battleWeather,
			battleFieldEffects,
			terrain,
			`by ${target.data.name}'s static`
		);
		updatedAttacker = b;
	}
	//check for gooey
	if (target.ability === 'gooey' && isContactMove(move.name, attacker)) {
		updatedAttacker = applyStatChangeToPokemon(
			updatedAttacker,
			'speed',
			-1,
			false,
			battleFieldEffects,
			addMessage,
			'gooey'
		);
	}
	//check for gooey
	if (target.ability === 'cotton-down' && isContactMove(move.name, attacker)) {
		updatedAttacker = applyStatChangeToPokemon(
			updatedAttacker,
			'speed',
			-1,
			false,
			battleFieldEffects,
			addMessage,
			'cotton-down'
		);
	}
	//check for tangling hair
	if (
		target.ability === 'tangling-hair' &&
		isContactMove(move.name, attacker)
	) {
		updatedAttacker = applyStatChangeToPokemon(
			updatedAttacker,
			'speed',
			-1,
			false,
			battleFieldEffects,
			addMessage,
			'tangling hair'
		);
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
	//check for stamina
	if (
		target.ability === 'stamina' &&
		move.data.damage_class.name !== 'status'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'defense',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'stamina'
		);
	}
	//check for flame-body
	if (
		target.ability === 'flame-body' &&
		isContactMove(move.name, attacker) &&
		Math.random() < FLAME_BODY_CHANCE &&
		!attackerIsSafeguarded
	) {
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			'burn',
			addMessage,
			battleWeather,
			battleFieldEffects,
			terrain,
			`by ${target.data.name}'s flame body`
		);
		updatedAttacker = b;
	}
	//check for cute charm
	if (
		target.ability === 'cute-charm' &&
		arePokemonOfOppositeGenders(attacker.gender, updatedTarget.gender) ===
			'YES' &&
		isContactMove(move.name, attacker) &&
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
		isContactMove(move.name, attacker) &&
		Math.random() < POISON_POINT_CHANCE &&
		!attackerIsSafeguarded
	) {
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			'poison',
			addMessage,
			battleWeather,
			battleFieldEffects,
			terrain,
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
		isContactMove(move.name, attacker) &&
		Math.random() < EFFECT_SPORE_CHANCE &&
		!attackerIsSafeguarded
	) {
		const possibleAilments = ['paralysis', 'poison', 'sleep'];
		const { updatedTarget: b } = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			updatedAttacker,
			possibleAilments[
				ArrayHelpers.getRandomIndex(possibleAilments.length)
			] as PrimaryAilment['type'],
			addMessage,
			battleWeather,
			battleFieldEffects,
			terrain,
			`by ${target.data.name}'s effect spore`
		);
		updatedAttacker = b;
	}

	//check for rocky-helmet
	if (
		getHeldItem(target) === 'rocky-helmet' &&
		isContactMove(move.name, attacker)
	) {
		updatedAttacker = {
			...updatedAttacker,
			damage:
				updatedAttacker.damage +
				Math.round(updatedAttacker.stats.hp * ROUGH_SKIN_FACTOR),
		};
		addMessage({
			message: `${updatedAttacker.data.name} was hurt by ${updatedTarget.name}'s rocky helmet`,
		});
	}
	//check for rough-skin
	if (target.ability === 'rough-skin' && isContactMove(move.name, attacker)) {
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
	if (target.ability === 'iron-barbs' && isContactMove(move.name, attacker)) {
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
			'anger point'
		);
	}
	// check steam engine
	if (
		!isKO(updatedTarget) &&
		updatedTarget.ability === 'steam-engine' &&
		updatedTarget.lastReceivedDamage &&
		['fire', 'water'].includes(
			updatedTarget.lastReceivedDamage.attack.data.type.name
		)
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'speed',
			3,
			true,
			battleFieldEffects,
			addMessage,
			'steam engine'
		);
	}
	// apply rage boost
	if (!isKO(updatedTarget) && damage > 0 && hasAilment(target, 'raging')) {
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
			'motor drive'
		);
	}
	// apply water compaction boost
	if (
		!isKO(updatedTarget) &&
		move.data.type.name === 'water' &&
		['physical', 'special'].includes(move.data.damage_class.name) &&
		target.ability === 'water-compaction'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'defense',
			2,
			true,
			battleFieldEffects,
			addMessage,
			'water compaction'
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
		isContactMove(move.name, attacker) &&
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
	//thermal exchange
	if (
		!isKO(updatedTarget) &&
		updatedTarget.ability === 'thermal-exchange' &&
		move.data.type.name === 'fire'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'thermal-exchange'
		);
	}
	//wind rider
	if (
		!isKO(updatedTarget) &&
		updatedTarget.ability === 'wind-rider' &&
		windMoves.includes(move.name)
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'wind-rider'
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
		isContactMove(move.name, attacker)
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
	//chilling neigh
	if (isKO(updatedTarget) && updatedAttacker.ability === 'chilling-neigh') {
		updatedAttacker = applyStatChangeToPokemon(
			updatedAttacker,
			'attack',
			1,
			true,
			[],
			addMessage,
			'chilling-neigh'
		);
	}
	//grim neigh
	if (isKO(updatedTarget) && updatedAttacker.ability === 'grim-neigh') {
		updatedAttacker = applyStatChangeToPokemon(
			updatedAttacker,
			'attack',
			1,
			true,
			[],
			addMessage,
			'grim-neigh'
		);
	}
	//Beast boost
	if (isKO(updatedTarget) && updatedAttacker.ability === 'beast-boost') {
		const highestStatName = Object.entries(updatedAttacker.stats).sort(
			([, value], [, value2]) => value2 - value
		)[0][0] as Stat;
		updatedAttacker = applyStatChangeToPokemon(
			updatedAttacker,
			highestStatName,
			1,
			true,
			[],
			addMessage,
			'beast-boost'
		);
	}

	return { updatedAttacker, updatedTarget };
};
