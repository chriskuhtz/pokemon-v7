import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
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

export const MapMaker = ({ goBack }: { goBack: () => void }) => {
	const [selected, setSelected] = useState<Tool | undefined>();

	return (
		<div
			style={{
				padding: '0 2rem',
				color: 'white',
				backgroundColor: 'rgba(0,0,0,.8)',
			}}
		>
			<IoIosArrowBack role="button" tabIndex={0} onClick={goBack} />
			<div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}>
				<MapEditor tool={selected} />

				<ToolSelection selected={selected} setSelected={setSelected} />
			</div>
		</div>
	);
};
