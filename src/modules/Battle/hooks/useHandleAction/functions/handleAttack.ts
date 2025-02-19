import { SELF_DESTRUCTING_MOVES } from '../../../../../constants/selfDestructingMoves';
import { applyAttackAilmentsToPokemon } from '../../../../../functions/applyAttackAilmentsToPokemon';
import { calculateDamage } from '../../../../../functions/calculateDamage';
import { handleFlinching } from '../../../../../functions/handleFlinching';
import { isKO } from '../../../../../functions/isKo';
import { reduceMovePP } from '../../../../../functions/reduceMovePP';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../interfaces/Weather';
import { handleDampy } from '../../../functions/handleDampy';
import { handleFainting } from '../../../functions/handleFainting';
import { handleNoTarget } from '../../../functions/handleNoTarget';

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
	if (!target) {
		handleNoTarget(attacker, move, setPokemon, addMessage);
		return;
	}
	if (dampy && SELF_DESTRUCTING_MOVES.includes(move.name)) {
		handleDampy(attacker, move, setPokemon, addMessage, dampy);
		return;
	}
	//TODO: handle self targeting
	if (target.id === attacker.id) {
		console.warn('attacking yourself much?', attacker.data.name);
	}

	//MESSAGES
	addMessage(
		`${attacker.data.name} used ${move.name} against ${target.data.name}`
	);

	if (move.name === 'pay-day') {
		addMessage(`Coins scattered everywhere`);
		scatterCoins();
	}

	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
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
		updatedAttacker = reduceMovePP(updatedAttacker, move.name);
	}

	//updated Target
	let updatedTarget = { ...target };
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

	setPokemon((pokemon) =>
		pokemon.map((p) => {
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
