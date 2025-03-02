import { JSX } from 'react';
import { masterSheet } from '../constants/tileMaps';
import { Tool } from '../MapMaker';
import { TileMapViewer } from './TileMapViewer';

export const ToolSelection = ({
	setSelected,
}: {
	setSelected: (x: Tool) => void;
}): JSX.Element => {
	return (
		<div>
			<button
				style={{ margin: '1rem', padding: '1rem', color: 'white' }}
				onClick={() => setSelected({ type: 'eraser' })}
			>
				Eraser
			</button>
			<div style={{ maxHeight: '80dvh', overflowY: 'scroll' }}>
				<TileMapViewer
					name={'mastersheet'}
					t={masterSheet}
					onClick={(tile) => setSelected({ type: 'tileplacer', tile })}
				/>
			</div>
		</div>
	);
};
