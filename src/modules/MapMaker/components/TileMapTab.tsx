import { CombinedCanvas } from '../../../components/CombinedCanvas/CombinedCanvas';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { LayerName } from '../hooks/useMapEditor';
import { LayerEditor } from './LayerEditor';

export const TileMapTab = ({
	addColumn,
	addRow,
	newMap,
	changeColumn,
	changeTile,
	changeRow,
	clearLayer,
}: {
	newMap: OverworldMap;
	addColumn: () => void;
	addRow: () => void;
	changeTile: (i: number, j: number, layer: LayerName) => void;
	clearLayer: (layer: LayerName) => void;
	changeRow: (i: number, layer: LayerName) => void;
	changeColumn: (j: number, layer: LayerName) => void;
}) => {
	return (
		<div>
			<div style={{ maxHeight: '80dvh', overflowY: 'scroll' }}>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.tileMap.baseLayer}
					layerName="Base"
					clear={() => clearLayer('Base')}
					changeRow={(index) => changeRow(index, 'Base')}
					changeColumn={(index) => changeColumn(index, 'Base')}
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.tileMap.encounterLayer}
					layerName="Encounter"
					clear={() => clearLayer('Encounter')}
					changeRow={(index) => changeRow(index, 'Encounter')}
					changeColumn={(index) => changeColumn(index, 'Encounter')}
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.tileMap.decorationLayer}
					layerName="Decoration"
					clear={() => clearLayer('Decoration')}
					changeRow={(index) => changeRow(index, 'Decoration')}
					changeColumn={(index) => changeColumn(index, 'Decoration')}
				/>
				<LayerEditor
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={newMap.tileMap.obstacleLayer}
					layerName="Obstacle"
					clear={() => clearLayer('Obstacle')}
					changeRow={(index) => changeRow(index, 'Obstacle')}
					changeColumn={(index) => changeColumn(index, 'Obstacle')}
				/>
				<CombinedCanvas map={newMap.tileMap} tileSize={16} />
				<br />
			</div>
		</div>
	);
};
