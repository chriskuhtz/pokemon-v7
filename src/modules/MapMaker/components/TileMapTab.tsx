import { CombinedCanvas } from '../../../components/CombinedCanvas/CombinedCanvas';
import { TileIdentifier } from '../../../interfaces/OverworldMap';
import { LayerName } from '../hooks/useMapEditor';
import { LayerEditor } from './LayerEditor';

export const TileMapTab = ({
	addColumn,
	addRow,
	changeColumn,
	changeTile,
	changeRow,
	clearLayer,
	randomFill,
	baseLayer,
	encounterLayer,
	decorationLayer,
	foregroundLayer,
	obstacleLayer,
	tileSetUrl,
	waterLayer,
}: {
	baseLayer: TileIdentifier[][];
	encounterLayer: (TileIdentifier | null)[][];
	decorationLayer: (TileIdentifier | null)[][];
	foregroundLayer: (TileIdentifier | null)[][];
	obstacleLayer: (TileIdentifier | null)[][];
	waterLayer: (TileIdentifier | null)[][];
	tileSetUrl: string;
	addColumn: () => void;
	addRow: () => void;
	changeTile: (i: number, j: number, layer: LayerName) => void;
	clearLayer: (layer: LayerName) => void;
	changeRow: (i: number, layer: LayerName) => void;
	changeColumn: (j: number, layer: LayerName) => void;
	randomFill: (layer: LayerName, percentage: number) => void;
}) => {
	return (
		<div>
			<div style={{ maxHeight: '80dvh', overflowY: 'scroll' }}>
				<LayerEditor
					tileSetUrl={tileSetUrl}
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={baseLayer}
					layerName="Base"
					clear={() => clearLayer('Base')}
					changeRow={(index) => changeRow(index, 'Base')}
					changeColumn={(index) => changeColumn(index, 'Base')}
					randomFill={randomFill}
				/>
				<LayerEditor
					tileSetUrl={tileSetUrl}
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={encounterLayer}
					layerName="Encounter"
					clear={() => clearLayer('Encounter')}
					changeRow={(index) => changeRow(index, 'Encounter')}
					changeColumn={(index) => changeColumn(index, 'Encounter')}
					randomFill={randomFill}
				/>
				<LayerEditor
					tileSetUrl={tileSetUrl}
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={decorationLayer}
					layerName="Decoration"
					clear={() => clearLayer('Decoration')}
					changeRow={(index) => changeRow(index, 'Decoration')}
					changeColumn={(index) => changeColumn(index, 'Decoration')}
					randomFill={randomFill}
				/>
				<LayerEditor
					tileSetUrl={tileSetUrl}
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={obstacleLayer}
					layerName="Obstacle"
					clear={() => clearLayer('Obstacle')}
					changeRow={(index) => changeRow(index, 'Obstacle')}
					changeColumn={(index) => changeColumn(index, 'Obstacle')}
					randomFill={randomFill}
				/>
				<LayerEditor
					tileSetUrl={tileSetUrl}
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={waterLayer}
					layerName="Water"
					clear={() => clearLayer('Water')}
					changeRow={(index) => changeRow(index, 'Water')}
					changeColumn={(index) => changeColumn(index, 'Water')}
					randomFill={randomFill}
				/>
				<LayerEditor
					tileSetUrl={tileSetUrl}
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={foregroundLayer}
					layerName="Foreground"
					clear={() => clearLayer('Foreground')}
					changeRow={(index) => changeRow(index, 'Foreground')}
					changeColumn={(index) => changeColumn(index, 'Foreground')}
					randomFill={randomFill}
				/>
				<CombinedCanvas
					map={{
						baseLayer,
						encounterLayer,
						obstacleLayer,
						decorationLayer,
						foregroundLayer,
						waterLayer,
					}}
					tileSize={16}
					tileSetUrl={tileSetUrl}
				/>
				<br />
			</div>
		</div>
	);
};
