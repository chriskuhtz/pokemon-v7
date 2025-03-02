import { JSX } from 'react';
import { Tool } from '../MapMaker';
import { tileMaps } from '../constants/tileMaps';
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
				{Object.entries(tileMaps).map(([name, t]) => (
					<TileMapViewer
						name={name}
						t={t}
						key={name}
						onClick={(tile) => setSelected({ type: 'tileplacer', tile })}
					/>
				))}
			</div>
		</div>
	);
};
