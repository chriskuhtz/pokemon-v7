import { JSX } from 'react';
import { CombinedCanvas } from '../../../components/CombinedCanvas/CombinedCanvas';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { Tool } from '../MapMaker';
import { useMapEditor } from '../hooks/useMapEditor';
import { LayerEditor } from './LayerEditor';

export const MapEditor = ({
	tool,
	initialMap,
}: {
	tool: Tool | undefined;
	initialMap: OverworldMap;
}): JSX.Element => {
	const { newMap, addColumn, addRow, changeTile, clearLayer, changeRow } =
		useMapEditor({
			tool,
			initialMap,
		});
	return (
		<div>
			<h2>
				My Map {newMap.tileMap.baseLayer.length}/
				{newMap.tileMap.baseLayer[0].length}
			</h2>

			<div style={{ maxHeight: '80dvh', overflowY: 'scroll' }}>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.tileMap.baseLayer}
					layerName="Base"
					clear={() => clearLayer('Base')}
					changeRow={(index) => changeRow(index, 'Base')}
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.tileMap.encounterLayer}
					layerName="Encounter"
					clear={() => clearLayer('Encounter')}
					changeRow={(index) => changeRow(index, 'Encounter')}
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.tileMap.decorationLayer}
					layerName="Decoration"
					clear={() => clearLayer('Decoration')}
					changeRow={(index) => changeRow(index, 'Decoration')}
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.tileMap.obstacleLayer}
					layerName="Obstacle"
					clear={() => clearLayer('Obstacle')}
					changeRow={(index) => changeRow(index, 'Obstacle')}
				/>
				<CombinedCanvas map={newMap.tileMap} tileSize={16} />
				<br />
				<a
					style={{ color: 'white' }}
					href={
						'data:text/json;charset=utf-8,' +
						encodeURIComponent(
							JSON.stringify(newMap, function (k, v) {
								return v === undefined ? null : v;
							})
						)
					}
					download={`map_${new Date().getTime()}.json`}
				>
					Download
				</a>
			</div>
		</div>
	);
};
