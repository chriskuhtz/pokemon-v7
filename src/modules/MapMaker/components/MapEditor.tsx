import { JSX } from 'react';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { Tab, Tool } from '../MapMaker';
import { useMapEditor } from '../hooks/useMapEditor';
import { TileMapTab } from './TileMapTab';
import { TileQuickSelection } from './TileQuickSelection';
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
	activeTab: Tab;
	setActiveTab: (x: Tab) => void;
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
		usedTiles,
		randomFill,
	} = useMapEditor({
		tool,
		initialMap,
	});

	return (
		<div>
			<h2>{initialMap.id}</h2>
			<div style={{ display: 'flex', gap: '1rem' }}>
				{['TileMap', 'ToolSelection'].map((t) => (
					<button
						key={t}
						style={{ color: t === activeTab ? 'wheat' : 'lightgray' }}
						onClick={() => setActiveTab(t as Tab)}
					>
						{t}
					</button>
				))}
			</div>

			{activeTab === 'TileMap' && (
				<>
					<TileQuickSelection
						usedTiles={usedTiles}
						setSelected={setSelected}
						tileSetUrl={initialMap.tilesetUrl}
					/>
					<TileMapTab
						tileSetUrl={initialMap.tilesetUrl}
						baseLayer={baseLayer}
						encounterLayer={encounterLayer}
						obstacleLayer={obstacleLayer}
						decorationLayer={decorationLayer}
						foregroundLayer={foregroundLayer}
						waterLayer={waterLayer}
						changeColumn={changeColumn}
						changeRow={changeRow}
						addColumn={addColumn}
						addRow={addRow}
						clearLayer={clearLayer}
						changeTile={changeTile}
						randomFill={randomFill}
					/>
				</>
			)}

			{activeTab === 'ToolSelection' && (
				<>
					<ToolSelection
						setSelected={setSelected}
						tileSetUrl={initialMap.tilesetUrl}
					/>
				</>
			)}
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
					if (activeTab === 'TileMap') {
						navigator.clipboard.writeText(JSON.stringify(initialMap.tileMap));
					}
					if (activeTab === 'Occupants') {
						navigator.clipboard.writeText(JSON.stringify(initialMap.occupants));
					}
					if (activeTab === 'Encounters') {
						navigator.clipboard.writeText(
							JSON.stringify(initialMap.possibleEncounters)
						);
					}
				}}
			>
				Copy to Clipboard
			</a>
		</div>
	);
};
