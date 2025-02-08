import { baseSize } from '../../constants/gameData';

export const IconSolarSystem = ({
	sunUrl,
	firstPlanetUrl,
	secondPlanetUrl,
	thirdPlanetUrl,
	onClick,
}: {
	sunUrl: string;
	firstPlanetUrl: string;
	secondPlanetUrl?: string;
	thirdPlanetUrl?: string;
	onClick?: () => void;
}) => {
	return (
		<div
			role={onClick ? 'button' : undefined}
			onClick={onClick}
			style={{
				width: `${baseSize * 1.5}px`,
				position: 'relative',
			}}
		>
			<img
				style={{ border: '2px solid black', borderRadius: '9000px' }}
				src={sunUrl}
			/>
			<img
				style={{
					position: 'absolute',
					top: `${-baseSize / 6}px`,
					left: `${baseSize / 2}px`,
				}}
				height={baseSize / 2}
				width={baseSize / 2}
				src={firstPlanetUrl}
			/>

			{secondPlanetUrl && (
				<img
					style={{
						position: 'absolute',
						top: `${baseSize / 16}px`,
						right: `${-baseSize / 16}px`,
					}}
					height={baseSize / 2}
					width={baseSize / 2}
					src={secondPlanetUrl}
				/>
			)}

			{thirdPlanetUrl && (
				<img
					style={{
						position: 'absolute',
						top: `${baseSize / 2}px`,
						right: `${-baseSize / 4}px`,
					}}
					height={baseSize / 2}
					width={baseSize / 2}
					src={thirdPlanetUrl}
				/>
			)}
		</div>
	);
};
