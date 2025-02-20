import { contactMoves } from '../../../../../constants/contactMoves';
import { SELF_DESTRUCTING_MOVES } from '../../../../../constants/selfDestructingMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../functions/applyAttackAilmentsToPokemon';
import { applyPrimaryAilmentToPokemon } from '../../../../../functions/applyPrimaryAilmentToPokemon';
import { applyStatusMove } from '../../../../../functions/applyStatusMove';
import { calculateDamage } from '../../../../../functions/calculateDamage';
import { changeBattlePokemonType } from '../../../../../functions/changeBattlePokemonType';
import { changeMovePP } from '../../../../../functions/changeMovePP';
import { determineMiss } from '../../../../../functions/determineMiss';
import { handleFlinching } from '../../../../../functions/handleFlinching';
import { isKO } from '../../../../../functions/isKo';
import {
	PARA_CHANCE,
	STATIC_CHANCE,
	UNFREEZE_CHANCE,
} from '../../../../../interfaces/Ailment';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../interfaces/Weather';
import { handleDampy } from '../../../functions/handleDampy';
import { handleFainting } from '../../../functions/handleFainting';
import { handleFrozen } from '../../../functions/handleFrozen';
import { handleMiss } from '../../../functions/handleMiss';
import { handleNoTarget } from '../../../functions/handleNoTarget';
import { handleParalyzed } from '../../../functions/handleParalyzed';

export const handleAttack = ({
	attacker,
	pokemon,
	setPokemon,
	addMessage,
	move,
	battleWeather,
	scatterCoins,
	dampy,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>;
	addMessage: (x: string) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	scatterCoins: () => void;
	dampy?: { name: string };
}): void => {
	const target = pokemon.find(
		(p) => p.id === move.targetId && p.status === 'ONFIELD'
	);

	let updatedAttacker = { ...attacker };
	if (updatedAttacker.primaryAilment?.type === 'freeze') {
		const defrosted = Math.random() <= UNFREEZE_CHANCE;
		if (defrosted) {
			addMessage(`${attacker.data.name} was thawed out`);
			updatedAttacker.primaryAilment = undefined;
		} else {
			handleFrozen(attacker, setPokemon, addMessage);
			return;
		}
	}
	if (
		updatedAttacker.primaryAilment?.type === 'paralysis' &&
		Math.random() <= PARA_CHANCE
	) {
		handleParalyzed(attacker, setPokemon, addMessage);
		return;
	}

	if (!target) {
		handleNoTarget(attacker, move, setPokemon, addMessage);
		return;
	}
	if (dampy && SELF_DESTRUCTING_MOVES.includes(move.name)) {
		handleDampy(attacker, move, setPokemon, addMessage, dampy);
		return;
	}

	const selfTargeting = move.data.target.name === 'user';

	//TODO: handle self targeting, this currently leads to bugs bc. of mapping over pokemon and not applying target updates
	if (target.id === attacker.id && !selfTargeting) {
		console.warn('attacking yourself much?', attacker.data.name);
	}

	//MESSAGES
	addMessage(
		`${attacker.data.name} used ${move.name} against ${target.data.name}`
	);
	//updated Target
	let updatedTarget = { ...target };
	const isFlying =
		updatedTarget.moveQueue.length > 0 &&
		updatedTarget.moveQueue[0].type === 'BattleAttack' &&
		updatedTarget.moveQueue[0].name === 'fly';
	const miss = determineMiss(move, attacker, target, battleWeather, isFlying);

	if (miss) {
		handleMiss(attacker, move, setPokemon, addMessage);
		return;
	}

	if (move.name === 'pay-day') {
		addMessage(`Coins scattered everywhere`);
		scatterCoins();
	}

	//UPDATES

	//updated Attacker

	//1. update moveQueue
	if (move.multiHits > 0) {
		addMessage('Multi hit!');
		updatedAttacker = {
			...updatedAttacker,
			moveQueue: [{ ...move, multiHits: move.multiHits - 1 }],
		};
	} else updatedAttacker = { ...updatedAttacker, moveQueue: [] };

	//2. reduce pp after all multihits are done
	if (move.multiHits === 0) {
		updatedAttacker = changeMovePP(updatedAttacker, move.name, -1);
	}
	//3. apply stat changes
	if (selfTargeting) {
		updatedAttacker = applyStatusMove(updatedAttacker, move, addMessage);
	}
	//4. check for static
	if (
		target.ability === 'static' &&
		contactMoves.includes(move.name) &&
		Math.random() < STATIC_CHANCE
	) {
		updatedAttacker = applyPrimaryAilmentToPokemon(
			updatedAttacker,
			'paralysis',
			addMessage,
			`by ${target.data.name}'s static`
		);
	}

	//1. apply damage

	updatedTarget = {
		...updatedTarget,
		damage:
			updatedTarget.damage +
			calculateDamage(
				updatedAttacker,
				target,
				move,
				battleWeather,
				true,
				isFlying,
				addMessage
			),
	};
	//2. apply ailments
	updatedTarget = applyAttackAilmentsToPokemon(updatedTarget, move, addMessage);
	//3. check for fainting
	if (isKO(updatedTarget)) {
		updatedTarget = handleFainting(updatedTarget, addMessage);
	}
	//4. check for flinch
	if (!isKO(updatedTarget)) {
		updatedTarget = handleFlinching(
			updatedAttacker,
			updatedTarget,
			move,
			addMessage
		);
	}
	//5. check flash fire
	if (
		!isKO(updatedTarget) &&
		target.ability === 'flash-fire' &&
		move.data.type.name === 'fire'
	) {
		addMessage(`${target.data.name} raised its power with ${target.ability}`);
		updatedTarget.flashFired = true;
	}
	//6. check color change
	if (
		!isKO(updatedTarget) &&
		updatedTarget.damage > target.damage &&
		updatedTarget.ability === 'color-change'
	) {
		updatedTarget = changeBattlePokemonType(
			updatedTarget,
			move.data.type.name,
			addMessage
		);
	}

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (
				updatedAttacker.id === updatedTarget.id &&
				p.id === updatedAttacker.id
			) {
				return updatedAttacker;
			}
			if (p.id === updatedAttacker.id) {
				return updatedAttacker;
			}
			if (p.id === updatedTarget.id) {
				return updatedTarget;
			}
			return p;
		})
	);
};
