import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const getActualTarget = ({
	pokemon,
	attacker,
	move,
	addMessage,
}: {
	pokemon: BattlePokemon[];
	attacker: BattlePokemon;
	move: BattleAttack;
	addMessage: (x: Message) => void;
}): BattlePokemon | undefined => {
	if (move.name === 'counter' && attacker.lastReceivedDamage) {
		return pokemon.find(
			(p) =>
				p.id === attacker.lastReceivedDamage?.applicatorId &&
				p.status === 'ONFIELD'
		);
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
		return lightningRod;
	}
	if (stormDrain && move.data.type.name === 'water') {
		addMessage({
			message: `${stormDrain.data.name} redirected the water type attack with storm drain`,
		});
		return stormDrain;
	}
	return pokemon.find((p) => p.id === move.targetId && p.status === 'ONFIELD');
};
