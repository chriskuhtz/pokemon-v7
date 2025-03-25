import { useContext } from 'react';
import { getItemUrl } from '../../functions/getItemUrl';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { useCookingGrandma } from './hooks/useCookingGrandma';

export const CookingGradma = (): JSX.Element => {
	const { enabledRecipes, disabledRecipes, cook } = useCookingGrandma();
	const { saveFile } = useContext(SaveFileContext);
	const navigate = useNavigate();
	return (
		<Page
			headline="Cooking with Chef Grandma"
			goBack={() => navigate('CHEF_GRANDMA', 'OVERWORLD')}
		>
			<Stack mode="column">
				{enabledRecipes.map((recipe, index) => (
					<Card
						onClick={() => cook(recipe)}
						key={recipe.result + index}
						icon={<img src={getItemUrl(recipe.result)} />}
						content={
							<h3>
								Cook {recipe.result} ({recipe.difficulty} Recipe)
							</h3>
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
