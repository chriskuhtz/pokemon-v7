import { JSX, useMemo } from 'react';
import { CombinedCanvas } from '../../../components/CombinedCanvas/CombinedCanvas';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { Tool } from '../MapMaker';
import { LayerName, useMapEditor } from '../hooks/useMapEditor';
import { LayerEditor } from './LayerEditor';
import { ToolSelection } from './ToolSelection';

export const MapEditor = ({
	tool,
	initialMap,
	activeTab,
	setActiveTab,
	setSelected,
}: {
	tool: Tool | undefined;
	initialMap: OverworldMap;
	activeTab: LayerName;
	setActiveTab: (x: LayerName) => void;
	setSelected: (x: Tool) => void;
}): JSX.Element => {
	const {
		addColumn,
		addRow,
		changeTile,
		clearLayer,
		changeRow,
		changeColumn,
		baseLayer,
		encounterLayer,
		decorationLayer,
		foregroundLayer,
		obstacleLayer,
		waterLayer,
		randomFill,
	} = useMapEditor({
		tool,
		initialMap,
	});

	const layer = useMemo(() => {
		if (activeTab === 'Decoration') {
			return decorationLayer;
		}
		if (activeTab === 'Water') {
			return waterLayer;
		}
		if (activeTab === 'Encounter') {
			return encounterLayer;
		}
		if (activeTab === 'Obstacle') {
			return obstacleLayer;
		}
		if (activeTab === 'Foreground') {
			return foregroundLayer;
		}

		return baseLayer;
	}, [
		activeTab,
		baseLayer,
		decorationLayer,
		encounterLayer,
		foregroundLayer,
		obstacleLayer,
		waterLayer,
	]);

	return (
		<div>
			<h2>{initialMap.id}</h2>
			<div style={{ display: 'flex', gap: '1rem' }}>
				{[
					'Base',
					'Obstacle',
					'Decoration',
					'Encounter',
					'Foreground',
					'Water',
				].map((t) => (
					<button
						key={t}
						style={{ color: t === activeTab ? 'wheat' : 'lightgray' }}
						onClick={() => setActiveTab(t as LayerName)}
					>
						{t}
					</button>
				))}
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					padding: '1rem',
				}}
			>
				<ToolSelection
					setSelected={setSelected}
					tileSetUrl={initialMap.tilesetUrl}
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
					tileSize={8}
					tileSetUrl={initialMap.tilesetUrl}
				/>
			</div>
			<div>
				<LayerEditor
					tileSetUrl={initialMap.tilesetUrl}
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={layer}
					layerName={activeTab}
					clear={() => clearLayer(activeTab)}
					changeRow={(index) => changeRow(index, activeTab)}
					changeColumn={(index) => changeColumn(index, activeTab)}
					randomFill={randomFill}
				/>
			</div>

			<a
				style={{ color: 'white' }}
				href={
					'data:text/json;charset=utf-8,' +
					encodeURIComponent(JSON.stringify(initialMap))
				}
				download={`map_${new Date().getTime()}.json`}
			>
				Download
			</a>
			<a
				style={{ color: 'white', paddingLeft: '2rem' }}
				onClick={() => {
					navigator.clipboard.writeText(JSON.stringify(initialMap.tileMap));
				}}
			>
				Copy to Clipboard
			</a>
		</div>
	);
};
