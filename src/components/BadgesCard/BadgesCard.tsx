import { useContext } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { Stack } from '../../uiComponents/Stack/Stack';

export const BadgesCard = () => {
	const {
		saveFile: { badges },
	} = useContext(SaveFileContext);

	if (badges.length === 0) {
		return <></>;
	}
	return (
		<Card
			actionElements={[]}
			icon={<h3>Badges:</h3>}
			content={
				<Stack mode="row">
					{badges.map((b) => (
						<img
							height={battleSpriteSize}
							width={battleSpriteSize}
							src={`/badges/${b}.png`}
						/>
					))}
				</Stack>
			}
		/>
	);
};
