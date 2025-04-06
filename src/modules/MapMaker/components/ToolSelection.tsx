import { JSX } from 'react';
import { tileMapsRecord } from '../constants/tileMaps';
import { Tool } from '../MapMaker';
import { TileMapViewer } from './TileMapViewer';

export const ToolSelection = ({
	setSelected,
	tileSetUrl,
}: {
	setSelected: (x: Tool) => void;
	tileSetUrl: string;
}): JSX.Element => {
	return (
		<div style={{ display: 'flex', padding: '1rem' }}>
			<button
				style={{
					margin: '1rem',
					padding: '1rem',
					color: 'white',
					height: 'min-content',
				}}
				onClick={() => setSelected({ type: 'eraser' })}
			>
				Eraser
			</button>
			<div style={{ maxHeight: '80dvh', overflowY: 'scroll' }}>
				<TileMapViewer
					name={tileSetUrl}
					t={tileMapsRecord[tileSetUrl]}
					onClick={(tile) => setSelected({ type: 'tileplacer', tile })}
				/>
			</div>
		</div>
	);
};
