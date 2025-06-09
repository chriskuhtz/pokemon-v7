import { useMemo } from 'react';
import { TileIdentifier, TileMap } from '../../../interfaces/OverworldMap';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { FloatyMenu } from './FloatyMenu';
import { Tool } from './MapEditor';
import { Tile } from './Tile';

export const QuickSelection = ({
	tileMap,
	setSelected,
	tileSetUrl,
}: {
	tileMap: TileMap;
	setSelected: (x: Tool) => void;
	tileSetUrl: string;
}) => {
	const used = useMemo(() => {
		const res: TileIdentifier[] = [];

		[
			...tileMap.obstacleLayer,
			...tileMap.baseLayer,
			...tileMap.decorationLayer,
			...tileMap.encounterLayer,
			...tileMap.waterLayer,
			...tileMap.foregroundLayer,
		]
			.flat()
			.forEach((t) => {
				if (!t) {
					return;
				}
				if (
					res.every(
						(rt) => !(rt.xOffset === t.xOffset && rt.yOffset === t.yOffset)
					)
				) {
					res.push(t);
				}
			});

		return res;
	}, [tileMap]);

	return (
		<FloatyMenu top={256} left={window.innerWidth - 216}>
			<Stack mode="column">
				<strong>Used:</strong>
				<div
					style={{
						display: 'grid',
						gap: '.25rem',
						gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
						height: '50dvh',
						overflow: 'scroll',
					}}
				>
					{used.map((u) => (
						<div
							style={{ height: 32, width: 32 }}
							key={`x${u.xOffset}+y${u.yOffset}`}
						>
							<Tile
								scale={2}
								tile={u}
								onClick={() =>
									setSelected({ type: 'groupPlacer', tiles: [[u]] })
								}
								tileSetUrl={tileSetUrl}
							/>
						</div>
					))}
				</div>
			</Stack>
		</FloatyMenu>
	);
};
