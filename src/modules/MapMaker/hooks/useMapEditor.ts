import { useState } from 'react';
import { testMap } from '../../../constants/maps/test/testMap';
import { GameMap } from '../../../interfaces/OverworldMap';
import { Tool } from '../MapMaker';

export type LayerName = 'Base' | 'Obstacle' | 'Decoration' | 'Encounter';
export const useMapEditor = ({ tool }: { tool: Tool | undefined }) => {
	const [newMap, setNewMap] = useState<GameMap>(testMap.tileMap);

	const addColumn = () =>
		setNewMap((newMap) => ({
			baseLayer: newMap.baseLayer.map((row) => [...row, row[row.length - 1]]),
			encounterLayer: newMap.encounterLayer.map((row) => [...row, undefined]),
			obstacleLayer: newMap.obstacleLayer.map((row) => [...row, undefined]),
			decorationLayer: newMap.decorationLayer.map((row) => [...row, undefined]),
		}));
	const addRow = () =>
		setNewMap((newMap) => ({
			baseLayer: [
				...newMap.baseLayer,
				newMap.baseLayer[newMap.baseLayer.length - 1],
			],
			encounterLayer: [
				...newMap.encounterLayer,
				Array.from({ length: newMap.encounterLayer[0].length }).map(
					() => undefined
				),
			],
			obstacleLayer: [
				...newMap.obstacleLayer,
				Array.from({ length: newMap.obstacleLayer[0].length }).map(
					() => undefined
				),
			],
			decorationLayer: [
				...newMap.decorationLayer,
				Array.from({ length: newMap.decorationLayer[0].length }).map(
					() => undefined
				),
			],
		}));

	const changeTile = (i: number, j: number, layer: LayerName) => {
		if (!tool) {
			return;
		}

		setNewMap((newMap) => ({
			baseLayer:
				layer === 'Base'
					? newMap.baseLayer.map((row, h) => {
							return row.map((el, k) => {
								if (h === i && k === j) {
									return tool.type === 'eraser' ? el : tool.tile;
								}
								return el;
							});
					  })
					: newMap.baseLayer,
			encounterLayer:
				layer === 'Encounter'
					? newMap.encounterLayer.map((row, h) => {
							return row.map((el, k) => {
								if (h === i && k === j) {
									return tool.type === 'eraser' ? undefined : tool.tile;
								}
								return el;
							});
					  })
					: newMap.encounterLayer,
			obstacleLayer:
				layer === 'Obstacle'
					? newMap.obstacleLayer.map((row, h) => {
							return row.map((el, k) => {
								if (h === i && k === j) {
									return tool.type === 'eraser' ? undefined : tool.tile;
								}
								return el;
							});
					  })
					: newMap.obstacleLayer,
			decorationLayer:
				layer === 'Decoration'
					? newMap.decorationLayer.map((row, h) => {
							return row.map((el, k) => {
								if (h === i && k === j) {
									return tool.type === 'eraser' ? undefined : tool.tile;
								}
								return el;
							});
					  })
					: newMap.decorationLayer,
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
					? newMap.encounterLayer.map((row) => {
							return row.map(() => {
								return undefined;
							});
					  })
					: newMap.encounterLayer,
			obstacleLayer:
				layer === 'Obstacle'
					? newMap.obstacleLayer.map((row) => {
							return row.map(() => {
								return undefined;
							});
					  })
					: newMap.obstacleLayer,
			decorationLayer:
				layer === 'Decoration'
					? newMap.decorationLayer.map((row) => {
							return row.map(() => {
								return undefined;
							});
					  })
					: newMap.decorationLayer,
		}));
	};

	return { newMap, addColumn, addRow, changeTile, clearLayer };
};
