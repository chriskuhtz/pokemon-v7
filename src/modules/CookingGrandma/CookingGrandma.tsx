import { useContext, useState } from 'react';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { ItemType } from '../../interfaces/Item';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { recipeChanceMap, useCookingGrandma } from './hooks/useCookingGrandma';

export const CookingGrandma = (): JSX.Element => {
	const { enabledRecipes, disabledRecipes, cook } = useCookingGrandma();
	const { saveFile } = useContext(SaveFileContext);
	const navigate = useNavigate();
	const [filter, setFilter] = useState<ItemType | undefined>('berry-juice');
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
					<strong>What should we cook:</strong>
					{[
						...new Set([
							...enabledRecipes.map((e) => e.result),
							...disabledRecipes.map((e) => e.result),
						]),
					].map((result) => (
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
							icon={<ItemSprite item={recipe.result} />}
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
									<p>Ingredients: {recipe.ingredients.join(', ')}</p>
								</div>
							}
							actionElements={recipe.ingredients.map((ing) => (
								<ItemSprite item={ing} />
							))}
						/>
					))}
				{disabledRecipes
					.filter((recipe) => {
						if (!filter) {
							return true;
						}
						return recipe.result === filter;
					})
					.map((recipe, index) => (
						<Card
							disabled
							icon={<ItemSprite item={recipe.result} grayscale />}
							key={recipe.result + index}
							content={
								<div>
									<h3>{recipe.result}</h3>
									<p>
										Missing Ingredients:{' '}
										{recipe.ingredients
											.filter((ing) => saveFile.bag[ing] <= 0)
											.join(', ')}
									</p>
								</div>
							}
							actionElements={recipe.ingredients.map((ing) => (
								<ItemSprite item={ing} grayscale={saveFile.bag[ing] <= 0} />
							))}
						/>
					))}
			</Stack>
		</Page>
	);
};
