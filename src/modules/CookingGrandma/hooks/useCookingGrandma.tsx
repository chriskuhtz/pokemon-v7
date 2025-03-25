import { useCallback, useContext, useMemo } from 'react';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import { cookingBerries, ItemType } from '../../../interfaces/Item';

export interface Recipe {
	result: ItemType;
	ingredients: ItemType[];
	difficulty: 'EASY' | 'MEDIUM' | 'TRICKY';
}

const BASE_RECIPES: Recipe[] = [
	{
		result: 'old-gateau',
		ingredients: ['nanab-berry', 'bluk-berry', 'razz-berry'],
		difficulty: 'MEDIUM',
	},
	{
		result: 'energy-powder',
		ingredients: ['wepear-berry', 'pinap-berry'],
		difficulty: 'EASY',
	},
	{
		result: 'energy-powder',
		ingredients: ['cornn-berry', 'rabuta-berry'],
		difficulty: 'EASY',
	},
	{
		result: 'energy-powder',
		ingredients: ['nomel-berry', 'magost-berry'],
		difficulty: 'EASY',
	},
	{
		result: 'heal-powder',
		ingredients: ['spelon-berry', 'durin-berry'],
		difficulty: 'MEDIUM',
	},
	{
		result: 'heal-powder',
		ingredients: ['watmel-berry', 'pamtre-berry', 'belue-berry'],
		difficulty: 'EASY',
	},
	{
		result: 'rare-candy',
		ingredients: [
			'sitrus-berry',
			'leppa-berry',
			'lum-berry',
			'nanab-berry',
			'bluk-berry',
		],
		difficulty: 'TRICKY',
	},
	{
		result: 'rare-candy',
		ingredients: [
			'silver-razz-berry',
			'silver-nanab-berry',
			'silver-pinap-berry',
		],
		difficulty: 'MEDIUM',
	},
	{
		result: 'rare-candy',
		ingredients: [
			'golden-razz-berry',
			'golden-nanab-berry',
			'golden-pinap-berry',
		],
		difficulty: 'EASY',
	},
	...cookingBerries.map(
		(c) =>
			({
				result: 'berry-juice',
				ingredients: ['oran-berry', c],
				difficulty: 'EASY',
			} as Recipe)
	),
];

export const useCookingGrandma = (): {
	enabledRecipes: Recipe[];
	disabledRecipes: Recipe[];
	cook: (x: Recipe) => void;
} => {
	const { addMessage, addMultipleMessages } = useContext(MessageQueueContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const enabledRecipes = useMemo(
		() =>
			BASE_RECIPES.filter((b) =>
				b.ingredients.every((ing) => saveFile.bag[ing] > 0)
			),
		[saveFile.bag]
	);
	const disabledRecipes = useMemo(
		() =>
			BASE_RECIPES.filter((b) =>
				b.ingredients.some((ing) => saveFile.bag[ing] <= 0)
			),
		[saveFile.bag]
	);
	const cook = useCallback(
		(recipe: Recipe) => {
			const usedIngredients = Object.fromEntries(
				recipe.ingredients.map((ing) => [ing, -1])
			);
			const failed = () => {
				if (recipe.difficulty === 'EASY' && Math.random() > 0.9) {
					return true;
				}
				if (recipe.difficulty === 'MEDIUM' && Math.random() > 0.75) {
					return true;
				}
				if (recipe.difficulty === 'TRICKY' && Math.random() > 0.6) {
					return true;
				}
				return false;
			};
			if (failed()) {
				addMessage({ message: 'Oh no, these ingredients got burned' });
				patchSaveFileReducer({
					bag: joinInventories(saveFile.bag, usedIngredients),
				});
			} else {
				addMultipleMessages([
					{ message: 'Excellent work, chef' },
					{ message: `received 1 ${recipe.result}` },
				]);
				patchSaveFileReducer({
					bag: joinInventories(saveFile.bag, {
						...usedIngredients,
						[recipe.result]: 1,
					}),
					mileStones: {
						...saveFile.mileStones,
						cookedEasyRecipe:
							recipe.difficulty === 'EASY'
								? true
								: saveFile.mileStones.cookedEasyRecipe,
						cookedMediumRecipe:
							recipe.difficulty === 'MEDIUM'
								? true
								: saveFile.mileStones.cookedMediumRecipe,
						cookedTrickyRecipe:
							recipe.difficulty === 'TRICKY'
								? true
								: saveFile.mileStones.cookedTrickyRecipe,
					},
				});
			}
		},
		[
			addMessage,
			addMultipleMessages,
			patchSaveFileReducer,
			saveFile.bag,
			saveFile.mileStones,
		]
	);

	return { enabledRecipes, disabledRecipes, cook };
};
