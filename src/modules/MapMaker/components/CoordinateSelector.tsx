import { useCallback, useState } from 'react';
import { TileIdentifier } from '../../../interfaces/OverworldMap';
import { Modal } from '../../../uiComponents/Modal/Modal';
import { tileMapsRecord } from '../constants/tileMaps';
import { GroupPlacer } from './MapEditor';
import { Tile } from './Tile';
import { TileMapViewer } from './TileMapViewer';
export const CoordinateSelector = ({
	selected,
	setSelected,
	rowIndex,
	colIndex,
	tileSetUrl,
}: {
	selected: GroupPlacer;
	setSelected: (x: GroupPlacer) => void;
	rowIndex: number;
	colIndex: number;
	tileSetUrl: string;
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const t = selected.tiles[rowIndex][colIndex];

	const chooseTile = useCallback(
		(tile: TileIdentifier) => {
			setOpen(false);
			setSelected({
				...selected,
				tiles: selected.tiles.map((row, r) => {
					if (r === rowIndex) {
						return row.map((col, c) => {
							if (c === colIndex) {
								return tile;
							}
							return col;
						});
					}

					return row;
				}),
			});
		},
		[colIndex, rowIndex, selected, setSelected]
	);

	return (
		<div style={{ height: 32, width: 32 }}>
			<Tile
				scale={2}
				tile={t}
				tileSetUrl={tileSetUrl}
				onClick={() => setOpen(true)}
			/>
			{open && (
				<Modal open={open} close={() => setOpen(false)}>
					<div
						style={{
							maxHeight: '80dvh',
							overflowY: 'scroll',
							backgroundColor: 'black',
						}}
					>
						<TileMapViewer
							name={tileSetUrl}
							t={tileMapsRecord[tileSetUrl]}
							onClick={chooseTile}
						/>
					</div>
				</Modal>
			)}
		</div>
	);
};
