import { BattlePokemon } from "../../interfaces/BattlePokemon";
import { WeatherType } from "../../interfaces/Weather";
import { applyHailDamage } from "./applyHailDamage";
import { applyRainDamage } from "./applyRainDamage";
import { applySandStormDamage } from "./applySandStormDamage";
import { applySunDamage } from "./applySunDamage";

export const applyEndOfTurnWeatherDamage = (
  pokemon: BattlePokemon,
  addMessage: (x: string) => void,
  weather: WeatherType | undefined,
): BattlePokemon => {
  if (weather === "sandstorm") {
    return applySandStormDamage(pokemon, addMessage);
  }
  if (weather === "hail") {
    return applyHailDamage(pokemon, addMessage);
  }
  if (weather === "sun") {
    return applySunDamage(pokemon, addMessage);
  }
  if (weather === "rain") {
    return applyRainDamage(pokemon, addMessage);
  }
  return pokemon;
};
