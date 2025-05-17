import { JSX, useState } from 'react';
import { numberToGridTemplateColumns } from '../../../functions/numberToGridTemplateColumns';
import { Modal } from '../../../uiComponents/Modal/Modal';
import { tileMapsRecord } from '../constants/tileMaps';
import { GroupPlacer, TileGroupDisplay, Tool } from '../MapMaker';
import { TileMapViewer } from './TileMapViewer';

export const ToolSelection = ({
	selected,
	setSelected,
	tileSetUrl,
}: {
	selected: Tool | undefined;
	setSelected: (x: Tool) => void;
	tileSetUrl: string;
}): JSX.Element => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'stretch',
				gap: '2rem',
				padding: '1rem',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					padding: '1rem',
				}}
			>
				<button
					style={{
						margin: '1rem',
						padding: '1rem',
						color: 'white',
						height: 'min-content',
						display: 'flex',
						gap: '1rem',
						alignItems: 'center',
						backgroundColor:
							selected?.type === 'tileplacer' ? 'green' : undefined,
					}}
					onClick={() =>
						setSelected({
							type: 'tileplacer',
							tile: { xOffset: 0, yOffset: 0 },
						})
					}
				>
					Tile Selection
					{selected?.type === 'tileplacer' && (
						<div
							style={{
								scale: 2,
								height: 16,
								width: 16,
								background: `url(${tileSetUrl}) ${selected.tile.xOffset}px ${selected.tile.yOffset}px`,
							}}
						/>
					)}
				</button>
				<button
					style={{
						margin: '1rem',
						padding: '1rem',
						color: 'white',
						height: 'min-content',
						backgroundColor: selected?.type === 'eraser' ? 'green' : undefined,
					}}
					onClick={() => setSelected({ type: 'eraser' })}
				>
					Eraser
				</button>
				<button
					style={{
						margin: '1rem',
						padding: '1rem',
						color: 'white',
						height: 'min-content',
						display: 'flex',
						gap: '1rem',
						alignItems: 'center',
						backgroundColor:
							selected?.type === 'groupPlacer' ? 'green' : undefined,
					}}
					onClick={() =>
						setSelected({
							type: 'groupPlacer',
							tiles: [
								[
									{ xOffset: 0, yOffset: 0 },
									{ xOffset: -16, yOffset: 0 },
								],
								[
									{ xOffset: 0, yOffset: -16 },
									{ xOffset: -16, yOffset: -16 },
								],
							],
						})
					}
				>
					Group Placer
					{selected?.type === 'groupPlacer' && (
						<TileGroupDisplay tileSetUrl={tileSetUrl} selected={selected} />
					)}
				</button>
				{selected?.type === 'groupPlacer' && (
					<div>
						<button
							onClick={() =>
								setSelected({
									...selected,
									tiles: [...selected.tiles, selected.tiles[0]],
								})
							}
						>
							Add Row
						</button>
						<button
							disabled={selected.tiles.length === 1}
							onClick={() =>
								setSelected({
									...selected,
									tiles: selected.tiles.slice(0, -1),
								})
							}
						>
							Remove Row
						</button>
						<button
							onClick={() =>
								setSelected({
									...selected,
									tiles: selected.tiles.map((row) => [
										...row,
										{ xOffset: 0, yOffset: 0 },
									]),
								})
							}
						>
							Add Col
						</button>
						<button
							disabled={selected.tiles[0].length === 1}
							onClick={() =>
								setSelected({
									...selected,
									tiles: selected.tiles.map((row) => row.slice(0, -1)),
								})
							}
						>
							Remove Col
						</button>
						<div
							style={{
								display: 'grid',
								gap: '.5rem',
								gridTemplateColumns: numberToGridTemplateColumns(
									selected.tiles[0].length
								),
							}}
						>
							{selected.tiles.map((row, rowIndex) => {
								return row.map((_, colIndex) => (
									<CoordinateSelector
										key={`${rowIndex}+${colIndex}`}
										selected={selected}
										setSelected={setSelected}
										rowIndex={rowIndex}
										colIndex={colIndex}
										tileSetUrl={tileSetUrl}
									/>
								));
							})}
						</div>
					</div>
				)}
			</div>
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

const CoordinateSelector = ({
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
	return (
		<div>
			<h3 style={{ display: 'flex' }} onClick={() => setOpen(!open)}>
				<div
					style={{
						scale: 2,
						height: 16,
						width: 16,
						background: `url(${tileSetUrl}) ${t.xOffset}px ${t.yOffset}px`,
					}}
				/>{' '}
				{rowIndex}/{colIndex}:
			</h3>
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
							onClick={(tile) => {
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
							}}
						/>
					</div>
				</Modal>
			)}
		</div>
	);
};
