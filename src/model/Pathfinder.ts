import { isPassable } from '../functions/isPassable';
import { outOfMapBounds } from '../functions/outOfMapBounds';
import { Occupant, OverworldMap } from '../interfaces/OverworldMap';
import { Vector2 } from './Vector2';

export enum PathfindingApproach {
	AVOID_ENCOUNTER,
	SEEK,
}

export class Pathfinder {
	private map: OverworldMap;
	private avoidWeightMap: number[][];
	private seekWeightMap: number[][];
	private hasDirectionalObstaclesMap: Map<Vector2, boolean[][]>;
	private canSwim: boolean;
	private flying: boolean;
	private canClimb: boolean;
	private currentOccupants: Occupant[];

	private path?: Vector2[];

	constructor(
		map: OverworldMap,
		currentOccupants: Occupant[],
		canSwim: boolean,
		flying: boolean,
		canClimb: boolean
	) {
		this.map = map;
		this.currentOccupants = currentOccupants;
		this.canSwim = canSwim;
		this.flying = flying;
		this.canClimb = canClimb;
		this.avoidWeightMap = this.generateWeightMap(
			PathfindingApproach.AVOID_ENCOUNTER
		);
		this.seekWeightMap = this.generateWeightMap(PathfindingApproach.SEEK);
		this.hasDirectionalObstaclesMap = this.generateHasDirectionalObstaclesMap();
	}

	private generateWeightMap(type: PathfindingApproach): number[][] {
		const baseLayer = this.map.tileMap.baseLayer;
		const width = baseLayer.length;
		const height = baseLayer[0].length;
		const weightMap: number[][] = [];

		for (let x = 0; x < height; x++) {
			weightMap[x] = [];
			for (let y = 0; y < width; y++) {
				const pos = new Vector2(x, y);
				weightMap[x][y] = this.getWeightForPosition(pos, type);
			}
		}

		return weightMap;
	}

	generateHasDirectionalObstaclesMap(): Map<Vector2, boolean[][]> {
		const directions = [Vector2.UP, Vector2.DOWN, Vector2.LEFT, Vector2.RIGHT];
		const result = new Map<Vector2, boolean[][]>();
		for (const dir of directions) {
			result.set(dir, this.generateHasDirectionalObstaclesMapForDirection(dir));
		}
		return result;
	}

	generateHasDirectionalObstaclesMapForDirection(
		direction: Vector2
	): boolean[][] {
		const baseLayer = this.map.tileMap.baseLayer;
		const width = baseLayer.length;
		const height = baseLayer[0].length;
		const hasDirectionalObstaclesMap: boolean[][] = [];
		for (let x = 0; x < height; x++) {
			hasDirectionalObstaclesMap[x] = [];
			for (let y = 0; y < width; y++) {
				const pos = new Vector2(x, y);
				const neighbor = pos.add(direction);
				if (outOfMapBounds(neighbor, this.map)) {
					hasDirectionalObstaclesMap[x][y] = true;
				} else {
					hasDirectionalObstaclesMap[x][y] = !isPassable({
						nextLocation: neighbor,
						playerLocation: {
							...pos,
							orientation: direction.getInputForDirection() ?? 'DOWN',
							mapId: this.map.id,
							forwardFoot: 'CENTER1',
						},
						map: this.map,
						currentOccupants: this.currentOccupants,
						canSwim: this.canSwim,
						flying: this.flying,
						canClimb: this.canClimb,
					});
				}
			}
		}
		return hasDirectionalObstaclesMap;
	}

	private getWeightForPosition(
		position: Vector2,
		type: PathfindingApproach
	): number {
		const tilemap = this.map.tileMap;
		const isWater =
			tilemap.waterLayer[position.y] != undefined &&
			tilemap.waterLayer[position.y][position.x] !== null;
		const hasEncounters =
			tilemap.encounterLayer[position.y][position.x] !== null;
		const avoidEncounters = PathfindingApproach.AVOID_ENCOUNTER === type;

		//check if field is generally passable (not considering direction dependent fields like waterfalls and cliffs)
		if (
			!isPassable({
				nextLocation: position,
				playerLocation: {
					...position,
					mapId: this.map.id,
					orientation: 'DOWN',
					forwardFoot: 'CENTER1',
				},
				map: this.map,
				currentOccupants: this.currentOccupants,
				canSwim: this.canSwim,
				flying: this.flying,
				canClimb: this.canClimb,
			})
		) {
			return -1;
		}

		let result = 1;

		if ((avoidEncounters && hasEncounters) || isWater) {
			result = 5;
		}
		return result;
	}

	private getPositionIsUnpassableOccupant(vector: Vector2): boolean {
		return this.currentOccupants.some(
			(occupant) =>
				occupant.x === vector.x &&
				occupant.y === vector.y &&
				occupant.type !== 'ON_STEP_PORTAL'
		);
	}

	public clearPath() {
		this.path = undefined;
	}

	public computePath(
		position: Vector2,
		target: Vector2,
		approach: PathfindingApproach,
		unlimitedRange: boolean
	) {
		const range = unlimitedRange ? null : 25;

		const weightMap =
			PathfindingApproach.SEEK === approach
				? this.seekWeightMap
				: this.avoidWeightMap;

		const openSet: Vector2[] = [position];
		const cameFrom: Map<string, Vector2> = new Map();
		const gScore: Map<string, number> = new Map();
		const fScore: Map<string, number> = new Map();

		gScore.set(position.toString(), 0);
		fScore.set(position.toString(), target.manhattanDistance(position));

		while (openSet.length > 0) {
			openSet.sort(
				(a, b) =>
					(fScore.get(a.toString()) ?? Infinity) -
					(fScore.get(b.toString()) ?? Infinity)
			);
			const current = openSet.shift()!;
			const currentKey = current;

			// closing condition
			if (current.x === target.x && current.y === target.y) {
				// collect from start
				const totalPath: Vector2[] = [current];

				while (cameFrom.has(totalPath[0].toString())) {
					totalPath.unshift(cameFrom.get(totalPath[0].toString())!);
				}
				const limitIsReached = range && totalPath.length > range;
				if (limitIsReached) {
					this.path = [];
				} else {
					this.path = totalPath;
				}

				return;
			}

			const directions = [
				Vector2.UP,
				Vector2.DOWN,
				Vector2.LEFT,
				Vector2.RIGHT,
			];
			for (const dir of directions) {
				const neighbor = current.add(dir);

				const neighborOutOfBounds = outOfMapBounds(neighbor, this.map);

				const neighborIsTargetAndOccupant =
					this.getPositionIsUnpassableOccupant(neighbor) &&
					neighbor.toString() === target.toString();

				const weight = neighborOutOfBounds
					? -1
					: weightMap[neighbor.x][neighbor.y];

				//check if field is passable from current direction (waterfalls, cliffs)
				const unpassableDirection: boolean =
					this.hasDirectionalObstaclesMap.get(dir)?.[current.x][current.y] ??
					false;

				// check for unpassable obstacles
				if (
					!neighborIsTargetAndOccupant &&
					(weight === -1 || unpassableDirection)
				) {
					continue;
				}

				// accumulate more weight as the path grows
				const tentativeG =
					(gScore.get(currentKey.toString()) ?? Infinity) + weight;
				const neighborKey = neighbor;

				if (tentativeG < (gScore.get(neighborKey.toString()) ?? Infinity)) {
					cameFrom.set(neighborKey.toString(), current);
					gScore.set(neighborKey.toString(), tentativeG);
					// final score for new position
					fScore.set(
						neighborKey.toString(),
						tentativeG + neighbor.manhattanDistance(target)
					);
					if (!openSet.find((v) => v.x === neighbor.x && v.y === neighbor.y)) {
						openSet.push(neighbor);
					}
				}
			}
		}
	}

	public getPath(): Vector2[] | undefined {
		return this.path;
	}

	public getNextDirection(position: Vector2): Vector2 {
		if (!this.path || this.path?.length === 0) {
			return Vector2.ZERO;
		}

		const nextIndex =
			this.path.findIndex(
				(pos) => pos.x === position.x && pos.y === position.y
			) + 1;

		if (nextIndex <= 0) {
			console.error('Unknown position, abort!');
		}

		if (nextIndex <= 0 || nextIndex >= this.path.length) {
			return Vector2.ZERO;
		}
		const nextPos = this.path[nextIndex];

		return nextPos.subtract(position);
	}
}
