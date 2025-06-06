import { JSX, useMemo } from 'react';
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
		replaceAll,
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

			<div
				style={{
					padding: '1rem',
					borderBottom: '2px solid white',
				}}
			>
				<h3>Select Layer:</h3>
				<div
					style={{
						display: 'flex',
						gap: '1rem',
						paddingBottom: '1rem',
					}}
				>
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
							style={{
								color: t === activeTab ? 'wheat' : 'lightgray',
								backgroundColor: 'rgba(0,0,0,0)',
							}}
							onClick={() => setActiveTab(t as LayerName)}
						>
							{t}
						</button>
					))}
				</div>
			</div>

			<ToolSelection
				selected={tool}
				setSelected={setSelected}
				tileSetUrl={initialMap.tilesetUrl}
			/>

			<div
				style={{
					position: 'relative',
				}}
			>
				<LayerEditor
					tileSetUrl={initialMap.tilesetUrl}
					tileMap={{
						baseLayer,
						encounterLayer,
						decorationLayer,
						foregroundLayer,
						obstacleLayer,
						waterLayer,
					}}
					occupants={initialMap.occupants}
					addColumn={addColumn}
					addRow={addRow}
					changeTile={changeTile}
					layer={layer}
					layerName={activeTab}
					clear={() => clearLayer(activeTab)}
					changeRow={(index) => changeRow(index, activeTab)}
					changeColumn={(index) => changeColumn(index, activeTab)}
					randomFill={randomFill}
					replaceAll={replaceAll}
				/>
			</div>
		</div>
	);
};
