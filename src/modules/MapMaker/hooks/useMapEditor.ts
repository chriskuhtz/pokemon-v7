import { useState } from 'react';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { Tool } from '../MapMaker';

export type LayerName = 'Base' | 'Obstacle' | 'Decoration' | 'Encounter';
export const useMapEditor = ({
	tool,
	initialMap,
}: {
	tool: Tool | undefined;
	initialMap: OverworldMap;
}) => {
	const [newMap, setNewMap] = useState<OverworldMap>(initialMap);

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
			},
		}));
	};

	const clearLayer = (layer: LayerName) => {
		if (layer === 'Base') {
			return;
		}

		setNewMap((newMap) => ({
			...newMap,
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
		}));
	};

	return {
		newMap,
		addColumn,
		addRow,
		changeTile,
		clearLayer,
		changeRow,
		changeColumn,
	};
};
