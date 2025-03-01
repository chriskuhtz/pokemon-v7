import { JSX } from 'react';
import { Tool } from '../MapMaker';
import { useMapEditor } from '../hooks/useMapEditor';
import { LayerEditor } from './LayerEditor';
import { CombinedCanvas } from '../../../components/CombinedCanvas/CombinedCanvas';

export const MapEditor = ({
	tool,
}: {
	tool: Tool | undefined;
}): JSX.Element => {
	const { newMap, addColumn, addRow, changeTile } = useMapEditor({ tool });
	return (
		<div>
			<h2>
				My Map {newMap.baseLayer.length}/{newMap.baseLayer[0].length}
			</h2>

			<div style={{ maxHeight: '80dvh', overflowY: 'scroll' }}>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.baseLayer}
					layerName="Base"
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.decorationLayer}
					layerName="Decoration"
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.obstacleLayer}
					layerName="Obstacle"
				/>
				<CombinedCanvas map={newMap} tileSize={16} />
				<a
					href={
						'data:text/json;charset=utf-8,' +
						encodeURIComponent(JSON.stringify(newMap))
					}
					download={`map_${new Date().getTime()}.json`}
				>
					Download
				</a>
			</div>
		</div>
	);
};
