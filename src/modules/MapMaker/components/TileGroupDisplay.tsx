import { GroupPlacer } from './MapEditor';

export const TileGroupDisplay = ({
	selected,
	tileSetUrl,
}: {
	selected: GroupPlacer;
	tileSetUrl: string;
}) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: Array.from({ length: selected.tiles[0].length })
					.map(() => '1fr')
					.join(' '),
				width: 'min-content',
			}}
		>
			{selected.tiles.flat(1).map((t, i) => (
				<div
					key={t.xOffset + t.yOffset + i}
					style={{
						scale: 2,
						height: 16,
						width: 16,
						background: `url(${tileSetUrl}) ${t.xOffset}px ${t.yOffset}px`,
					}}
				/>
			))}
		</div>
	);
};
