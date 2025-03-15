import { JSX } from 'react';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { Tab, Tool } from '../MapMaker';
import { useMapEditor } from '../hooks/useMapEditor';
import { EncountersTab } from './EncountersTab';
import { OccupantsTab } from './OccupantsTab';
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
		newMap,
		addColumn,
		addRow,
		changeTile,
		clearLayer,
		changeRow,
		changeColumn,
		addEncounter,
		removeEncounter,
		addOccupant,
		removeOccupant,
		usedTiles,
	} = useMapEditor({
		tool,
		initialMap,
	});

	return (
		<div>
			<h2>{newMap.id}</h2>
			<div style={{ display: 'flex', gap: '1rem' }}>
				{['TileMap', 'ToolSelection', 'Encounters', 'Occupants'].map((t) => (
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
					<TileQuickSelection usedTiles={usedTiles} setSelected={setSelected} />
					<TileMapTab
						newMap={newMap}
						changeColumn={changeColumn}
						changeRow={changeRow}
						addColumn={addColumn}
						addRow={addRow}
						clearLayer={clearLayer}
						changeTile={changeTile}
					/>
				</>
			)}
			{activeTab === 'Encounters' && (
				<EncountersTab
					removeEncounter={removeEncounter}
					addEncounter={addEncounter}
					newMap={newMap}
				/>
			)}
			{activeTab === 'Occupants' && (
				<OccupantsTab
					addOccupant={addOccupant}
					removeOccupant={removeOccupant}
					newMap={newMap}
				/>
			)}
			{activeTab === 'ToolSelection' && (
				<>
					<ToolSelection setSelected={setSelected} />
				</>
			)}
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
			<a
				style={{ color: 'white', paddingLeft: '2rem' }}
				onClick={() => {
					if (activeTab === 'TileMap') {
						navigator.clipboard.writeText(JSON.stringify(newMap.tileMap));
					}
					if (activeTab === 'Occupants') {
						navigator.clipboard.writeText(JSON.stringify(newMap.occupants));
					}
					if (activeTab === 'Encounters') {
						navigator.clipboard.writeText(
							JSON.stringify(newMap.possibleEncounters)
						);
					}
				}}
			>
				Copy to Clipboard
			</a>
		</div>
	);
};
