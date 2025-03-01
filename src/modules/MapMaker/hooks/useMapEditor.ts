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
					undefined,
				]),
				obstacleLayer: newMap.tileMap.obstacleLayer.map((row) => [
					...row,
					undefined,
				]),
				decorationLayer: newMap.tileMap.decorationLayer.map((row) => [
					...row,
					undefined,
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
						() => undefined
					),
				],
				obstacleLayer: [
					...newMap.tileMap.obstacleLayer,
					Array.from({ length: newMap.tileMap.obstacleLayer[0].length }).map(
						() => undefined
					),
				],
				decorationLayer: [
					...newMap.tileMap.decorationLayer,
					Array.from({ length: newMap.tileMap.decorationLayer[0].length }).map(
						() => undefined
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
										return tool.type === 'eraser' ? undefined : tool.tile;
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
										return tool.type === 'eraser' ? undefined : tool.tile;
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
										return tool.type === 'eraser' ? undefined : tool.tile;
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
								return undefined;
							});
					  })
					: newMap.tileMap.encounterLayer,
			obstacleLayer:
				layer === 'Obstacle'
					? newMap.tileMap.obstacleLayer.map((row) => {
							return row.map(() => {
								return undefined;
							});
					  })
					: newMap.tileMap.obstacleLayer,
			decorationLayer:
				layer === 'Decoration'
					? newMap.tileMap.decorationLayer.map((row) => {
							return row.map(() => {
								return undefined;
							});
					  })
					: newMap.tileMap.decorationLayer,
		}));
	};

	return { newMap, addColumn, addRow, changeTile, clearLayer };
};
