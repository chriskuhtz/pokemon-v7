import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { testMap } from '../../constants/maps/test/testMap';
import { TileIdentifier } from '../../interfaces/OverworldMap';
import { MapEditor } from './components/MapEditor';
import { ToolSelection } from './components/ToolSelection';

export const BaseSize = 16;
export interface TilePlacer {
	type: 'tileplacer';
	tile: TileIdentifier;
}
export interface Eraser {
	type: 'eraser';
}
export type Tool = TilePlacer | Eraser;
export type Tab = 'TileMap' | 'Encounters' | 'Occupants';

export const MapMaker = ({ goBack }: { goBack: () => void }) => {
	const [selected, setSelected] = useState<Tool | undefined>();

	const [activeTab, setActiveTab] = useState<Tab>('TileMap');

	return (
		<div
			style={{
				padding: '0 2rem',
				color: 'white',
				backgroundColor: 'rgba(0,0,0,.8)',
				width: 'max-content',
			}}
		>
			<IoIosArrowBack role="button" tabIndex={0} onClick={goBack} />
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
				<MapEditor
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					tool={selected}
					initialMap={testMap}
				/>

				{activeTab === 'TileMap' && (
					<ToolSelection selected={selected} setSelected={setSelected} />
				)}
			</div>
		</div>
	);
};
