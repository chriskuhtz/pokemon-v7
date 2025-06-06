import { JSX, useState } from 'react';
import { FaEraser } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { numberToGridTemplateColumns } from '../../../functions/numberToGridTemplateColumns';
import { Modal } from '../../../uiComponents/Modal/Modal';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { tileMapsRecord } from '../constants/tileMaps';
import { useSnippets } from '../hooks/useSnippets';
import { GroupPlacer, Tool } from '../MapMaker';
import { TileGroupDisplay } from './TileGroupDisplay';
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
	const { snippets, addSnippet, removeSnippet } = useSnippets();

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '3fr 3fr 1fr',
				justifyContent: 'stretch',
				gap: '2rem',
				padding: '1rem',
				borderBottom: '2px solid white',
			}}
		>
			<div>
				<h3>Tile Placer:</h3>

				<button
					style={{
						margin: '1rem',
						padding: '1rem',
						color: 'white',
						display: 'flex',
						gap: '1rem',
						alignItems: 'center',
						backgroundColor:
							selected?.type === 'groupPlacer' ? 'green' : undefined,
					}}
					onClick={() =>
						setSelected({
							type: 'groupPlacer',
							tiles: [[{ xOffset: 0, yOffset: 0 }]],
						})
					}
				>
					{selected?.type === 'groupPlacer' ? 'Current' : 'Choose Tiles'}
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
						<button
							style={{ height: 'min-content' }}
							onClick={() =>
								selected?.type === 'groupPlacer' ? addSnippet(selected) : {}
							}
						>
							Save as New Snippet
						</button>
					</div>
				)}
			</div>
			<SnippetSelection
				remove={removeSnippet}
				selectSnippet={setSelected}
				tileSetUrl={tileSetUrl}
				snippets={snippets}
			/>
			<div>
				<h3>Other tools</h3>
				<button
					style={{
						margin: '1rem',
						padding: '1rem',
						color: 'white',
						height: 'min-content',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '2rem',
						backgroundColor: selected?.type === 'eraser' ? 'green' : undefined,
					}}
					onClick={() => setSelected({ type: 'eraser' })}
				>
					<FaEraser size={32} />
					Eraser
				</button>
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

export const SnippetSelection = ({
	tileSetUrl,
	snippets,
	selectSnippet,
	remove,
}: {
	tileSetUrl: string;
	snippets: { id: string; snippet: GroupPlacer }[];
	selectSnippet: (x: GroupPlacer) => void;
	remove: (id: string) => void;
}) => {
	return (
		<div>
			<h3>Snippets:</h3>
			<Stack mode="row">
				{snippets.map((s) => (
					<button
						style={{ display: 'flex', gap: '.5rem' }}
						onClick={() => selectSnippet(s.snippet)}
					>
						<TileGroupDisplay tileSetUrl={tileSetUrl} selected={s.snippet} />
						<MdDelete
							size={32}
							onClick={(e) => {
								e.stopPropagation();
								remove(s.id);
							}}
						/>
					</button>
				))}
			</Stack>
		</div>
	);
};
