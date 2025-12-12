import { Occupant } from '../interfaces/Occupant';
import { OverworldMap } from '../interfaces/OverworldMap';
import { CharacterLocationData } from '../interfaces/SaveFile';
import { isEdge } from './isEdge';
import { isWater } from './isWater';
import { isWaterFall } from './isWaterFall';
import { outOfMapBounds } from './outOfMapBounds';

const devmode = !!window.localStorage.getItem('devmode');

export const isPassable = ({
	nextLocation,
	playerLocation,
	map,
	currentOccupants,
	canSwim,
	flying,
	canClimb,
}: {
	nextLocation: { x: number; y: number };
	playerLocation: CharacterLocationData;
	map: OverworldMap;
	currentOccupants: Occupant[];
	canSwim: boolean;
	flying: boolean;
	canClimb: boolean;
}): boolean => {
	if (outOfMapBounds(nextLocation, map)) {
		return false;
	}

	if (devmode || flying) {
		return true;
	}

	const waterfall = isWaterFall(map, nextLocation);
	const southOfEdge = isEdge(map, playerLocation);
	const northOfEdge = isEdge(map, nextLocation);

	if (waterfall && !flying) {
		return playerLocation.orientation === 'DOWN';
	}
	if (southOfEdge && !flying) {
		return playerLocation.orientation !== 'UP';
	}
	if (northOfEdge && !flying) {
		return playerLocation.orientation !== 'DOWN';
	}

	const nextFieldOccupant = currentOccupants.find(
		(c) =>
			c.x === nextLocation.x &&
			c.y === nextLocation.y &&
			c.type !== 'HIDDEN_ITEM' &&
			c.type !== 'ON_STEP_PORTAL' &&
			c.type !== 'ON_STEP_DIALOGUE' &&
			c.type !== 'ON_STEP_ROUTER'
	);

	if (nextFieldOccupant?.type === 'CLIMBING_STEPS' && canClimb) {
		return true;
	}

	if (nextFieldOccupant) {
		return false;
	}

	const nextFieldObstacle =
		map.tileMap.obstacleLayer[nextLocation.y][nextLocation.x];

	if (nextFieldObstacle) {
		return false;
	}

	const nextFieldWater = isWater(nextLocation.x, nextLocation.y, map.id);
	if (nextFieldWater) {
		return canSwim;
	}

	return true;
};
