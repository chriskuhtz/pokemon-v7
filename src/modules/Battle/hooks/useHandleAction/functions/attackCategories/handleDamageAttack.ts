import { SELF_DESTRUCTING_MOVES } from '../../../../../../constants/selfDestructingMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../../functions/applyAttackAilmentsToPokemon';
import { applyAttackStatChanges } from '../../../../../../functions/applyAttackStatChanges';
import { calculateDamage } from '../../../../../../functions/calculateDamage';
import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { getMiddleOfThree } from '../../../../../../functions/getMiddleOfThree';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { isRemovedByRapidSpin } from '../../../../../../interfaces/Ailment';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { handleAbilitiesAfterAttack } from '../handleAbilitiesAfterAttack';

/**
 *
 * Damage Attacks damage the target w/o side effects
 */
export const handleDamageAttack = ({
	attacker,
	addMessage,
	move: m,
	battleWeather,
	battleFieldEffects,
	target,
	pokemon,
	removeSpikes,
	scatterCoins,
}: {
	attacker: BattlePokemon;
	target: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	battleFieldEffects: BattleFieldEffect[];
	dampy: { name: string } | undefined;
	removeSpikes: (ownerId: string) => void;
	scatterCoins: () => void;
}): BattlePokemon[] => {
	let updatedAttacker = { ...attacker };
	let updatedTarget = { ...target };
	let move = m;

	const isFlying =
		updatedTarget.moveQueue.length > 0 &&
		updatedTarget.moveQueue[0].type === 'BattleAttack' &&
		updatedTarget.moveQueue[0].name === 'fly';
	const isUnderground =
		updatedTarget.moveQueue.length > 0 &&
		updatedTarget.moveQueue[0].type === 'BattleAttack' &&
		updatedTarget.moveQueue[0].name === 'dig';

	const attackerIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedAttacker.ownerId
	);

	//TARGET

	//self destruct
	if (SELF_DESTRUCTING_MOVES.includes(move.name)) {
		addMessage({ message: `${updatedAttacker.name} self destructed` });
		updatedAttacker = { ...updatedAttacker, damage: updatedAttacker.stats.hp };
	}

	//fake out
	if (move.name === 'fake-out' && updatedAttacker.roundsInBattle !== 0) {
		addMessage({ message: 'It failed' });
		return pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				return updatedAttacker;
			}
			if (p.id === updatedTarget.id) {
				return updatedTarget;
			}
			return p;
		});
	}
	//focus punch
	if (move.name === 'focus-punch' && updatedAttacker.lastReceivedDamage) {
		addMessage({ message: 'It failed' });
		return pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				return updatedAttacker;
			}
			if (p.id === updatedTarget.id) {
				return updatedTarget;
			}
			return p;
		});
	}
	if (move.name === 'pay-day') {
		scatterCoins();
	}

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
	//DRAIN
	const getDrain = () => {
		if (move.data.meta.drain) {
			return move.data.meta.drain;
		}
		if (
			getHeldItem(updatedTarget) === 'jaboca-berry' &&
			move.data.damage_class.name === 'physical'
		) {
			addMessage({
				message: `${updatedTarget.name} somehow used its ${getHeldItem(
					updatedTarget,
					false
				)} to damage ${updatedAttacker.name}`,
			});
			updatedTarget = { ...updatedTarget, heldItemName: undefined };
			return -12.5;
		}
		if (
			getHeldItem(updatedTarget) === 'rowap-berry' &&
			move.data.damage_class.name === 'special'
		) {
			addMessage({
				message: `${updatedTarget.name} somehow used its ${getHeldItem(
					updatedTarget,
					false
				)} to damage ${updatedAttacker.name}`,
			});
			updatedTarget = { ...updatedTarget, heldItemName: undefined };
			return -12.5;
		}
	};
	const drain = getDrain();
	if (drain) {
		const absDrainValue = getMiddleOfThree([
			1,
			Math.round((damage * Math.abs(drain)) / 100),
			attacker.stats.hp,
		]);
		const drainValue = drain < 0 ? -absDrainValue : absDrainValue;
		const liquidOozedChecked =
			target.ability === 'liquid-ooze' && drain > 0 ? -drainValue : drainValue;
		const rockHeadChecked =
			attacker.ability === 'rock-head' && drain < 0 ? 0 : liquidOozedChecked;

		updatedAttacker = {
			...updatedAttacker,
			damage: getMiddleOfThree([
				0,
				updatedAttacker.damage - rockHeadChecked,
				updatedAttacker.stats.hp,
			]),
		};

		if (rockHeadChecked > 0 && target.ability === 'liquid-ooze') {
			addMessage({
				message: `${updatedAttacker.data.name} took ${absDrainValue} HP damage from liquid ooze`,
			});
		} else if (rockHeadChecked > 0) {
			addMessage({
				message: `${updatedAttacker.data.name} restored ${absDrainValue} HP`,
			});
		} else if (rockHeadChecked < 0) {
			addMessage({
				message: `${updatedAttacker.data.name} took ${absDrainValue} HP recoil damage`,
			});
		}
	}

	if (getHeldItem(updatedAttacker) === 'life-orb' && actualDamage > 0) {
		addMessage({ message: `${updatedAttacker.name} is hurt by life-orb` });
		updatedAttacker = {
			...updatedAttacker,
			damage:
				updatedAttacker.damage + Math.floor(updatedAttacker.stats.hp / 10),
		};
	}

	if (move.name === 'rapid-spin') {
		addMessage({
			message: `${updatedAttacker.name} blew away traps and other effects`,
		});
		updatedAttacker = {
			...updatedAttacker,
			secondaryAilments: (updatedAttacker.secondaryAilments ?? []).filter(
				isRemovedByRapidSpin
			),
		};
		removeSpikes(updatedTarget.ownerId);
	}
	if (move.name === 'fury-cutter') {
		updatedAttacker.furyCutterStack =
			(updatedAttacker.furyCutterStack ?? 0) + 1;
	} else updatedAttacker.furyCutterStack = 0;
	if (
		getHeldItem(updatedAttacker) === 'metronome' &&
		updatedAttacker.lastUsedMove?.name === move.name
	) {
		updatedAttacker.metronomeStack = (updatedAttacker.metronomeStack ?? 0) + 1;
	} else updatedAttacker.metronomeStack = 0;

	//ABILITYCHECK
	const { updatedAttacker: a, updatedTarget: t } = handleAbilitiesAfterAttack(
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
	updatedAttacker = { ...a };
	updatedTarget = { ...t };

	const category = move.data.meta.category.name;
	if (category === 'damage+raise') {
		updatedAttacker = applyAttackStatChanges(
			updatedAttacker,
			updatedAttacker.ability,
			move,
			addMessage,
			true,
			battleFieldEffects
		);
	}
	if (category === 'damage+lower') {
		updatedTarget = applyAttackStatChanges(
			updatedTarget,
			updatedTarget.ability,
			move,
			addMessage,
			false,
			battleFieldEffects
		);
	}
	if (category === 'damage+ailment' || attacker.ability === 'poison-touch') {
		if (attacker.ability === 'poison-touch') {
			move = {
				...move,
				data: {
					...move.data,
					meta: {
						...move.data.meta,
						ailment_chance: 30,
						ailment: { name: 'poison', url: '' },
					},
				},
			};
		}

		const targetIsSafeguarded =
			battleFieldEffects.some(
				(b) => b.type === 'safeguard' && b.ownerId === updatedTarget.ownerId
			) && attacker.ability !== 'infiltrator';
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
	}

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
