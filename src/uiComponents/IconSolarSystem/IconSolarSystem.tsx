import { CSSProperties } from 'react';
import { baseSize } from '../../constants/gameData';

export const IconSolarSystem = ({
	sun,
	firstPlanetUrl,
	secondPlanetUrl,
	thirdPlanetUrl,
	fourthPlanetUrl,
	fifthPlanetUrl,
	onClick,
}: {
	sun: { url: string; styles?: CSSProperties };
	firstPlanetUrl?: string;
	secondPlanetUrl?: string;
	thirdPlanetUrl?: string;
	fourthPlanetUrl?: string;
	fifthPlanetUrl?: string;
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
				style={{
					...sun.styles,
					border: '2px solid black',
					borderRadius: '9000px',
				}}
				src={sun.url}
			/>
			{firstPlanetUrl && (
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
			)}

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
			{fourthPlanetUrl && (
				<img
					style={{
						position: 'absolute',
						top: `${baseSize}px`,
						right: `${-baseSize / 16}px`,
					}}
					height={baseSize / 2}
					width={baseSize / 2}
					src={fourthPlanetUrl}
				/>
			)}
			{fifthPlanetUrl && (
				<img
					style={{
						position: 'absolute',
						top: `${(baseSize * 7.5) / 6}px`,
						left: `${baseSize / 2}px`,
					}}
					height={baseSize / 2}
					width={baseSize / 2}
					src={fifthPlanetUrl}
				/>
			)}
		</div>
	);
};
