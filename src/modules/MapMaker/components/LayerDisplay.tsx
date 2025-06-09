import React from 'react';
import { CombinedCanvas } from '../../../components/CombinedCanvas/CombinedCanvas';
import {
	TileIdentifier,
	TileMap,
	Occupant,
} from '../../../interfaces/OverworldMap';
import { useDrawOccupants } from '../../Overworld/hooks/useDrawOccupants';
import { LayerName } from '../hooks/useMapEditor';

export const LayerDisplay = ({
	layerName,
	layer,
	changeTile,
	changeColumn,
	changeRow,
	tileSetUrl,
	tileMap,
	occupants,
	opacity,
}: {
	layerName: LayerName;
	layer: (TileIdentifier | null)[][];
	changeTile: (i: number, j: number, layer: LayerName) => void;
	changeColumn: (i: number, layer: LayerName) => void;
	changeRow: (i: number, layer: LayerName) => void;
	tileSetUrl: string;
	tileMap: TileMap;
	occupants: Occupant[];
	opacity: number;
}) => {
	useDrawOccupants('occs', occupants, 16);

	return (
		<div
			style={{
				position: 'relative',
				width: 'min-content',
				display: 'grid',
				justifyItems: 'flex-start',
				gridTemplateColumns: `${Array.from({
					length: layer[0].length + 1,
				})
					.map(() => '1fr')
					.join(' ')}`,
			}}
		>
			<span />
			{Array.from({ length: layer[0].length }).map((_, i) => (
				<div
					style={{
						height: 16,
						width: 16,
						outline: '1px solid orange',
						fontSize: 'small',
					}}
					key={'column' + i}
					role={'button'}
					onClick={() => changeColumn(i, layerName)}
				>
					{i}
				</div>
			))}

			{layer.map((row, i) => (
				<React.Fragment key={'row' + i}>
					<div
						style={{ height: 16, fontSize: 'small' }}
						role={'button'}
						onClick={() => changeRow(i, layerName)}
					>
						{i}
					</div>
					{row.map((el, j) => {
						const { yOffset, xOffset } = el ?? {};
						return (
							<div
								onClick={() => changeTile(i, j, layerName)}
								key={'newMap' + Math.random()}
								style={{
									height: 16,
									width: 16,
									outline: '1px solid red',
									background: `url(${tileSetUrl}) ${xOffset}px ${yOffset}px`,
								}}
							></div>
						);
					})}
				</React.Fragment>
			))}

			<canvas
				style={{
					pointerEvents: 'none',
					top: 16,
					left: 16,
					zIndex: 1,
					position: 'absolute',
				}}
				id={'occs'}
				height={layer.length * 16}
				width={layer[0].length * 16}
			/>

			<div
				style={{
					pointerEvents: 'none',
					position: 'absolute',

					top: 16,
					left: 16,
				}}
			>
				<CombinedCanvas
					style={{ opacity }}
					map={tileMap}
					tileSize={16}
					tileSetUrl={tileSetUrl}
				/>
			</div>
		</div>
	);
};
