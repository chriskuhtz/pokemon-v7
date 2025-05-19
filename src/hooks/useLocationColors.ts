import { useContext, useMemo } from 'react';
import { MapId } from '../constants/maps/mapsRecord';
import { typeColors } from '../constants/typeColors';
import { hexToRgb } from '../functions/hexToRGB';
import { PokemonType } from '../interfaces/PokemonType';
import { LocationContext } from './LocationProvider';

export const mapBattleColors: Record<
	MapId,
	{ oppColor: PokemonType; playerColor: PokemonType }
> = {
	routeN1: { oppColor: 'grass', playerColor: 'normal' },
	routeN1E1: { oppColor: 'bug', playerColor: 'grass' },
	routeE1: { oppColor: 'rock', playerColor: 'fire' },
	routeS1E1: { oppColor: 'grass', playerColor: 'water' },
	routeS1: { oppColor: 'water', playerColor: 'ice' },
	routeS1W1: { oppColor: 'rock', playerColor: 'water' },
	routeW1: { oppColor: 'rock', playerColor: 'ground' },
	caveW1: { oppColor: 'ghost', playerColor: 'fire' },
	onixCave: { oppColor: 'ghost', playerColor: 'steel' },
	routeN1W1: { oppColor: 'ice', playerColor: 'dragon' },
	camp: { oppColor: 'fighting', playerColor: 'normal' },
	challengeField: { oppColor: 'fighting', playerColor: 'normal' },
	rocketCamp: { oppColor: 'fighting', playerColor: 'dark' },
};

export const useLocationColors = (): {
	playerColor: string;
	oppColor: string;
} => {
	const { location } = useContext(LocationContext);

	const oppColor = useMemo(() => {
		return hexToRgb(typeColors[mapBattleColors[location.mapId].oppColor], 0.5);
	}, [location.mapId]);
	const playerColor = useMemo(() => {
		return hexToRgb(
			typeColors[mapBattleColors[location.mapId].playerColor],
			0.5
		);
	}, [location.mapId]);

	return { oppColor, playerColor };
};
