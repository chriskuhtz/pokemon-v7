import { useFetch } from '@potfisch-industries-npm/usefetch';
import { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { GoLightBulb } from 'react-icons/go';
import { abilityNames } from '../../constants/abilityCheckList';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { handledMoves } from '../../constants/movesCheckList';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { itemTypes } from '../../interfaces/Item';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Wiki = () => {
	const { setActiveTabReducer } = useContext(SaveFileContext);

	const [targetUrl, setTargetUrl] = useState<string | undefined>();
	const [searchString, setSearchString] = useState<string>('');

	const { res, invalidate } = useFetch(async () => {
		if (targetUrl) {
			return (await fetch(targetUrl)).json();
		}
	});

	return (
		<Page goBack={() => setActiveTabReducer('MAIN')} headline="Wiki:">
			<Stack mode="column">
				{res && (
					<Card
						icon={<GoLightBulb size={battleSpriteSize} />}
						content={
							<h3>
								{res['effect_entries'].length > 0
									? res['effect_entries'][0]['short_effect']
									: 'No Description available'}
							</h3>
						}
						actionElements={[]}
					/>
				)}
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
				{handledMoves
					.filter((m) => m.includes(searchString))
					.map((m) => (
						<Card
							key={m}
							actionElements={[]}
							icon={<strong>Move</strong>}
							content={<strong>{m}</strong>}
							onClick={() => {
								invalidate();
								setTargetUrl(`https://pokeapi.co/api/v2/move/${m}`);
							}}
						/>
					))}
				{[...new Set(itemTypes)]
					.filter((m) => m.includes(searchString))
					.map((i) => (
						<Card
							key={i}
							actionElements={[]}
							icon={<strong>Item</strong>}
							content={<strong>{i}</strong>}
							onClick={() => {
								invalidate();
								setTargetUrl(`https://pokeapi.co/api/v2/item/${i}`);
							}}
						/>
					))}
				{abilityNames
					.filter((m) => m.includes(searchString))
					.map((a) => (
						<Card
							key={a}
							actionElements={[]}
							icon={<strong>Ability</strong>}
							content={<strong>{a}</strong>}
							onClick={() => {
								invalidate();
								setTargetUrl(`https://pokeapi.co/api/v2/ability/${a}`);
							}}
						/>
					))}
			</Stack>
		</Page>
	);
};
