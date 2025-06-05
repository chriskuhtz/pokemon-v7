import {
	firstTurnMoves,
	isContactMove,
	SELF_DESTRUCTING_MOVES,
} from '../../../../../../constants/groupedMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../../functions/applyAttackAilmentsToPokemon';
import { applyAttackStatChanges } from '../../../../../../functions/applyAttackStatChanges';
import { applyDrainOrRecoil } from '../../../../../../functions/applyDrainOrRecoil';
import { applySecondaryAilmentToPokemon } from '../../../../../../functions/applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from '../../../../../../functions/applyStatChangeToPokemon';
import { calculateDamage } from '../../../../../../functions/calculateDamage';
import { checkThiefMoves } from '../../../../../../functions/checkThiefMoves';
import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { getMiddleOfThree } from '../../../../../../functions/getMiddleOfThree';
import { getPlayerId } from '../../../../../../functions/getPlayerId';
import { getTypeNames } from '../../../../../../functions/getTypeNames';
import { isKO } from '../../../../../../functions/isKo';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { isRemovedByRapidSpin } from '../../../../../../interfaces/Ailment';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { gemTable, isBerry } from '../../../../../../interfaces/Item';
import { EmptyStatObject } from '../../../../../../interfaces/StatObject';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../../BattleField';
import { BattleTerrain, TerrainObject } from '../../../useBattleTerrain';
import { WeatherObject } from '../../../useBattleWeather';
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
	removeScreens,
	scatterCoins,
	targetsFactor,
	logDamage,
	terrain,
	setTerrain,
	setWeather,
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
	removeScreens: (ownerId: string) => void;
	scatterCoins: () => void;
	targetsFactor: number;
	logDamage: (x: number) => void;
	terrain: BattleTerrain | undefined;
	setTerrain: (x: TerrainObject) => void;
	setWeather: (x: WeatherObject) => void;
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
	const isDiving =
		updatedTarget.moveQueue.length > 0 &&
		updatedTarget.moveQueue[0].type === 'BattleAttack' &&
		updatedTarget.moveQueue[0].name === 'dive';

	const attackerIsSafeguarded = battleFieldEffects.some(
		(b) => b.type === 'safeguard' && b.ownerId === updatedAttacker.ownerId
	);

	//TARGET

	//self destruct
	if (SELF_DESTRUCTING_MOVES.includes(move.name)) {
		addMessage({ message: `${updatedAttacker.name} self destructed` });
		updatedAttacker = { ...updatedAttacker, damage: updatedAttacker.stats.hp };
	}
	//endeavor
	if (
		move.name === 'endeavor' &&
		updatedTarget.stats.hp - updatedTarget.damage <=
			updatedAttacker.stats.hp - updatedAttacker.damage
	) {
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
	//fake out
	if (
		firstTurnMoves.includes(move.name) &&
		updatedAttacker.roundsInBattle !== 1
	) {
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
	if (
		move.name === 'burn-up' &&
		!getTypeNames(updatedAttacker).includes('fire')
	) {
		addMessage({ message: 'it failed' });
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
	//fake out
	if (move.name === 'belch' && !updatedAttacker.consumedBerry) {
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
	//pay day
	if (move.name === 'pay-day') {
		scatterCoins();
	}
	//clear smog
	if (move.name === 'clear-smog') {
		addMessage({ message: `${updatedTarget.name}´s stat changes were reset` });

		updatedTarget = { ...updatedTarget, statBoosts: EmptyStatObject };
	}
	//knock off
	if (
		move.name === 'knock-off' &&
		updatedTarget.ability !== 'sticky-hold' &&
		updatedTarget.heldItemName
	) {
		addMessage({
			message: `${updatedAttacker.name} knocks away ${updatedTarget.name}'s ${updatedTarget.heldItemName}`,
		});
		updatedTarget = { ...updatedTarget, heldItemName: undefined };
	}
	//thief moves
	const { updatedAttacker: aThiefChecked, updatedTarget: tThiefChecked } =
		checkThiefMoves(updatedAttacker, updatedTarget, move.name, addMessage);
	updatedAttacker = { ...aThiefChecked };
	updatedTarget = { ...tThiefChecked };
	//incinerate
	if (move.name === 'incinerate' && isBerry(getHeldItem(updatedTarget))) {
		addMessage({
			message: `${updatedTarget}´s ${updatedTarget.heldItemName} was burned to ash`,
		});

		updatedTarget = { ...updatedTarget, heldItemName: undefined };
	}
	//sparkling-aria
	if (
		move.name === 'sparkling-aria' &&
		updatedTarget.primaryAilment?.type === 'burn'
	) {
		addMessage({ message: `${updatedTarget.name}'s burn was healed` });
		updatedTarget = { ...updatedTarget, primaryAilment: undefined };
	}
	//smack down
	if (
		move.name === 'smack-down' &&
		getTypeNames(updatedTarget).includes('flying')
	) {
		updatedTarget = {
			...updatedTarget,
			secondaryAilments: [
				...updatedAttacker.secondaryAilments,
				{ type: 'landed', duration: 1 },
			],
		};
	}

	// apply damage
	const { consumedHeldItem, damage, criticalHit, wasSuperEffective } =
		calculateDamage(
			updatedAttacker,
			target,
			move,
			battleWeather,
			battleFieldEffects,
			terrain,
			true,
			isFlying,
			isUnderground,
			isDiving,
			targetsFactor,
			addMessage
		);

	if (damage > 0 && updatedAttacker.ownerId === getPlayerId()) {
		logDamage(damage);
		addMessage({ message: `${damage} Damage` });
	}

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
	//shell bell
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
	//anger shell
	if (
		updatedTarget.damage / updatedTarget.stats.hp > 0.5 &&
		(updatedTarget.damage + actualDamage) / updatedTarget.stats.hp <= 0.5 &&
		updatedTarget.ability === 'anger-shell'
	) {
		addMessage({ message: `${updatedTarget.name} activates anger shell ` });
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			1,
			true,
			battleFieldEffects,
			addMessage
		);
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'special-attack',
			1,
			true,
			battleFieldEffects,
			addMessage
		);
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'speed',
			1,
			true,
			battleFieldEffects,
			addMessage
		);
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'defense',
			-1,
			true,
			battleFieldEffects,
			addMessage
		);
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'special-defense',
			-1,
			true,
			battleFieldEffects,
			addMessage
		);
	}
	//well baked body
	if (
		move.data.type.name == 'fire' &&
		updatedTarget.ability === 'well-baked-body'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'defense',
			2,
			true,
			battleFieldEffects,
			addMessage,
			'well baked body'
		);
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
	updatedAttacker = applyDrainOrRecoil(
		updatedAttacker,
		updatedTarget,
		move,
		actualDamage,
		addMessage
	);

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
		updatedAttacker = {
			...updatedAttacker,
			damage:
				updatedAttacker.damage + Math.floor(updatedAttacker.stats.hp * 0.125),
		};
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
		updatedAttacker = {
			...updatedAttacker,
			damage:
				updatedAttacker.damage + Math.floor(updatedAttacker.stats.hp * 0.125),
		};
	}

	if (getHeldItem(updatedAttacker) === 'life-orb' && actualDamage > 0) {
		addMessage({ message: `${updatedAttacker.name} is hurt by life-orb` });
		updatedAttacker = {
			...updatedAttacker,
			damage:
				updatedAttacker.damage + Math.floor(updatedAttacker.stats.hp / 10),
		};
	}
	if (getHeldItem(updatedTarget) === 'air-balloon' && actualDamage > 0) {
		addMessage({ message: `${updatedTarget}´s air balloon popped` });
		updatedTarget = {
			...updatedTarget,
			heldItemName: undefined,
		};
	}
	if (
		!isKO(updatedTarget) &&
		getHeldItem(updatedTarget) === 'weakness-policy' &&
		wasSuperEffective
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			2,
			true,
			battleFieldEffects,
			addMessage,
			'weakness policy'
		);
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'special-attack',
			2,
			true,
			battleFieldEffects,
			addMessage,
			'weakness policy'
		);
	}
	if (
		getHeldItem(updatedTarget) === 'absorb-bulb' &&
		actualDamage > 0 &&
		move.data.type.name === 'water'
	) {
		addMessage({ message: `${updatedTarget.name} consumed its absorb-bulb` });
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'special-attack',
			1,
			true,
			battleFieldEffects,
			addMessage
		);
		updatedTarget = {
			...updatedTarget,
			heldItemName: undefined,
		};
	}
	if (
		getHeldItem(updatedTarget) === 'snowball' &&
		actualDamage > 0 &&
		move.data.type.name === 'ice'
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'snowball'
		);
	}
	if (
		updatedTarget.ability === 'berserk' &&
		updatedTarget.stats.hp / target.damage < 0.5 &&
		updatedTarget.stats.hp / updatedTarget.damage > 0.5
	) {
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'special-attack',
			1,
			true,
			battleFieldEffects,
			addMessage,
			'berserk'
		);
	}
	if (
		updatedTarget.primaryAilment?.type === 'sleep' &&
		move.name === 'wake-up-slap'
	) {
		updatedTarget = { ...updatedTarget, primaryAilment: undefined };
	}
	if (
		getHeldItem(updatedTarget) === 'luminous-moss' &&
		actualDamage > 0 &&
		move.data.type.name === 'water'
	) {
		addMessage({ message: `${updatedTarget.name} consumed its luminous-moss` });
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'special-defense',
			1,
			true,
			battleFieldEffects,
			addMessage
		);
		updatedTarget = {
			...updatedTarget,
			heldItemName: undefined,
		};
	}
	if (
		getHeldItem(updatedTarget) === 'cell-battery' &&
		actualDamage > 0 &&
		move.data.type.name === 'electric'
	) {
		addMessage({ message: `${updatedTarget.name} consumed its cell-battery` });
		updatedTarget = applyStatChangeToPokemon(
			updatedTarget,
			'attack',
			1,
			true,
			battleFieldEffects,
			addMessage
		);
		updatedTarget = {
			...updatedTarget,
			heldItemName: undefined,
		};
	}

	const attackerItem = getHeldItem(updatedAttacker);
	if (
		attackerItem &&
		gemTable[attackerItem] === move.data.type.name &&
		actualDamage > 0
	) {
		addMessage({
			message: `${updatedTarget.name} consumed its ${attackerItem} to increase the damage`,
		});
		updatedAttacker = { ...updatedAttacker, heldItemName: undefined };
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
	if (updatedAttacker.ability === 'parental-bond') {
		addMessage({
			message: `${updatedAttacker.name} uses parental bond to hit twice`,
		});
	}
	if (move.name === 'brick-break' || move.name === 'psychic-fangs') {
		addMessage({
			message: `${updatedAttacker.name} breaks through any protective screens`,
		});
		removeScreens(updatedTarget.ownerId);
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

	if (move.name === 'burn-up') {
		addMessage({ message: `${updatedAttacker.name} is no longer fire type` });
		updatedAttacker = applySecondaryAilmentToPokemon({
			pokemon: updatedAttacker,
			addMessage,
			applicator: updatedAttacker,
			ailment: 'color-changed',
			newType: 'normal',
		});
	}

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
		battleFieldEffects,
		target.stats.hp,
		terrain,
		setTerrain,
		setWeather
	);
	updatedAttacker = { ...a };
	updatedTarget = { ...t };

	const preventSideEffects =
		isContactMove(move.name, updatedAttacker) &&
		getHeldItem(updatedTarget) === 'protective-pads';

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
	if (category === 'damage+lower' && !preventSideEffects) {
		updatedTarget = applyAttackStatChanges(
			updatedTarget,
			updatedTarget.ability,
			move,
			addMessage,
			false,
			battleFieldEffects
		);
	}

	if (
		(category === 'damage+ailment' || attacker.ability === 'poison-touch') &&
		!preventSideEffects
	) {
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
				battleFieldEffects,
				targetIsSafeguarded,
				terrain
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
