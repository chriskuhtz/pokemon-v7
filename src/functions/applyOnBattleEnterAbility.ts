import { Message } from '../hooks/useMessageQueue';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';

export const applyOnBattleEnterAbility = ({
	user,
	setWeather,
	currentWeather,
	setPokemon,
	addMessage,
	battleFieldEffects,
}: {
	user: BattlePokemon;
	setWeather: (x: WeatherType) => void;
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>;
	currentWeather: WeatherType | undefined;
	addMessage: (x: Message) => void;
	battleFieldEffects: BattleFieldEffect[];
}) => {
	if (user.ability === 'drizzle' && currentWeather !== 'rain') {
		setWeather('rain');
		addMessage({ message: `${user.data.name} made it rain with drizzle` });
	}
	if (user.ability === 'sand-stream' && currentWeather !== 'sandstorm') {
		setWeather('sandstorm');
		addMessage({ message: `${user.data.name} summoned a sand storm` });
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
	if (user.ability === 'magnet-pull') {
		addMessage({
			message: `${user.data.name} pulls in steel pokemon with magnet pull`,
		});
	}
	if (user.ability === 'intimidate') {
		setPokemon((pokemon) =>
			pokemon.map((p) => {
				if (p.status !== 'ONFIELD') {
					return p;
				}
				if (p.id === user.id) {
					return { ...user, roundsInBattle: p.roundsInBattle + 1 };
				}
				if (p.ownerId === user.ownerId) {
					return p;
				}
				return applyStatChangeToPokemon(
					p,
					'attack',
					-1,
					false,
					battleFieldEffects,
					addMessage,
					`${user.data.name}'s intimidate`
				);
			})
		);
		return;
	}

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (p.status !== 'ONFIELD') {
				return p;
			}
			if (p.id === user.id) {
				return { ...user, roundsInBattle: p.roundsInBattle + 1 };
			}
			if (
				p.initAbility === 'trace' &&
				p.ability === 'trace' &&
				p.ownerId !== user.ownerId
			) {
				addMessage({
					message: `${p.data.name} traced ${user.ability}`,
				});
				return { ...p, ability: user.ability };
			}
			return p;
		})
	);
};
