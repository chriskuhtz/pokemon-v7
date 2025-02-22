export const weatherTypes = [
	'rain',
	'sandstorm',
	'sun',
	'rain_effectless',
	'sandstorm_effectless',
	'sun_effectless',
] as const;
export type WeatherType = (typeof weatherTypes)[number];
