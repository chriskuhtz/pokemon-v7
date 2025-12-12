import { TileIdentifier } from '../../../interfaces/TileMap';
import { TileSet } from '../constants/tileMaps';
export const TileMapViewer = ({
	name,
	t,
	onClick,
}: {
	name: string;
	t: TileSet;
	onClick: (x: TileIdentifier) => void;
}) => {
	return (
		<div
			key={name}
			style={{
				width: 'min-content',
				display: 'grid',
				justifyItems: 'flex-start',
				gridTemplateColumns: `${Array.from({ length: t.width })
					.map(() => '1fr')
					.join(' ')}`,
				gap: '2px',
			}}
		>
			{Array.from({ length: t.height }).map((_, h) =>
				Array.from({ length: t.width }).map((_, w) => {
					const xOffset = -t.gap - (t.gap + 16) * w;
					const yOffset = -t.gap - (t.gap + 16) * h;
					return (
						<div
							onClick={() => onClick({ yOffset, xOffset })}
							key={name + h + w}
							style={{
								height: 16,
								width: 16,
								background: `${t.src} ${xOffset}px ${yOffset}px`,
							}}
						></div>
					);
				})
			)}
		</div>
	);
};
