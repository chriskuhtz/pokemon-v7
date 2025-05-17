import { JSX } from 'react';
import { tileMapsRecord } from '../constants/tileMaps';
import { Tool, TwoByTwoGroup } from '../MapMaker';
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
		<div style={{ display: 'flex', padding: '1rem' }}>
			<div
				style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}
			>
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
				</button>
				{selected?.type === 'twoByTwoPlacer' && (
					<>
						<CoordinateSelector
							selected={selected}
							setSelected={setSelected}
							tileIndex={1}
						/>
						<CoordinateSelector
							selected={selected}
							setSelected={setSelected}
							tileIndex={2}
						/>
						<CoordinateSelector
							selected={selected}
							setSelected={setSelected}
							tileIndex={3}
						/>
						<CoordinateSelector
							selected={selected}
							setSelected={setSelected}
							tileIndex={4}
						/>
					</>
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
}: {
	selected: TwoByTwoGroup;
	setSelected: (x: TwoByTwoGroup) => void;
	tileIndex: number;
}) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			Tile {tileIndex}:
			<input
				style={{ width: '64px' }}
				min={0}
				type="number"
				//@ts-expect-error it exists
				value={selected[`tile${tileIndex}`].xOffset / -16}
				onChange={(e) =>
					setSelected({
						...selected,
						[`tile${tileIndex}`]: {
							//@ts-expect-error it exists
							...selected[`tile${tileIndex}`],
							xOffset: Number(e.target.value) * -16,
						},
					})
				}
			/>
			<input
				style={{ width: '64px' }}
				min={0}
				type="number"
				//@ts-expect-error it exists
				value={selected[`tile${tileIndex}`].yOffset / -16}
				onChange={(e) =>
					setSelected({
						...selected,
						[`tile${tileIndex}`]: {
							//@ts-expect-error it exists
							...selected[`tile${tileIndex}`],
							yOffset: Number(e.target.value) * -16,
						},
					})
				}
			/>
		</div>
	);
};
