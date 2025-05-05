import { useCallback, useContext, useMemo } from 'react';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import { berries, ItemType } from '../../../interfaces/Item';

export interface Recipe {
	result: ItemType;
	ingredients: ItemType[];
	difficulty: 'EASY' | 'MEDIUM' | 'TRICKY';
}

const BASE_RECIPES: Recipe[] = [
	...berries.map(
		(c) =>
			({
				result: 'berry-juice',
				ingredients: ['oran-berry', c],
				difficulty: 'EASY',
			} as Recipe)
	),
	{
		result: 'old-gateau',
		ingredients: ['nanab-berry', 'leppa-berry', 'razz-berry'],
		difficulty: 'MEDIUM',
	},
	{
		result: 'big-malasada',
		ingredients: ['coba-berry', 'micle-berry', 'honey'],
		difficulty: 'MEDIUM',
	},
	{
		result: 'moomoo-cheese',
		ingredients: ['moomoo-milk', 'moomoo-milk', 'sitrus-berry'],
		difficulty: 'MEDIUM',
	},
	{
		result: 'lumiose-galette',
		ingredients: ['moomoo-milk', 'bluk-berry', 'coba-berry'],
		difficulty: 'MEDIUM',
	},
	{
		result: 'rage-candy-bar',
		ingredients: ['honey', 'aguav-berry', 'razz-berry'],
		difficulty: 'MEDIUM',
	},
	{
		result: 'pewter-crunchies',
		ingredients: ['honey', 'grepa-berry', 'qualot-berry'],
		difficulty: 'MEDIUM',
	},
	{
		result: 'casteliacone',
		ingredients: ['moomoo-milk', 'honey', 'aspear-berry'],
		difficulty: 'MEDIUM',
	},
	{
		result: 'lava-cookie',
		ingredients: ['yache-berry', 'chilan-berry', 'pecha-berry'],
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
	{
		result: 'max-honey',
		ingredients: ['honey', 'honey', 'honey', 'enigma-berry'],
		difficulty: 'TRICKY',
	},
	{
		result: 'max-mushroom',
		ingredients: ['tiny-mushroom', 'enigma-berry'],
		difficulty: 'MEDIUM',
	},
];

export const recipeChanceMap = {
	EASY: 90,
	MEDIUM: 75,
	TRICKY: 60,
};

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

			const chance = Math.random() + (saveFile.cookingSkill ?? 0) / 100;

			const failed = () => {
				if (recipe.difficulty === 'EASY' && chance < 0.1) {
					return true;
				}
				if (recipe.difficulty === 'MEDIUM' && chance < 0.25) {
					return true;
				}
				if (recipe.difficulty === 'TRICKY' && chance < 0.4) {
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
					cookingSkill: (saveFile.cookingSkill ?? 0) + 1,
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
			saveFile.cookingSkill,
			saveFile.mileStones,
		]
	);

	return { enabledRecipes, disabledRecipes, cook };
};
