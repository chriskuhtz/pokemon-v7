import React from 'react';
import { FaSave } from 'react-icons/fa';
import { RiDeleteRow, RiInsertRowBottom } from 'react-icons/ri';
import { TbColumnInsertRight, TbColumnRemove } from 'react-icons/tb';
import { battleSpriteSize } from '../../../constants/gameData';
import { numberToGridTemplateColumns } from '../../../functions/numberToGridTemplateColumns';
import { CoordinateSelector } from './CoordinateSelector';
import { GroupPlacer, Tool } from './MapEditor';

export const GroupSelection = ({
	selected,
	addSnippet,
	setSelected,
	tileSetUrl,
}: {
	selected: Tool | undefined;
	addSnippet: (update: GroupPlacer) => void;
	setSelected: (x: Tool) => void;
	tileSetUrl: string;
}) => {
	if (selected?.type !== 'groupPlacer') {
		return (
			<React.Fragment>
				<h3>Selected:</h3>
				<strong
					style={{ cursor: 'pointer' }}
					onClick={() =>
						setSelected({
							type: 'groupPlacer',
							tiles: [[{ xOffset: 0, yOffset: 0 }]],
						})
					}
				>
					Choose Tiles
				</strong>
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
			<h3 style={{ color: 'green' }}>Selected:</h3>
			<div
				style={{ height: 'min-content', cursor: '-webkit-grab' }}
				onClick={() => addSnippet(selected)}
			>
				<FaSave /> Snippet
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr',
					gridTemplateRows: '1fr auto 1fr',
					alignItems: 'center',
					justifyItems: 'center',
				}}
			>
				<span></span>
				<RiDeleteRow
					size={battleSpriteSize}
					onClick={() => {
						if (selected.tiles.length === 1) {
							return;
						}
						setSelected({
							...selected,
							tiles: selected.tiles.slice(0, -1),
						});
					}}
				/>
				<span></span>
				<TbColumnRemove
					size={battleSpriteSize}
					onClick={() => {
						if (selected.tiles[0].length === 1) {
							return;
						}
						setSelected({
							...selected,
							tiles: selected.tiles.map((row) => row.slice(0, -1)),
						});
					}}
				/>
				<div
					style={{
						display: 'grid',
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
				<TbColumnInsertRight
					size={battleSpriteSize}
					onClick={() =>
						setSelected({
							...selected,
							tiles: selected.tiles.map((row) => [
								...row,
								{ xOffset: 0, yOffset: 0 },
							]),
						})
					}
				/>
				<span></span>
				<RiInsertRowBottom
					size={battleSpriteSize}
					onClick={() =>
						setSelected({
							...selected,
							tiles: [...selected.tiles, selected.tiles[0]],
						})
					}
				/>
				<span></span>
			</div>
		</React.Fragment>
	);
};
