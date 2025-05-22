import { Message } from '../hooks/useMessageQueue';
import { SPIKES_FACTOR } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { EmptyStatObject, Stat } from '../interfaces/StatObject';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import {
	BattleTerrain,
	TerrainObject,
} from '../modules/Battle/hooks/useBattleTerrain';
import { WeatherObject } from '../modules/Battle/hooks/useBattleWeather';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { getHeldItem } from './getHeldItem';
import { getHighestStat } from './getHighestStat';
import { getTypeNames } from './getTypeNames';
import { isKO } from './isKo';

export const applyOnBattleEnterAbilityAndEffects = ({
	user,
	setWeather,
	setBattleTerrain,
	currentWeather,
	pokemon,
	addMessage,
	battleFieldEffects,
	removeScreens,
	terrain,
}: {
	user: BattlePokemon;
	setWeather: (x: WeatherObject) => void;
	setBattleTerrain: (x: TerrainObject) => void;
	pokemon: BattlePokemon[];
	currentWeather: WeatherType | undefined;
	addMessage: (x: Message) => void;
	battleFieldEffects: BattleFieldEffect[];
	removeScreens: (ownerId: string) => void;
	terrain: BattleTerrain | undefined;
}): BattlePokemon[] => {
	let updatedPokemon = [...pokemon];
	if (user.ability == 'curious-medicine') {
		addMessage({
			message: `${user.name} deploys curious medicine and resets its teams stat changes`,
		});
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.ownerId === user.ownerId) {
				return { ...p, statBoosts: EmptyStatObject };
			}

			return p;
		});
	}
	if (user.ability == 'pastel-veil') {
		addMessage({
			message: `${user.name} deploys pastel veil and cures its team of poison`,
		});
		updatedPokemon = updatedPokemon.map((p) => {
			if (
				p.ownerId === user.ownerId &&
				p.primaryAilment &&
				['poison', 'toxic'].includes(p.primaryAilment?.type)
			) {
				return { ...p, primaryAilment: undefined };
			}

			return p;
		});
	}
	if (user.ability == 'screen-cleaner') {
		const firstOppo = pokemon.find(
			(p) => p.ownerId !== user.ownerId && p.status === 'ONFIELD'
		);
		addMessage({
			message: `${user.name} removes protective screen effects with screen cleaner`,
		});
		removeScreens(user.ownerId);
		if (firstOppo) {
			removeScreens(firstOppo.ownerId);
		}
	}
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

	if (user.ability === 'orichalcum-pulse' && currentWeather !== 'sun') {
		setWeather({ duration: 9000, type: 'sun' });
		addMessage({
			message: `${user.data.name} intensified the sun with orichalcum pulse`,
		});
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.id === user.id) {
				return applyStatChangeToPokemon(
					{
						...user,
						roundsInBattle: p.roundsInBattle + 1,
						participatedInBattle: true,
					},
					'attack',
					1,
					true,
					battleFieldEffects,
					addMessage,
					'orichalcum pulse'
				);
			}

			return p;
		});
	}

	const terrainDuration = getHeldItem(user) === 'terrain-extender' ? 8 : 5;
	if (user.ability === 'hadron-engine' && terrain !== 'electric') {
		setBattleTerrain({ type: 'electric', duration: terrainDuration });
		addMessage({
			message: `${user.data.name} spreads electric terrain with hadron engine`,
		});
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.id === user.id) {
				return applyStatChangeToPokemon(
					{
						...user,
						roundsInBattle: p.roundsInBattle + 1,
						participatedInBattle: true,
					},
					'special-attack',
					1,
					true,
					battleFieldEffects,
					addMessage,
					'hadron engine'
				);
			}

			return p;
		});
	}

	if (user.ability === 'electric-surge') {
		setBattleTerrain({ type: 'electric', duration: terrainDuration });
		addMessage({ message: `${user.data.name} spreads electric terrain` });
	}

	if (user.ability === 'psychic-surge') {
		setBattleTerrain({ type: 'psychic', duration: terrainDuration });
		addMessage({ message: `${user.data.name} spreads psychic terrain` });
	}
	if (user.ability === 'grassy-surge') {
		setBattleTerrain({ type: 'grassy', duration: terrainDuration });
		addMessage({ message: `${user.data.name} spreads grassy terrain` });
	}
	if (user.ability === 'misty-surge') {
		setBattleTerrain({ type: 'misty', duration: terrainDuration });
		addMessage({ message: `${user.data.name} spreads misty terrain` });
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

			let res = { ...p };
			if (p.ability === 'guard-dog') {
				res = applyStatChangeToPokemon(
					p,
					'attack',
					1,
					false,
					battleFieldEffects,
					addMessage,
					`guard dog`
				);
			} else {
				res = applyStatChangeToPokemon(
					p,
					'attack',
					-1,
					false,
					battleFieldEffects,
					addMessage,
					`${user.data.name}'s intimidate`
				);
			}

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
	if (user.ability === 'supersweet-syrup') {
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

			return applyStatChangeToPokemon(
				p,
				'evasion',
				-1,
				false,
				battleFieldEffects,
				addMessage,
				`${user.data.name}'s supersweet syrup`
			);
		});
	}
	if (user.ability === 'vessel-of-ruin') {
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

			let res = { ...p };

			res = applyStatChangeToPokemon(
				p,
				'special-attack',
				-1,
				false,
				battleFieldEffects,
				addMessage,
				`${user.data.name}'s vessel of ruin`
			);

			return res;
		});
	}
	if (user.ability === 'sword-of-ruin') {
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

			let res = { ...p };

			res = applyStatChangeToPokemon(
				p,
				'defense',
				-1,
				false,
				battleFieldEffects,
				addMessage,
				`${user.data.name}'s sword of ruin`
			);

			return res;
		});
	}
	if (user.ability === 'tablets-of-ruin') {
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

			let res = { ...p };

			res = applyStatChangeToPokemon(
				p,
				'attack',
				-1,
				false,
				battleFieldEffects,
				addMessage,
				`${user.data.name}'s tablets of ruin`
			);

			return res;
		});
	}
	if (user.ability === 'beads-of-ruin') {
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

			let res = { ...p };

			res = applyStatChangeToPokemon(
				p,
				'special-defense',
				-1,
				false,
				battleFieldEffects,
				addMessage,
				`${user.data.name}'s beads of ruin`
			);

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
					'download'
				);
			}

			return p;
		});
	}
	if (user.ability === 'intrepid-sword') {
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.status !== 'ONFIELD') {
				return p;
			}
			if (p.id === user.id) {
				const stat: Stat = 'attack';
				return applyStatChangeToPokemon(
					p,
					stat,
					1,
					true,
					[],
					addMessage,
					'intrepid sword'
				);
			}

			return p;
		});
	}
	if (user.ability === 'dauntless-shield') {
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.status !== 'ONFIELD') {
				return p;
			}
			if (p.id === user.id) {
				const stat: Stat = 'defense';
				return applyStatChangeToPokemon(
					p,
					stat,
					1,
					true,
					[],
					addMessage,
					'dauntless shield'
				);
			}

			return p;
		});
	}
	if (
		user.ability === 'protosynthesis' &&
		(currentWeather === 'sun' || getHeldItem(user) === 'booster-energy')
	) {
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.status !== 'ONFIELD') {
				return p;
			}
			if (p.id === user.id) {
				const stat: Stat = getHighestStat({
					ownedPokemon: user,
					data: user.data,
				})[0];
				return applyStatChangeToPokemon(
					p,
					stat,
					1,
					true,
					[],
					addMessage,
					'protosynthesis'
				);
			}

			return p;
		});
	}

	if (
		user.ability === 'quark-drive' &&
		(terrain === 'electric' || getHeldItem(user) === 'booster-energy')
	) {
		updatedPokemon = updatedPokemon.map((p) => {
			if (p.status !== 'ONFIELD') {
				return p;
			}
			if (p.id === user.id) {
				const stat: Stat = getHighestStat({
					ownedPokemon: user,
					data: user.data,
				})[0];
				return applyStatChangeToPokemon(
					p,
					stat,
					1,
					true,
					[],
					addMessage,
					'quark-drive'
				);
			}

			return p;
		});
	}
	if (user.ability === 'comatose') {
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

	if (user.ability === 'supreme-overlord') {
		const defeatedTeamMembers = updatedPokemon.filter(
			(p) => p.participatedInBattle && isKO(p) && p.ownerId === user.ownerId
		).length;

		if (defeatedTeamMembers > 0) {
			addMessage({
				message: `${user.data.name} is getting ready for vengeance`,
			});
			updatedPokemon = updatedPokemon.map((p) => {
				if (p.id === user.id) {
					const up = applyStatChangeToPokemon(
						{
							...user,
							roundsInBattle: p.roundsInBattle + 1,
							participatedInBattle: true,
						},
						'special-attack',
						1,
						true,
						battleFieldEffects,
						addMessage,
						'supreme overlord'
					);
					return applyStatChangeToPokemon(
						up,
						'attack',
						1,
						true,
						battleFieldEffects,
						addMessage,
						'supreme overlord'
					);
				}

				return p;
			});
		}
		return updatedPokemon;
	}
	if (user.ability === 'costar') {
		const ally = updatedPokemon.find(
			(p) => p.status === 'ONFIELD' && p.ownerId === user.ownerId
		);

		if (ally) {
			addMessage({
				message: `${user.data.name} copies its ally with costar`,
			});
			updatedPokemon = updatedPokemon.map((p) => {
				if (p.id === user.id) {
					return {
						...user,
						roundsInBattle: p.roundsInBattle + 1,
						participatedInBattle: true,
						statBoosts: { ...ally.statBoosts },
					};
				}

				return p;
			});
		}
		return updatedPokemon;
	}
	if (user.ability === 'hospitality') {
		const ally = updatedPokemon.find(
			(p) => p.status === 'ONFIELD' && p.ownerId === user.ownerId
		);

		if (ally && ally.damage) {
			addMessage({
				message: `${user.data.name} heals its ally with hospitality`,
			});
			updatedPokemon = updatedPokemon.map((p) => {
				if (p.id === user.id) {
					return {
						...user,
						roundsInBattle: p.roundsInBattle + 1,
						participatedInBattle: true,
					};
				}
				if (p.id === ally.id) {
					return {
						...ally,
						damage: Math.max(0, ally.damage - ally.stats.hp / 16),
					};
				}

				return p;
			});
		}
		return updatedPokemon;
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
