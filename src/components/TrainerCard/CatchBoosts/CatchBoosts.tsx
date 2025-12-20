import React, { useContext } from 'react';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { SaveFileContext } from '../../hooks/useSaveFile';

export const CatchBoosts = (): JSX.Element => {
	const {
		saveFile: { catchBoosts },
	} = useContext(SaveFileContext);
	return catchBoosts ? (
		<div>
			<h4>Catch Boosts:</h4>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr',
					gap: '1rem',
				}}
			>
				{Object.entries(catchBoosts).map(([type, boost]) => {
					if (boost === 0) {
						return <React.Fragment key={type}></React.Fragment>;
					}
					return (
						<strong
							key={type}
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<img
								height={battleSpriteSize / 1.5}
								src={`/typeIcons/${type}.png`}
							/>
							:{(boost * 0.1).toPrecision(1)}
						</strong>
					);
				})}
			</div>
		</div>
	) : (
		<></>
	);
};
