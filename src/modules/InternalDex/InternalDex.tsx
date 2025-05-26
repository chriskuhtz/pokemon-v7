import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { battleSpriteSize } from '../../constants/gameData';
import { isNotCatchable } from '../../constants/internalDex';
import { internalDex, InternalDexEntry } from '../../constants/internalDexData';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { replaceRouteName } from '../../functions/replaceRouteName';
import { useNavigate } from '../../hooks/useNavigate';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const InternalDex = (): JSX.Element => {
	const [searchString, setSearchString] = useState<string>('');
	const navigate = useNavigate();

	return (
		<Page
			headline="Internal Dex"
			goBack={() => navigate('INTERNAL_DEX', 'MAIN')}
		>
			<Stack mode="column">
				<Card
					icon={<FaSearch size={battleSpriteSize} />}
					content={
						<input
							value={searchString}
							onChange={(e) => setSearchString(e.target.value.toLowerCase())}
						/>
					}
					actionElements={[]}
				/>
				{Object.entries(internalDex).map(([key, entry]) => {
					if (!key.includes(searchString)) {
						return <React.Fragment key={key}></React.Fragment>;
					}
					return (
						<Card
							key={key}
							icon={
								<h3>
									{entry.dexId}:{key}
								</h3>
							}
							actionElements={[]}
							content={<InternalDexCardContent entry={entry} />}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};

export const InternalDexCardContent = ({
	entry,
}: {
	entry: InternalDexEntry;
}): JSX.Element => {
	if (isNotCatchable(entry)) {
		return <h4>Not Catchable</h4>;
	}
	return (
		<div>
			<h4>Catchable at:</h4>
			<Stack mode={'column'}>
				{entry.berryLureMapId && <h5> berry lure {entry.berryLureMapId}</h5>}
				{entry.honey && <h5> honey trees</h5>}
				{entry.underRock && <h5> smashable rocks</h5>}
				{entry.swarm && <h5> swarm type: {entry.swarm}</h5>}
				{entry.rampager && <h5> Rampaging</h5>}
				{entry.encounterOptions.map((op) => (
					<h5 key={op.route}>
						{replaceRouteName(op.route)} | Time: {op.timeOfDay} | Biome:{' '}
						{op.area} | between lvl {calculateLevelData(op.minXp, 'fast').level}{' '}
						and {calculateLevelData(op.maxXp, 'fast').level} | rarity:{' '}
						{op.rarity}
					</h5>
				))}
			</Stack>
		</div>
	);
};
