import { useDeferredValue, useMemo, useState } from 'react';
import { TimeOfDay } from '../../../functions/getTimeOfDay';
import {
	Occupant,
	OverworldMap,
	TileIdentifier,
} from '../../../interfaces/OverworldMap';
import { Tool } from '../MapMaker';

export type LayerName =
	| 'Base'
	| 'Obstacle'
	| 'Decoration'
	| 'Encounter'
	| 'Foreground';
export const useMapEditor = ({
	tool,
	initialMap,
}: {
	tool: Tool | undefined;
	initialMap: OverworldMap;
}) => {
	const [newMapState, setNewMap] = useState<OverworldMap>(initialMap);

	const newMap = useDeferredValue(newMapState);
	const usedTiles = useMemo(() => {
		const used: TileIdentifier[] = [];

		const all = [
			...newMapState.tileMap.baseLayer.flat(),
			...newMapState.tileMap.encounterLayer.flat(),
			...newMapState.tileMap.obstacleLayer.flat(),
			...newMapState.tileMap.decorationLayer.flat(),
			...newMapState.tileMap.foregroundLayer.flat(),
		];

		all.forEach((t) => {
			if (
				t &&
				!used.find(
					(entry) => entry.yOffset === t.yOffset && entry.xOffset === t.xOffset
				)
			) {
				used.push(t);
			}
		});

		return used;
	}, [newMapState]);

	const addColumn = () =>
		setNewMap((newMap) => ({
			...newMap,
			tileMap: {
				baseLayer: newMap.tileMap.baseLayer.map((row) => [
					...row,
					row[row.length - 1],
				]),
				encounterLayer: newMap.tileMap.encounterLayer.map((row) => [
					...row,
					null,
				]),
				obstacleLayer: newMap.tileMap.obstacleLayer.map((row) => [
					...row,
					null,
				]),
				decorationLayer: newMap.tileMap.decorationLayer.map((row) => [
					...row,
					null,
				]),
				foregroundLayer: newMap.tileMap.foregroundLayer.map((row) => [
					...row,
					null,
				]),
			},
		}));
	const addRow = () =>
		setNewMap((newMap) => ({
			...newMap,
			tileMap: {
				baseLayer: [
					...newMap.tileMap.baseLayer,
					newMap.tileMap.baseLayer[newMap.tileMap.baseLayer.length - 1],
				],
				encounterLayer: [
					...newMap.tileMap.encounterLayer,
					Array.from({ length: newMap.tileMap.encounterLayer[0].length }).map(
						() => null
					),
				],
				obstacleLayer: [
					...newMap.tileMap.obstacleLayer,
					Array.from({ length: newMap.tileMap.obstacleLayer[0].length }).map(
						() => null
					),
				],
				decorationLayer: [
					...newMap.tileMap.decorationLayer,
					Array.from({ length: newMap.tileMap.decorationLayer[0].length }).map(
						() => null
					),
				],
				foregroundLayer: [
					...newMap.tileMap.foregroundLayer,
					Array.from({ length: newMap.tileMap.foregroundLayer[0].length }).map(
						() => null
					),
				],
			},
		}));

	const changeTile = (i: number, j: number, layer: LayerName) => {
		if (!tool) {
			return;
		}

		setNewMap((newMap) => ({
			...newMap,
			tileMap: {
				baseLayer:
					layer === 'Base'
						? newMap.tileMap.baseLayer.map((row, h) => {
								return row.map((el, k) => {
									if (h === i && k === j) {
										return tool.type === 'eraser' ? el : tool.tile;
									}
									return el;
								});
						  })
						: newMap.tileMap.baseLayer,
				encounterLayer:
					layer === 'Encounter'
						? newMap.tileMap.encounterLayer.map((row, h) => {
								return row.map((el, k) => {
									if (h === i && k === j) {
										return tool.type === 'eraser' ? null : tool.tile;
									}
									return el;
								});
						  })
						: newMap.tileMap.encounterLayer,
				obstacleLayer:
					layer === 'Obstacle'
						? newMap.tileMap.obstacleLayer.map((row, h) => {
								return row.map((el, k) => {
									if (h === i && k === j) {
										return tool.type === 'eraser' ? null : tool.tile;
									}
									return el;
								});
						  })
						: newMap.tileMap.obstacleLayer,
				decorationLayer:
					layer === 'Decoration'
						? newMap.tileMap.decorationLayer.map((row, h) => {
								return row.map((el, k) => {
									if (h === i && k === j) {
										return tool.type === 'eraser' ? null : tool.tile;
									}
									return el;
								});
						  })
						: newMap.tileMap.decorationLayer,
				foregroundLayer:
					layer === 'Foreground'
						? newMap.tileMap.foregroundLayer.map((row, h) => {
								return row.map((el, k) => {
									if (h === i && k === j) {
										return tool.type === 'eraser' ? null : tool.tile;
									}
									return el;
								});
						  })
						: newMap.tileMap.foregroundLayer,
			},
		}));
	};
	const changeRow = (i: number, layer: LayerName) => {
		if (!tool) {
			return;
		}

		setNewMap((newMap) => ({
			...newMap,
			tileMap: {
				baseLayer:
					layer === 'Base'
						? newMap.tileMap.baseLayer.map((row, h) => {
								if (h === i) {
									return row.map((el) =>
										tool.type === 'eraser' ? el : tool.tile
									);
								}
								return row;
						  })
						: newMap.tileMap.baseLayer,
				encounterLayer:
					layer === 'Encounter'
						? newMap.tileMap.encounterLayer.map((row, h) => {
								if (h === i) {
									return row.map(() =>
										tool.type === 'eraser' ? null : tool.tile
									);
								}
								return row;
						  })
						: newMap.tileMap.encounterLayer,
				obstacleLayer:
					layer === 'Obstacle'
						? newMap.tileMap.obstacleLayer.map((row, h) => {
								if (h === i) {
									return row.map(() =>
										tool.type === 'eraser' ? null : tool.tile
									);
								}
								return row;
						  })
						: newMap.tileMap.obstacleLayer,
				decorationLayer:
					layer === 'Decoration'
						? newMap.tileMap.decorationLayer.map((row, h) => {
								if (h === i) {
									return row.map(() =>
										tool.type === 'eraser' ? null : tool.tile
									);
								}
								return row;
						  })
						: newMap.tileMap.decorationLayer,
				foregroundLayer:
					layer === 'Foreground'
						? newMap.tileMap.foregroundLayer.map((row, h) => {
								if (h === i) {
									return row.map(() =>
										tool.type === 'eraser' ? null : tool.tile
									);
								}
								return row;
						  })
						: newMap.tileMap.foregroundLayer,
			},
		}));
	};

	const changeColumn = (j: number, layer: LayerName) => {
		if (!tool) {
			return;
		}
		setNewMap((newMap) => ({
			...newMap,
			tileMap: {
				baseLayer:
					layer === 'Base'
						? newMap.tileMap.baseLayer.map((row) => {
								return row.map((el, k) => {
									if (k === j) {
										return tool.type === 'eraser' ? el : tool.tile;
									}
									return el;
								});
						  })
						: newMap.tileMap.baseLayer,
				encounterLayer:
					layer === 'Encounter'
						? newMap.tileMap.encounterLayer.map((row) => {
								return row.map((el, k) => {
									if (k === j) {
										return tool.type === 'eraser' ? null : tool.tile;
									}
									return el;
								});
						  })
						: newMap.tileMap.encounterLayer,
				obstacleLayer:
					layer === 'Obstacle'
						? newMap.tileMap.obstacleLayer.map((row) => {
								return row.map((el, k) => {
									if (k === j) {
										return tool.type === 'eraser' ? null : tool.tile;
									}
									return el;
								});
						  })
						: newMap.tileMap.obstacleLayer,
				decorationLayer:
					layer === 'Decoration'
						? newMap.tileMap.decorationLayer.map((row) => {
								return row.map((el, k) => {
									if (k === j) {
										return tool.type === 'eraser' ? null : tool.tile;
									}
									return el;
								});
						  })
						: newMap.tileMap.decorationLayer,
				foregroundLayer:
					layer === 'Foreground'
						? newMap.tileMap.foregroundLayer.map((row) => {
								return row.map((el, k) => {
									if (k === j) {
										return tool.type === 'eraser' ? null : tool.tile;
									}
									return el;
								});
						  })
						: newMap.tileMap.foregroundLayer,
			},
		}));
	};

	const clearLayer = (layer: LayerName) => {
		setNewMap((newMap) => ({
			...newMap,
			tileMap: {
				baseLayer: newMap.tileMap.baseLayer,
				encounterLayer:
					layer === 'Encounter'
						? newMap.tileMap.encounterLayer.map((row) => {
								return row.map(() => {
									return null;
								});
						  })
						: newMap.tileMap.encounterLayer,
				obstacleLayer:
					layer === 'Obstacle'
						? newMap.tileMap.obstacleLayer.map((row) => {
								return row.map(() => {
									return null;
								});
						  })
						: newMap.tileMap.obstacleLayer,
				decorationLayer:
					layer === 'Decoration'
						? newMap.tileMap.decorationLayer.map((row) => {
								return row.map(() => {
									return null;
								});
						  })
						: newMap.tileMap.decorationLayer,
				foregroundLayer:
					layer === 'Decoration'
						? newMap.tileMap.foregroundLayer.map((row) => {
								return row.map(() => {
									return null;
								});
						  })
						: newMap.tileMap.foregroundLayer,
			},
		}));
	};
	const randomFill = (layer: LayerName, percentage: number) => {
		if (tool?.type !== 'tileplacer') {
			return;
		}

		const updatedMap = {
			...newMapState,
			tileMap: {
				baseLayer:
					layer === 'Base'
						? newMapState.tileMap.baseLayer.map((row) =>
								row.map((c) => (Math.random() < percentage ? tool.tile : c))
						  )
						: newMapState.tileMap.baseLayer,
				encounterLayer:
					layer === 'Encounter'
						? newMapState.tileMap.encounterLayer.map((row) =>
								row.map((c) => (Math.random() < percentage ? tool.tile : c))
						  )
						: newMapState.tileMap.encounterLayer,
				obstacleLayer:
					layer === 'Obstacle'
						? newMapState.tileMap.obstacleLayer.map((row) => {
								return row.map((c) => {
									return Math.random() < percentage ? tool.tile : c;
								});
						  })
						: newMapState.tileMap.obstacleLayer,
				decorationLayer:
					layer === 'Decoration'
						? newMapState.tileMap.decorationLayer.map((row) => {
								return row.map((c) => {
									return Math.random() < percentage ? tool.tile : c;
								});
						  })
						: newMapState.tileMap.decorationLayer,
				foregroundLayer:
					layer === 'Foreground'
						? newMapState.tileMap.foregroundLayer.map((row) => {
								return row.map((c) => {
									return Math.random() < percentage ? tool.tile : c;
								});
						  })
						: newMapState.tileMap.foregroundLayer,
			},
		};
		setNewMap(updatedMap);
	};

	const addEncounter = (name: string, xp: number, timeOfDay: TimeOfDay) => {
		setNewMap({
			...newMapState,
			possibleEncounters: {
				...newMapState.possibleEncounters,
				[timeOfDay]: [
					...newMapState.possibleEncounters[timeOfDay],
					{ name, xp },
				],
			},
		});
	};
	const removeEncounter = (name: string, xp: number, timeOfDay: TimeOfDay) => {
		setNewMap({
			...newMapState,
			possibleEncounters: {
				...newMapState.possibleEncounters,
				[timeOfDay]: [
					...newMapState.possibleEncounters[timeOfDay].filter(
						(e) => e.name !== name && e.xp !== xp
					),
				],
			},
		});
	};
	const addOccupant = (x: Occupant) => {
		setNewMap({ ...newMapState, occupants: [...newMapState.occupants, x] });
	};
	const removeOccupant = (id: string) => {
		setNewMap({
			...newMapState,
			occupants: newMapState.occupants.filter((o) => o.id !== id),
		});
	};

	return {
		newMap,
		addColumn,
		addRow,
		changeTile,
		clearLayer,
		changeRow,
		changeColumn,
		addEncounter,
		removeEncounter,
		addOccupant,
		removeOccupant,
		usedTiles,
		randomFill,
	};
};
