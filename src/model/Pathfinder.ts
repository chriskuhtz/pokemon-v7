import { PiCodepenLogo } from "react-icons/pi";
import { isPassable } from "../functions/isPassable";
import { Occupant, OverworldMap } from "../interfaces/OverworldMap";
import { Vector2 } from "./Vector2";

export enum PathfindingApproach {
    AVOID_ENCOUNTER,
    SEEK
}

export class Pathfinder {
    private map: OverworldMap;
    private avoidWeightMap: number[][];
    private seekWeightMap: number[][];
    private canSwim: boolean;
    private flying: boolean;
    private canClimb: boolean;
    private currentOccupants: Occupant[];

    private path?: Vector2[];

    constructor(map: OverworldMap,
        currentOccupants: Occupant[],
        canSwim: boolean,
        flying: boolean,
        canClimb: boolean
    ) {
        this.map = map;
        this.currentOccupants = currentOccupants;
        this.canSwim = canSwim;
        this.flying = flying;
        this.canClimb = canClimb
        this.avoidWeightMap = this.generateWeightMap(PathfindingApproach.AVOID_ENCOUNTER);
        this.seekWeightMap = this.generateWeightMap(PathfindingApproach.SEEK)

    }

    private generateWeightMap(type: PathfindingApproach): number[][] {
        const baseLayer = this.map.tileMap.baseLayer;
        const width = baseLayer.length;
        const height = baseLayer[0].length;
        const weightMap: number[][] = [];

        for (let x = 0; x < height; x++) {
            weightMap[x] = []; // Neue Spalte
            for (let y = 0; y < width; y++) {
                const pos = new Vector2(x, y);
                weightMap[x][y] = this.getWeightForPosition(pos, type);
            }
        }

        return weightMap;
    }

    private getWeightForPosition(position: Vector2, type: PathfindingApproach): number {
        const tilemap = this.map.tileMap
        const isWater = tilemap.waterLayer[position.y] != undefined && tilemap.waterLayer[position.y][position.x] !== null;
        const hasEncounters = tilemap.encounterLayer[position.y][position.x] !== null;
        const avoidEncounters = PathfindingApproach.AVOID_ENCOUNTER === type

        if (!isPassable(position, this.map, this.currentOccupants, this.canSwim, this.flying, this.canClimb)) {
            return -1;
        }

        let result = 1;

        if ((avoidEncounters && hasEncounters) || isWater) {
            result = 5;
        }
        return result;
    }

    private getPositionIsUnpassableOccupant(vector: Vector2): boolean {
        return this.currentOccupants.some(occupant => occupant.x === vector.x && occupant.y === vector.y && occupant.type !== 'ON_STEP_PORTAL')
    }

    public clearPath() {
        this.path = undefined;
    }

    public computePath(position: Vector2, target: Vector2, approach: PathfindingApproach) {
        if (!target) {
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
        fScore.set(position.toString(), target.manhattanDistance(position));

        while (openSet.length > 0) {
            openSet.sort((a, b) =>
                (fScore.get(a.toString()) ?? Infinity) - (fScore.get(b.toString()) ?? Infinity)
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
                const neighborIsTargetAndOccupant = this.getPositionIsUnpassableOccupant(neighbor) && neighbor.toString() === target.toString();

                if (!neighborIsTargetAndOccupant && weight === -1) {
                    continue;
                }

                // accumulate more weight as the path grows
                const tentativeG = (gScore.get(currentKey.toString()) ?? Infinity) + weight;
                const neighborKey = neighbor;

                if (tentativeG < (gScore.get(neighborKey.toString()) ?? Infinity)) {
                    cameFrom.set(neighborKey.toString(), current);
                    gScore.set(neighborKey.toString(), tentativeG);
                    // final score for new position
                    fScore.set(neighborKey.toString(), tentativeG + neighbor.manhattanDistance(target));
                    if (!openSet.find(v => v.x === neighbor.x && v.y === neighbor.y)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        return Vector2.ZERO
    }

    public getPath(): Vector2[] | undefined {
        return this.path
    }

    public getNextDirection(position: Vector2): Vector2 {
        if (!this.path || this.path?.length === 0) {
            return Vector2.ZERO;
        }

        const nextIndex = this.path.findIndex(pos => pos.x === position.x && pos.y === position.y) + 1;

        if (nextIndex <= 0) {
            console.error("Unknown position, abort!")
        }

        if (nextIndex <= 0 || nextIndex >= this.path.length) {
            return Vector2.ZERO;
        }
        const nextPos = this.path[nextIndex];

        const neighborIsTargetAndOccupant = this.getPositionIsUnpassableOccupant(nextPos) && nextIndex === this.path.length - 1
        if (neighborIsTargetAndOccupant) {
            return Vector2.ZERO;
        }

        return nextPos.subtract(position);
    }
}