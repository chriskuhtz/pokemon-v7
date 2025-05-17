export const numberToGridTemplateColumns = (x: number): string => {
	return Array.from({ length: x })
		.map(() => '1fr')
		.join(' ');
};
