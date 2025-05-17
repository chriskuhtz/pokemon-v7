export const hexToRgb = (hex: string, opacity?: number): string => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
				result[3],
				16
		  )},${opacity ?? 1})`
		: `rgb(0,0,0,${opacity ?? 1})`;
};
