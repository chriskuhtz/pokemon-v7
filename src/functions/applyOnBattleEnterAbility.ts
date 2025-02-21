import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { BattleMessage } from '../modules/Battle/BattleField';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';

export const applyOnBattleEnterAbility = ({
	user,
	setWeather,
	currentWeather,
	setPokemon,
	addMessage,
}: {
	user: BattlePokemon;
	setWeather: (x: WeatherType) => void;
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>;
	currentWeather: WeatherType | undefined;
	addMessage: (x: BattleMessage) => void;
}) => {
	if (user.ability === 'drizzle' && currentWeather !== 'rain') {
		setWeather('rain');
		addMessage({ message: `${user.data.name} made it rain with drizzle` });
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
			message: `${user.data.name} prevents escape with shadow tag ${user.ability}`,
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
					(x) => addMessage({ message: x }),
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
			return p;
		})
	);
};
