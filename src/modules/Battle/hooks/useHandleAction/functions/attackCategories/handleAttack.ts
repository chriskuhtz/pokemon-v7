import { lockInMoves } from '../../../../../../constants/forceSwitchMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../../functions/applyAttackAilmentsToPokemon';
import { applyAttackStatChanges } from '../../../../../../functions/applyAttackStatChanges';
import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { calculateDamage } from '../../../../../../functions/calculateDamage';
import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { getMiddleOfThree } from '../../../../../../functions/getMiddleOfThree';
import { getTypeNames } from '../../../../../../functions/getTypeNames';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { handleAbilitiesAfterAttack } from '../handleAbilitiesAfterAttack';

export const handleAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	battleWeather,
	scatterCoins,
	battleFieldEffects,
	target,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	scatterCoins: () => void;
	battleFieldEffects: BattleFieldEffect[];
	target: BattlePokemon;
}): BattlePokemon[] => {
	let updatedAttacker = { ...attacker };
	let updatedTarget = { ...target };

	const isFlying =
		updatedTarget.moveQueue.length > 0 &&
		updatedTarget.moveQueue[0].type === 'BattleAttack' &&
		updatedTarget.moveQueue[0].name === 'fly';
	const isUnderground =
		updatedTarget.moveQueue.length > 0 &&
		updatedTarget.moveQueue[0].type === 'BattleAttack' &&
		updatedTarget.moveQueue[0].name === 'dig';

	const move = m;

	if (move.name === 'bide') {
		if (!updatedAttacker.biding) {
			addMessage({ message: `${updatedAttacker.name} is biding its time` });
			updatedAttacker = { ...updatedAttacker, biding: { turn: 1, damage: 0 } };
		} else if (updatedAttacker.biding?.turn === 1) {
			addMessage({ message: `${updatedAttacker.name} is biding its time` });
			updatedAttacker = {
				...updatedAttacker,
				biding: { ...updatedAttacker.biding, turn: 2 },
			};
		} else if (updatedAttacker.biding?.turn === 2) {
			addMessage({ message: `${updatedAttacker.name} released energy` });
		}
	}

	if (move.name === 'defense-curl') {
		updatedAttacker.defenseCurled = true;
	}
	if (move.name === 'fury-cutter') {
		updatedAttacker.furyCutterStack =
			(updatedAttacker.furyCutterStack ?? 0) + 1;
	} else updatedAttacker.furyCutterStack = 0;

	if (
		move.name === 'curse' &&
		getTypeNames(updatedAttacker).includes('ghost')
	) {
		updatedTarget = applySecondaryAilmentToPokemon({
			pokemon: updatedTarget,
			ailment: 'cursed',
			addMessage,
		});
		updatedAttacker = {
			...updatedAttacker,
			damage: updatedAttacker.damage + Math.floor(updatedAttacker.stats.hp / 2),
		};
		addMessage({
			message: `${updatedAttacker.name} cut its own hp to curse ${updatedTarget.name}`,
		});
	}

	if (move.name === 'pay-day') {
		addMessage({ message: `Coins scattered everywhere` });
		scatterCoins();
	}
	if (
		move.name === 'thief' &&
		updatedTarget.ability !== 'sticky-hold' &&
		getHeldItem(updatedTarget, false) &&
		!getHeldItem(updatedAttacker, false)
	) {
		addMessage({
			message: `${updatedAttacker.name} stole a ${getHeldItem(
				updatedTarget,
				false
			)} from ${updatedTarget.name}`,
		});

		updatedAttacker = {
			...updatedAttacker,
			heldItemName: getHeldItem(updatedTarget, false),
		};
		updatedTarget = { ...updatedTarget, heldItemName: undefined };
	}

	//UPDATES

	//ATTACKER
	//apply rage
	if (move.name === 'rage') {
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'raging',
			addMessage,
		});
	}

	//apply confusion on lock in end
	if (
		lockInMoves.includes(move.name) &&
		updatedAttacker.moveQueue.length === 1
	) {
		addMessage({ message: `${updatedAttacker.data.name} stopped thrashing` });
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			ailment: 'confusion',
			addMessage,
		});
	}

	const targetIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedTarget.ownerId
	);
	const attackerIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedAttacker.ownerId
	);

	//TARGET

	// apply damage
	const { consumedHeldItem, damage, criticalHit, wasSuperEffective } =
		calculateDamage(
			updatedAttacker,
			target,
			move,
			battleWeather,
			battleFieldEffects,
			true,
			isFlying,
			isUnderground,
			addMessage
		);
	const actualDamage = getMiddleOfThree([
		0,
		damage,
		updatedTarget.stats.hp - updatedTarget.damage,
	]);
	if (consumedHeldItem) {
		addMessage({
			message: `${updatedTarget.name} consumed its ${getHeldItem(
				updatedTarget,
				false
			)} to reduce the damage`,
		});
	}
	if (
		getHeldItem(updatedAttacker) === 'shell-bell' &&
		damage !== 0 &&
		updatedAttacker.damage !== 0
	) {
		addMessage({
			message: `${updatedAttacker.name} healed itself with shell bell`,
		});

		const restored = getMiddleOfThree([Math.floor(damage / 8), 1, 1]);
		updatedAttacker = {
			...updatedAttacker,
			damage: getMiddleOfThree([0, 0, updatedAttacker.damage - restored]),
		};
	}
	updatedTarget = {
		...updatedTarget,
		damage: updatedTarget.damage + actualDamage,
		//setLastReceivedDamage
		lastReceivedDamage: {
			attack: move,
			damage: actualDamage,
			applicatorId: attacker.id,
			wasSuperEffective: !!wasSuperEffective,
			wasPhysical: move.data.damage_class.name === 'physical',
			wasSpecial: move.data.damage_class.name === 'special',
		},
		heldItemName: consumedHeldItem
			? undefined
			: getHeldItem(updatedTarget, false),
		biding: updatedTarget.biding
			? {
					...updatedTarget.biding,
					damage: updatedTarget.biding.damage + damage,
			  }
			: undefined,
	};

	//apply ailments
	const { updatedApplicator: a, updatedTarget: b } =
		applyAttackAilmentsToPokemon(
			updatedTarget,
			updatedAttacker,
			move,
			addMessage,
			battleWeather,
			targetIsSafeguarded
		);
	updatedAttacker = a;
	updatedTarget = b;
	// apply stat changes
	if (
		move.data.meta.category.name === 'damage+lower' ||
		move.data.target.name === 'all-opponents' ||
		move.data.target.name === 'selected-pokemon' ||
		move.data.target.name === 'opponents-field'
	) {
		updatedTarget = applyAttackStatChanges(
			updatedTarget,
			updatedAttacker.ability,
			move,
			addMessage,
			false,
			battleFieldEffects
		);
	}

	const { updatedAttacker: afterAbilityCheck, updatedTarget: t } =
		handleAbilitiesAfterAttack(
			updatedAttacker,
			updatedTarget,
			move,
			addMessage,
			attackerIsSafeguarded,
			battleWeather,
			criticalHit,
			damage,
			battleFieldEffects
		);
	updatedAttacker = { ...afterAbilityCheck };
	updatedTarget = { ...t };

	return pokemon.map((p) => {
		if (p.id === updatedAttacker.id) {
			return updatedAttacker;
		}
		if (p.id === updatedTarget.id) {
			return updatedTarget;
		}
		return p;
	});
};
