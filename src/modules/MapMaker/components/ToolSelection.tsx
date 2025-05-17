import { JSX, useState } from 'react';
import { tileMapsRecord } from '../constants/tileMaps';
import { TileGroupDisplay, Tool, TwoByTwoGroup } from '../MapMaker';
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
					}}
					onClick={() =>
						setSelected({
							type: 'twoByTwoPlacer',
							tile1: { xOffset: 0, yOffset: 0 },
							tile2: { xOffset: -16, yOffset: 0 },
							tile3: { xOffset: 0, yOffset: -16 },
							tile4: { xOffset: -16, yOffset: -16 },
						})
					}
				>
					Group Placer
					{selected?.type === 'twoByTwoPlacer' && (
						<TileGroupDisplay tileSetUrl={tileSetUrl} selected={selected} />
					)}
				</button>
				{selected?.type === 'twoByTwoPlacer' && (
					<div>
						<CoordinateSelector
							selected={selected}
							setSelected={setSelected}
							tileIndex={1}
							tileSetUrl={tileSetUrl}
						/>
						<CoordinateSelector
							selected={selected}
							setSelected={setSelected}
							tileIndex={2}
							tileSetUrl={tileSetUrl}
						/>
						<CoordinateSelector
							selected={selected}
							setSelected={setSelected}
							tileIndex={3}
							tileSetUrl={tileSetUrl}
						/>
						<CoordinateSelector
							selected={selected}
							setSelected={setSelected}
							tileIndex={4}
							tileSetUrl={tileSetUrl}
						/>
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
	tileIndex,
	tileSetUrl,
}: {
	selected: TwoByTwoGroup;
	setSelected: (x: TwoByTwoGroup) => void;
	tileIndex: number;
	tileSetUrl: string;
}) => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<div>
			<h3 onClick={() => setOpen(!open)}>Tile {tileIndex}:</h3>
			{open && (
				<div style={{ maxHeight: '80dvh', overflowY: 'scroll' }}>
					<TileMapViewer
						name={tileSetUrl}
						t={tileMapsRecord[tileSetUrl]}
						onClick={(tile) =>
							setSelected({
								...selected,
								[`tile${tileIndex}`]: tile,
							})
						}
					/>
				</div>
			)}
		</div>
	);
};
