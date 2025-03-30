import { useContext, useState } from 'react';
import { getItemUrl } from '../../functions/getItemUrl';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { recipeChanceMap, useCookingGrandma } from './hooks/useCookingGrandma';

export const CookingGrandma = (): JSX.Element => {
	const { enabledRecipes, disabledRecipes, cook } = useCookingGrandma();
	const { saveFile } = useContext(SaveFileContext);
	const navigate = useNavigate();
	const [filter, setFilter] = useState<string | undefined>();
	return (
		<Page
			headline="Cooking with Chef Grandma"
			goBack={() => navigate('CHEF_GRANDMA', 'OVERWORLD')}
		>
			<Stack mode="column">
				<strong>Cooking Skill:</strong>
				<AnimatedBar
					max={100}
					offset={Math.max(0, 100 - (saveFile.cookingSkill ?? 0))}
				/>
				<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
					<strong>Filter:</strong>
					{[...new Set(enabledRecipes.map((e) => e.result))].map((result) => (
						<button
							key={result}
							style={{
								color: filter === result ? 'white' : undefined,
								backgroundColor: filter === result ? 'black' : undefined,
							}}
							onClick={() => setFilter(result)}
						>
							{result}
						</button>
					))}
				</div>
				{enabledRecipes
					.filter((recipe) => {
						if (!filter) {
							return true;
						}
						return recipe.result === filter;
					})
					.map((recipe, index) => (
						<Card
							onClick={() => cook(recipe)}
							key={recipe.result + index}
							icon={<img src={getItemUrl(recipe.result)} />}
							content={
								<div>
									<h3>
										Cook {recipe.result} ({recipe.difficulty} Recipe)
									</h3>
									<strong>
										Chance of Success:{' '}
										<AnimatedBar
											max={100}
											offset={Math.max(
												0,
												100 -
													recipeChanceMap[recipe.difficulty] -
													(saveFile.cookingSkill ?? 0)
											)}
										/>
									</strong>
								</div>
							}
							actionElements={recipe.ingredients.map((ing) => (
								<img src={getItemUrl(ing)} />
							))}
						/>
					))}
				{disabledRecipes.map((recipe, index) => (
					<Card
						disabled
						icon={
							<img
								src={getItemUrl(recipe.result)}
								style={{ filter: 'grayscale(1)' }}
							/>
						}
						key={recipe.result + index}
						content={<h3>Missing ingredients for {recipe.result}</h3>}
						actionElements={recipe.ingredients.map((ing) => (
							<img
								src={getItemUrl(ing)}
								style={
									saveFile.bag[ing] <= 0
										? { filter: 'grayscale(1)' }
										: undefined
								}
							/>
						))}
					/>
				))}
			</Stack>
		</Page>
	);
};
