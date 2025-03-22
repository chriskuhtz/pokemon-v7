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
		result: 'lava-cookie',
		ingredients: ['nanab-berry', 'bluk-berry', 'razz-berry'],
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
	...cookingBerries.map(
		(c) =>
			({
				result: 'lava-cookie',
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
				b.ingredients.every((ing) => saveFile.inventory[ing] > 0)
			),
		[saveFile.inventory]
	);
	const disabledRecipes = useMemo(
		() =>
			BASE_RECIPES.filter((b) =>
				b.ingredients.some((ing) => saveFile.inventory[ing] <= 0)
			),
		[saveFile.inventory]
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
				if (recipe.difficulty === 'MEDIUM' && Math.random() > 0.66) {
					return true;
				}
				if (recipe.difficulty === 'TRICKY' && Math.random() > 0.33) {
					return true;
				}
				return false;
			};
			if (failed()) {
				addMessage({ message: 'Oh no, these ingredients got burned' });
				patchSaveFileReducer({
					inventory: joinInventories(saveFile.inventory, usedIngredients),
				});
			} else {
				addMultipleMessages([
					{ message: 'Excellent work, chef' },
					{ message: `received 1 ${recipe.result}` },
				]);
				patchSaveFileReducer({
					inventory: joinInventories(saveFile.inventory, {
						...usedIngredients,
						[recipe.result]: 1,
					}),
				});
			}
		},
		[addMessage, addMultipleMessages, patchSaveFileReducer, saveFile.inventory]
	);

	return { enabledRecipes, disabledRecipes, cook };
};
