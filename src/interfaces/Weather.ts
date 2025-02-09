export const weatherTypes = ['rain', 'sandstorm'] as const;
export type WeatherType = (typeof weatherTypes)[number];
