export const weatherTypes = [
	'rain',
	'sandstorm',
	'rain_effectless',
	'sandstorm_effectless',
] as const;
export type WeatherType = (typeof weatherTypes)[number];
