export const reduceEncounterRateModifier = (
	steps: number,
	encounterRateModifier?: { factor: number; steps: number }
): { factor: number; steps: number } | undefined => {
	if (!encounterRateModifier) {
		return;
	}
	if (steps >= encounterRateModifier.steps) {
		return;
	}

	return {
		...encounterRateModifier,
		steps: encounterRateModifier.steps - steps,
	};
};
