import { Message } from '../hooks/useMessageQueue';
import { SPIKES_FACTOR } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { TerrainObject } from '../modules/Battle/hooks/useBattleTerrain';
import { WeatherObject } from '../modules/Battle/hooks/useBattleWeather';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { getHeldItem } from './getHeldItem';
import { getTypeNames } from './getTypeNames';

export const applyOnBattleEnterAbilityAndEffects = ({
	user,
	setWeather,
	setBattleTerrain,
	currentWeather,
	pokemon,
	addMessage,
	battleFieldEffects,
}: {
	user: BattlePokemon;
	setWeather: (x: WeatherObject) => void;
	setBattleTerrain: (x: TerrainObject) => void;
	pokemon: BattlePokemon[];
	currentWeather: WeatherType | undefined;
	addMessage: (x: Message) => void;
	battleFieldEffects: BattleFieldEffect[];
}): BattlePokemon[] => {
	let updatedPokemon = [...pokemon];

	if (user.ability == 'frisk') {
		const firstOppo = pokemon.find(
			(p) => p.ownerId !== user.ownerId && p.status === 'ONFIELD'
		);

		if (firstOppo && getHeldItem(firstOppo, false)) {
			addMessage({
				message: `${user.name} detects that ${
					firstOppo.name
				} is holding a ${getHeldItem(firstOppo, false)}`,
			});
		}
	}

	if (user.ability === 'drizzle' && currentWeather !== 'rain') {
		setWeather({ duration: 9000, type: 'rain' });
		addMessage({ message: `${user.data.name} made it rain with drizzle` });
	}
	if (user.ability === 'drought' && currentWeather !== 'sun') {
		setWeather({ duration: 9000, type: 'sun' });
		addMessage({
			message: `${user.data.name} intensified the sun with drought`,
		});
	}
	if (user.ability === 'sand-stream' && currentWeather !== 'sandstorm') {
		setWeather({ duration: 9000, type: 'sandstorm' });
		addMessage({ message: `${user.data.name} summoned a sand storm` });
	}
	if (user.ability === 'snow-warning' && currentWeather !== 'hail') {
		setWeather({ duration: 9000, type: 'hail' });
		addMessage({ message: `${user.data.name} summoned a hail storm` });
	}
	if (user.ability === 'electric-surge') {
		setBattleTerrain({ type: 'electric', duration: 5 });
		addMessage({ message: `${user.data.name} spreads electric terrain` });
	}
	if (user.ability === 'psychic-surge') {
		setBattleTerrain({ type: 'psychic', duration: 5 });
		addMessage({ message: `${user.data.name} spreads psychic terrain` });
	}
	if (
		currentWeather &&
		(user.ability === 'air-lock' || user.ability === 'cloud-nine')
	) {
		addMessage({
			message: `${user.data.name} negates all weather effects with ${user.ability}`,
		});
	}
	if (user.ability === 'shadow-tag') {
		addMessage({
			message: `${user.data.name} prevents escape with shadow tag`,
		});
	}
	if (user.ability === 'arena-trap') {
		addMessage({
			message: `${user.data.name} prevents escape with arena trap`,
		});
	}
	if (user.ability === 'magnet-pull') {
		addMessage({
			message: `${user.data.name} pulls in steel pokemon with magnet pull`,
		});
	}
	if (user.ability === 'dark-aura') {
		addMessage({
			message: `${user.data.name} spreads a dark aura around the field`,
		});
	}
	if (user.ability === 'fairy-aura') {
		addMessage({
			message: `${user.data.name} spreads a light aura around the field`,
		});
	}
	if (user.ability === 'aura-break') {
		addMessage({
			message: `${user.data.name} destroys aura effects with aura-breaks`,
		});
	}
	if (user.ability === 'intimidate') {
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.status !== 'ONFIELD') {
				return p;
			}
			if (p.id === user.id) {
				return {
					...user,
					roundsInBattle: p.roundsInBattle + 1,
					participatedInBattle: true,
				};
			}
			if (p.ownerId === user.ownerId) {
				return p;
			}
			const res = applyStatChangeToPokemon(
				p,
				'attack',
				-1,
				false,
				battleFieldEffects,
				addMessage,
				`${user.data.name}'s intimidate`
			);
			if (getHeldItem(p) === 'adrenaline-orb') {
				return applyStatChangeToPokemon(
					res,
					'speed',
					1,
					true,
					battleFieldEffects,
					addMessage,
					'adrenaline-orb'
				);
			}
			return res;
		});
	}
	if (user.ability === 'download') {
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.status !== 'ONFIELD') {
				return p;
			}
			if (p.id === user.id) {
				const target = pokemon.find((p) => p.ownerId !== user.ownerId);
				if (!target) {
					return { ...p, participatedInBattle: true };
				}
				const stat: Stat =
					target?.stats.defense > target?.stats['special-defense']
						? 'special-attack'
						: 'attack';
				return applyStatChangeToPokemon(
					p,
					stat,
					1,
					true,
					[],
					addMessage,
					'with download'
				);
			}

			return p;
		});
	}
	if (user.ability === 'download') {
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.status !== 'ONFIELD') {
				return p;
			}
			if (p.id === user.id) {
				addMessage({ message: `${p.name} is comatose and wont wake up` });
				return { ...p, primaryAilment: { type: 'sleep', duration: 9000 } };
			}

			return p;
		});
	}
	if (user.ability === 'flower-gift' && currentWeather === 'sun') {
		addMessage({
			message: `${user.name} boosts itself and its allies with flower-gift`,
		});
	}

	if (
		battleFieldEffects.some(
			(b) => b.type === 'spikes' && b.ownerId !== user.ownerId
		)
	) {
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.id === user.id) {
				if (
					(getTypeNames(p).includes('flying') ||
						p.ability === 'levitate' ||
						getHeldItem(p) === 'air-balloon' ||
						getHeldItem(p) === 'heavy-duty-boots') &&
					getHeldItem(p) !== 'iron-ball'
				) {
					return p;
				} else {
					addMessage({ message: `${user.name} is hurt by spikes` });
					return { ...p, damage: Math.floor(p.stats.hp * SPIKES_FACTOR) };
				}
			}
			return p;
		});
	}
	updatedPokemon = updatedPokemon.map((p) => {
		if (p.status !== 'ONFIELD') {
			return p;
		}
		if (p.id === user.id) {
			return {
				...user,
				roundsInBattle: p.roundsInBattle + 1,
				participatedInBattle: true,
			};
		}
		if (
			p.initAbility === 'trace' &&
			p.ability === 'trace' &&
			p.ownerId !== user.ownerId
		) {
			addMessage({
				message: `${p.data.name} traced ${user.ability}`,
			});
			return { ...p, ability: user.ability, participatedInBattle: true };
		}
		return p;
	});

	return updatedPokemon;
};
