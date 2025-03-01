import { JSX } from 'react';
import { CombinedCanvas } from '../../../components/CombinedCanvas/CombinedCanvas';
import { Tool } from '../MapMaker';
import { useMapEditor } from '../hooks/useMapEditor';
import { LayerEditor } from './LayerEditor';

export const MapEditor = ({
	tool,
}: {
	tool: Tool | undefined;
}): JSX.Element => {
	const { newMap, addColumn, addRow, changeTile, clearLayer } = useMapEditor({
		tool,
	});
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
					clear={() => clearLayer('Base')}
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.encounterLayer}
					layerName="Encounter"
					clear={() => clearLayer('Encounter')}
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.decorationLayer}
					layerName="Decoration"
					clear={() => clearLayer('Decoration')}
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.obstacleLayer}
					layerName="Obstacle"
					clear={() => clearLayer('Obstacle')}
				/>
				<CombinedCanvas map={newMap} tileSize={16} />
				<br />
				<a
					style={{ color: 'white' }}
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
