import { isContactMove } from '../../../constants/groupedMoves';
import { applyCrashDamage } from '../../../functions/applyCrashDamage';
import { applyPrimaryAilmentToPokemon } from '../../../functions/applyPrimaryAilmentToPokemon';
import { applyStatChangeToPokemon } from '../../../functions/applyStatChangeToPokemon';
import { MissReason } from '../../../functions/determineMiss';
import { getHeldItem } from '../../../functions/getHeldItem';
import { Message } from '../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const handleMiss = (
	attacker: BattlePokemon,
	attack: BattleAttack,
	pokemon: BattlePokemon[],
	setPokemon: (x: BattlePokemon[]) => void,
	addMessage: (x: Message) => void,
	reason?: MissReason
) => {
	if (reason === 'PSYCHIC_TERRAIN') {
		addMessage({
			message: 'Psychic Terrain prevents priority attacks',
		});
	}
	if (reason === 'QUEENLY_MAJESTY') {
		addMessage({
			message: 'The Target prevents priority attacks with queenly majesty',
		});
	}
	if (
		reason === 'PROTECTED' ||
		reason === 'SPIKY_SHIELDED' ||
		reason === 'BANEFUL_BUNKERED' ||
		reason === 'OBSTRUCTED'
	) {
		addMessage({ message: 'The Target protected itself' });
	}
	if (reason === 'SOUNDPROOF') {
		addMessage({ message: 'The Target has soundproof' });
	}
	if (reason === 'TARGET_NOT_ASLEEP') {
		addMessage({ message: 'But The Target is awake' });
	}
	if (reason === 'SOUNDPROOF') {
		addMessage({ message: `But ${attacker.name} is not asleep` });
	} else addMessage({ message: 'It Missed' });

	//UPDATES

	//updated Attacker
	let updatedAttacker = { ...attacker };
	//1. update moveQueue
	updatedAttacker = { ...updatedAttacker, moveQueue: [] };

	setPokemon(
		pokemon.map((p) => {
			if (p.id === updatedAttacker.id) {
				let u = { ...updatedAttacker };
				if (getHeldItem(u) === 'blunder-policy') {
					u = applyStatChangeToPokemon(
						u,
						'speed',
						2,
						true,
						[],
						addMessage,
						'blunder-policy'
					);

					u.heldItemName = undefined;
				}
				if (reason === 'SPIKY_SHIELDED') {
					addMessage({
						message: `${updatedAttacker.name} is hurt by spiky shield`,
					});

					u = { ...u, damage: u.damage + Math.floor(u.stats.hp * 8) };
				}
				if (reason === 'OBSTRUCTED' && isContactMove(attack.name, u)) {
					u = applyStatChangeToPokemon(
						u,
						'defense',
						-2,
						false,
						[],
						addMessage,
						'obstruct'
					);
				}
				if (reason === 'BANEFUL_BUNKERED' && !u.primaryAilment) {
					u = applyPrimaryAilmentToPokemon(
						u,
						u,
						'poison',
						addMessage,
						undefined,
						[],
						undefined,
						'baneful bunker'
					).updatedTarget;
				}

				return applyCrashDamage(u, attack.name, addMessage);
			}
			return p;
		})
	);
};
