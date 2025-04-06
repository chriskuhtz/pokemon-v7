import { lockInMoves } from '../constants/forceSwitchMoves';
import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getRandomTargetId } from './filterTargets';

export const getActualTargetId = ({
	pokemon,
	attacker,
	move,
	addMessage,
}: {
	pokemon: BattlePokemon[];
	attacker: BattlePokemon;
	move: BattleAttack;
	addMessage: (x: Message) => void;
}): string => {
	if (move.name === 'counter' && attacker.lastReceivedDamage) {
		return attacker.lastReceivedDamage.applicatorId;
	}
	if (lockInMoves.includes(move.name)) {
		return getRandomTargetId({
			targets: pokemon,
			user: attacker,
			chosenAction: move.name,
			onlyOpponents: false,
		});
	}
	const lightningRod = pokemon.find(
		(p) =>
			p.status === 'ONFIELD' &&
			p.ability === 'lightning-rod' &&
			p.ownerId !== attacker.ownerId
	);
	const stormDrain = pokemon.find(
		(p) =>
			p.status === 'ONFIELD' &&
			p.ability === 'storm-drain' &&
			p.ownerId !== attacker.ownerId
	);

	if (lightningRod && move.data.type.name === 'electric') {
		addMessage({
			message: `${lightningRod.data.name} redirected the electric attack with lightning rod`,
		});
		return lightningRod.id;
	}
	if (stormDrain && move.data.type.name === 'water') {
		addMessage({
			message: `${stormDrain.data.name} redirected the water type attack with storm drain`,
		});
		return stormDrain.id;
	}
	return move.targetId;
};
