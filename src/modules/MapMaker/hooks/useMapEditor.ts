import { useDeferredValue, useState } from 'react';
import { OverworldMap, TileIdentifier } from '../../../interfaces/OverworldMap';
import { Tool } from '../MapMaker';

export type LayerName =
	| 'Base'
	| 'Obstacle'
	| 'Decoration'
	| 'Encounter'
	| 'Foreground'
	| 'Water';
export const useMapEditor = ({
	tool,
	initialMap,
}: {
	tool: Tool | undefined;
	initialMap: OverworldMap;
}) => {
	const [baseLayer, setBaseLayer] = useState<TileIdentifier[][]>(
		initialMap.tileMap.baseLayer
	);
	const [encounterLayer, setencounterLayer] = useState<
		(TileIdentifier | null)[][]
	>(initialMap.tileMap.encounterLayer);
	const [decorationLayer, setdecorationLayer] = useState<
		(TileIdentifier | null)[][]
	>(initialMap.tileMap.decorationLayer);
	const [obstacleLayer, setobstacleLayer] = useState<
		(TileIdentifier | null)[][]
	>(initialMap.tileMap.obstacleLayer);
	const [foregroundLayer, setforegroundLayer] = useState<
		(TileIdentifier | null)[][]
	>(initialMap.tileMap.foregroundLayer);
	const [waterLayer, setwaterLayer] = useState<(TileIdentifier | null)[][]>(
		initialMap.tileMap.waterLayer
	);

	const addColumn = () => {
		setBaseLayer(baseLayer.map((row) => [...row, row[row.length - 1]]));
		setencounterLayer(encounterLayer.map((row) => [...row, null]));
		setobstacleLayer(obstacleLayer.map((row) => [...row, null]));
		setdecorationLayer(decorationLayer.map((row) => [...row, null]));
		setforegroundLayer(foregroundLayer.map((row) => [...row, null]));
		setwaterLayer(waterLayer.map((row) => [...row, null]));
	};
	const addRow = () => {
		setBaseLayer([...baseLayer, baseLayer[baseLayer.length - 1]]);
		setencounterLayer([
			...encounterLayer,
			Array.from({ length: encounterLayer[0].length }).map(() => null),
		]);
		setobstacleLayer([
			...obstacleLayer,
			Array.from({ length: obstacleLayer[0].length }).map(() => null),
		]);
		setdecorationLayer([
			...decorationLayer,
			Array.from({ length: decorationLayer[0].length }).map(() => null),
		]);
		setforegroundLayer([
			...foregroundLayer,
			Array.from({ length: foregroundLayer[0].length }).map(() => null),
		]);
		setwaterLayer([
			...waterLayer,
			Array.from({ length: waterLayer[0].length }).map(() => null),
		]);
	};

	const changeTile = (i: number, j: number, layer: LayerName) => {
		if (!tool) {
			return;
		}

		if (layer === 'Base') {
			setBaseLayer(
				baseLayer.map((row, h) => {
					return row.map((el, k) => {
						if (h === i && k === j) {
							return tool.type === 'eraser' ? el : tool.tile;
						}
						return el;
					});
				})
			);
		}
		if (layer === 'Decoration') {
			setdecorationLayer(
				decorationLayer.map((row, h) => {
					return row.map((el, k) => {
						if (h === i && k === j) {
							return tool.type === 'eraser' ? null : tool.tile;
						}
						return el;
					});
				})
			);
		}
		if (layer === 'Encounter') {
			setencounterLayer(
				encounterLayer.map((row, h) => {
					return row.map((el, k) => {
						if (h === i && k === j) {
							return tool.type === 'eraser' ? null : tool.tile;
						}
						return el;
					});
				})
			);
		}
		if (layer === 'Obstacle') {
			setobstacleLayer(
				obstacleLayer.map((row, h) => {
					return row.map((el, k) => {
						if (h === i && k === j) {
							return tool.type === 'eraser' ? null : tool.tile;
						}
						return el;
					});
				})
			);
		}
		if (layer === 'Foreground') {
			setforegroundLayer(
				foregroundLayer.map((row, h) => {
					return row.map((el, k) => {
						if (h === i && k === j) {
							return tool.type === 'eraser' ? null : tool.tile;
						}
						return el;
					});
				})
			);
		}
		if (layer === 'Water') {
			setwaterLayer(
				waterLayer.map((row, h) => {
					return row.map((el, k) => {
						if (h === i && k === j) {
							return tool.type === 'eraser' ? null : tool.tile;
						}
						return el;
					});
				})
			);
		}
	};
	const changeRow = (i: number, layer: LayerName) => {
		if (!tool) {
			return;
		}

		if (layer === 'Base') {
			setBaseLayer(
				baseLayer.map((row, h) => {
					if (h === i) {
						return row.map((el) => (tool.type === 'eraser' ? el : tool.tile));
					}
					return row;
				})
			);
		}
		if (layer === 'Encounter') {
			setencounterLayer(
				encounterLayer.map((row, h) => {
					if (h === i) {
						return row.map(() => (tool.type === 'eraser' ? null : tool.tile));
					}
					return row;
				})
			);
		}
		if (layer === 'Decoration') {
			setdecorationLayer(
				decorationLayer.map((row, h) => {
					if (h === i) {
						return row.map(() => (tool.type === 'eraser' ? null : tool.tile));
					}
					return row;
				})
			);
		}
		if (layer === 'Obstacle') {
			setobstacleLayer(
				obstacleLayer.map((row, h) => {
					if (h === i) {
						return row.map(() => (tool.type === 'eraser' ? null : tool.tile));
					}
					return row;
				})
			);
		}
		if (layer === 'Foreground') {
			setforegroundLayer(
				foregroundLayer.map((row, h) => {
					if (h === i) {
						return row.map(() => (tool.type === 'eraser' ? null : tool.tile));
					}
					return row;
				})
			);
		}
		if (layer === 'Water') {
			setwaterLayer(
				waterLayer.map((row, h) => {
					if (h === i) {
						return row.map(() => (tool.type === 'eraser' ? null : tool.tile));
					}
					return row;
				})
			);
		}
	};
	const changeColumn = (j: number, layer: LayerName) => {
		if (!tool) {
			return;
		}

		if (layer === 'Base') {
			setBaseLayer(
				baseLayer.map((row) => {
					return row.map((el, k) => {
						if (k === j) {
							return tool.type === 'eraser' ? el : tool.tile;
						}
						return el;
					});
				})
			);
		}
		if (layer === 'Encounter') {
			setencounterLayer(
				encounterLayer.map((row) => {
					return row.map((el, k) => {
						if (k === j) {
							return tool.type === 'eraser' ? null : tool.tile;
						}
						return el;
					});
				})
			);
		}
		if (layer === 'Obstacle') {
			setobstacleLayer(
				obstacleLayer.map((row) => {
					return row.map((el, k) => {
						if (k === j) {
							return tool.type === 'eraser' ? null : tool.tile;
						}
						return el;
					});
				})
			);
		}
		if (layer === 'Decoration') {
			setdecorationLayer(
				decorationLayer.map((row) => {
					return row.map((el, k) => {
						if (k === j) {
							return tool.type === 'eraser' ? null : tool.tile;
						}
						return el;
					});
				})
			);
		}
		if (layer === 'Foreground') {
			setforegroundLayer(
				foregroundLayer.map((row) => {
					return row.map((el, k) => {
						if (k === j) {
							return tool.type === 'eraser' ? null : tool.tile;
						}
						return el;
					});
				})
			);
		}
		if (layer === 'Water') {
			setwaterLayer(
				waterLayer.map((row) => {
					return row.map((el, k) => {
						if (k === j) {
							return tool.type === 'eraser' ? null : tool.tile;
						}
						return el;
					});
				})
			);
		}
	};
	const clearLayer = (layer: LayerName) => {
		if (layer === 'Encounter') {
			setencounterLayer(
				encounterLayer.map((row) => {
					return row.map(() => {
						return null;
					});
				})
			);
		}
		if (layer === 'Obstacle') {
			setobstacleLayer(
				obstacleLayer.map((row) => {
					return row.map(() => {
						return null;
					});
				})
			);
		}
		if (layer === 'Decoration') {
			setdecorationLayer(
				decorationLayer.map((row) => {
					return row.map(() => {
						return null;
					});
				})
			);
		}
		if (layer === 'Foreground') {
			setforegroundLayer(
				foregroundLayer.map((row) => {
					return row.map(() => {
						return null;
					});
				})
			);
		}
		if (layer === 'Water') {
			setwaterLayer(
				waterLayer.map((row) => {
					return row.map(() => {
						return null;
					});
				})
			);
		}
	};
	const randomFill = (layer: LayerName, percentage: number) => {
		if (tool?.type !== 'tileplacer') {
			return;
		}

		if (layer === 'Base') {
			setBaseLayer(
				baseLayer.map((row) =>
					row.map((c) => (Math.random() < percentage ? tool.tile : c))
				)
			);
		}
		if (layer === 'Encounter') {
			setencounterLayer(
				encounterLayer.map((row) =>
					row.map((c) => (Math.random() < percentage ? tool.tile : c))
				)
			);
		}
		if (layer === 'Obstacle') {
			setobstacleLayer(
				obstacleLayer.map((row) =>
					row.map((c) => (Math.random() < percentage ? tool.tile : c))
				)
			);
		}
		if (layer === 'Decoration') {
			setdecorationLayer(
				decorationLayer.map((row) =>
					row.map((c) => (Math.random() < percentage ? tool.tile : c))
				)
			);
		}
		if (layer === 'Foreground') {
			setforegroundLayer(
				foregroundLayer.map((row) =>
					row.map((c) => (Math.random() < percentage ? tool.tile : c))
				)
			);
		}
		if (layer === 'Water') {
			setwaterLayer(
				waterLayer.map((row) =>
					row.map((c) => (Math.random() < percentage ? tool.tile : c))
				)
			);
		}
	};

	const b = useDeferredValue(baseLayer);
	const e = useDeferredValue(encounterLayer);
	const o = useDeferredValue(obstacleLayer);
	const d = useDeferredValue(decorationLayer);
	const f = useDeferredValue(foregroundLayer);
	const w = useDeferredValue(waterLayer);

	return {
		addColumn,
		addRow,
		changeTile,
		clearLayer,
		changeRow,
		changeColumn,
		randomFill,
		baseLayer: b,
		encounterLayer: e,
		decorationLayer: d,
		foregroundLayer: f,
		obstacleLayer: o,
		waterLayer: w,
	};
};
