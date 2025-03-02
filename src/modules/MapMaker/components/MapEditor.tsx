import { JSX, useMemo } from 'react';
import { OverworldMap, TileIdentifier } from '../../../interfaces/OverworldMap';
import { Tab, Tool } from '../MapMaker';
import { useMapEditor } from '../hooks/useMapEditor';
import { EncountersTab } from './EncountersTab';
import { OccupantsTab } from './OccupantsTab';
import { TileMapTab } from './TileMapTab';
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
	} = useMapEditor({
		tool,
		initialMap,
	});

	const usedTiles = useMemo(() => {
		const used: TileIdentifier[] = [];

		const all = [
			...newMap.tileMap.baseLayer.flat(),
			...newMap.tileMap.encounterLayer.flat(),
			...newMap.tileMap.obstacleLayer.flat(),
			...newMap.tileMap.decorationLayer.flat(),
		];

		all.forEach((t) => {
			if (
				t &&
				!used.find(
					(entry) => entry.yOffset === t.yOffset && entry.xOffset === t.xOffset
				)
			) {
				used.push(t);
			}
		});

		return used;
	}, [newMap]);
	return (
		<div>
			<h2>{newMap.id}</h2>
			<div style={{ display: 'flex', gap: '1rem' }}>
				{['TileMap', 'Encounters', 'Occupants', 'ToolSelection'].map((t) => (
					<button
						key={t}
						style={{ color: t === activeTab ? 'wheat' : 'lightgray' }}
						onClick={() => setActiveTab(t as Tab)}
					>
						{t}
					</button>
				))}
			</div>

			<div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
				{' '}
				<h4>Quick select:</h4>
				{usedTiles.map((ut, i) => (
					<div
						onClick={() => setSelected({ type: 'tileplacer', tile: ut })}
						key={ut.xOffset + ut.yOffset + i}
						style={{
							height: 16,
							width: 16,
							background: `url('/tilesets/masterSheet.png') ${ut.xOffset}px ${ut.yOffset}px`,
						}}
					></div>
				))}
			</div>
			{activeTab === 'TileMap' && (
				<TileMapTab
					newMap={newMap}
					changeColumn={changeColumn}
					changeRow={changeRow}
					addColumn={addColumn}
					addRow={addRow}
					clearLayer={clearLayer}
					changeTile={changeTile}
				/>
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
				<ToolSelection setSelected={setSelected} />
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
				onClick={() => navigator.clipboard.writeText(JSON.stringify(newMap))}
			>
				Copy to Clipboard
			</a>
		</div>
	);
};
