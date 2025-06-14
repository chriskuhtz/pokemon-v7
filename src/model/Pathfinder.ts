import { OverworldMap } from "../interfaces/OverworldMap";
import { Vector2 } from "./Vector2";

export enum PathfindingApproach {
    AVOID_DANGER,
    SEEK
}

export class Pathfinder {
    private map: OverworldMap;
    private avoidWeightMap: number[][];
    private seekWeightMap: number[][];
    private devMode: boolean;
    private canSwim: boolean;

    private target?: Vector2;
    private path: Vector2[] = [];

    constructor(map: OverworldMap, canSwim: boolean, devMode: boolean) {
        this.map = map;
        this.canSwim = canSwim;
        this.devMode = devMode;
        this.avoidWeightMap = this.generateWeightMap(PathfindingApproach.AVOID_DANGER);
        this.seekWeightMap = this.generateWeightMap(PathfindingApproach.SEEK)

    }

    private generateWeightMap(type: PathfindingApproach): number[][] {
        const baseLayer = this.map.tileMap.baseLayer;
        const width = baseLayer.length;
        const height = baseLayer[0].length;
        const weightMap: number[][] = [];

        for (let x = 0; x < width; x++) {
            weightMap[x] = []; // Neue Spalte
            for (let y = 0; y < height; y++) {
                const pos = new Vector2(x, y);
                weightMap[x][y] = this.getWeightForPosition(pos, type);
            }
        }

        return weightMap;
    }

    private getWeightForPosition(position: Vector2, type: PathfindingApproach): number {
        const tilemap = this.map.tileMap
        const isObstacle = tilemap.obstacleLayer[position.y][position.x] !== null;
        const isWater = tilemap.waterLayer[position.y][position.x] !== null;
        const hasEncounters = tilemap.encounterLayer[position.y][position.x] !== null;
        const avoidEncounters = PathfindingApproach.AVOID_DANGER === type

        if (!this.devMode) {

            if (isObstacle || (!this.canSwim && isWater)) {
                return -1
            }
        }
        let result = 1;

        if ((avoidEncounters && hasEncounters) || isWater) {
            result = 5;
        }
        return result;
    }

    public setTarget(target?: Vector2) {
        this.target = target;
    }

    public computePath(position: Vector2, approach: PathfindingApproach) {
        if (!this.target) {
            console.log("No Target")
            return Vector2.ZERO;
        }

        const weightMap = PathfindingApproach.SEEK === approach ? this.seekWeightMap : this.avoidWeightMap;

        const width = this.map.tileMap.baseLayer.length;
        const height = this.map.tileMap.baseLayer[0].length;

        const openSet: Vector2[] = [position];
        const cameFrom: Map<string, Vector2> = new Map();
        const gScore: Map<string, number> = new Map();
        const fScore: Map<string, number> = new Map();

        gScore.set(position.toString(), 0);
        fScore.set(position.toString(), this.target.manhattanDistance(position));

        while (openSet.length > 0) {
            openSet.sort((a, b) =>
                (fScore.get(a.toString()) ?? Infinity) - (fScore.get(b.toString()) ?? Infinity)
            );
            const current = openSet.shift()!;
            const currentKey = current;

            // closing condition
            if (current.x === this.target.x && current.y === this.target.y) {
                // collect from start
                const totalPath: Vector2[] = [current];
                while (cameFrom.has(totalPath[0].toString())) {
                    totalPath.unshift(cameFrom.get(totalPath[0].toString())!);
                }
                this.path = totalPath;
                return;
            }

            const directions = [Vector2.UP, Vector2.DOWN, Vector2.LEFT, Vector2.RIGHT];
            for (const dir of directions) {
                const neighbor = current.add(dir);

                // check for out of bound moves
                if (
                    neighbor.x < 0 || neighbor.y < 0 ||
                    neighbor.x >= width || neighbor.y >= height
                ) {
                    continue;
                }

                // check for obstacles
                const weight = weightMap[neighbor.x][neighbor.y];
                if (weight === -1) {
                    continue;
                }

                // accumulate more weight as the path grows
                const tentativeG = (gScore.get(currentKey.toString()) ?? Infinity) + weight;
                const neighborKey = neighbor;

                if (tentativeG < (gScore.get(neighborKey.toString()) ?? Infinity)) {
                    cameFrom.set(neighborKey.toString(), current);
                    gScore.set(neighborKey.toString(), tentativeG);
                    // final score for new position
                    fScore.set(neighborKey.toString(), tentativeG + neighbor.manhattanDistance(this.target));
                    if (!openSet.find(v => v.x === neighbor.x && v.y === neighbor.y)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        return Vector2.ZERO
    }

    public getPath(): Vector2[] {
        return this.path
    }

    public getNextDirection(position: Vector2): Vector2 {
        if (this.path.length === 0) {
            return Vector2.ZERO;
        }

        const nextIndex = this.path.findIndex(pos => pos.x === position.x && pos.y === position.y) + 1;

        if (nextIndex <= 0) {
            console.error("This is scary, I have never seen this place, abort!")
        }

        if (nextIndex <= 0 || nextIndex >= this.path.length) {
            return Vector2.ZERO;
        }

        const nextPos = this.path[nextIndex];
        return nextPos.subtract(position);
    }
}