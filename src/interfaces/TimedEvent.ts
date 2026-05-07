import { PokemonName } from "../constants/pokemonNames";
import { Inventory } from "./Inventory";
import { ItemType, LureType, RepelType } from "./Item";
import { MapId } from "./mapIds";
import { OverworldTrainer } from "./Occupant";
import { SwarmType } from "./Pokedex";
import { PokemonType } from "./PokemonType";

export const evilTeams = ["rocket", "aqua", "magma", "galactic"] as const;
export type EvilTeam = (typeof evilTeams)[number];

export type OverworldTrainerStump = Omit<
  OverworldTrainer,
  "team" | "conditionFunction"
>;

export interface BaseTimedEvent {
  type:
    | "LOST_ITEM"
    | "STATIC_ENCOUNTER"
    | "STATIC_TRAINER"
    | "LURE"
    | "REPEL"
    | "TROUBLEMAKERS"
    | "BLOCKER"
    | "SWARM"
    | "CHEST";
  removeAt: number;
  id: string;
}

export interface LostItemEvent extends BaseTimedEvent {
  type: "LOST_ITEM";
  mapId: MapId;
  item: ItemType;
  amount: number;
  x: number;
  y: number;
}
export interface ChestEvent extends BaseTimedEvent {
  type: "CHEST";
  mapId: MapId;
  contents: Partial<Inventory>;
  x: number;
  y: number;
}
export interface StaticEncounterEvent extends BaseTimedEvent {
  type: "STATIC_ENCOUNTER";
  isRampager?: boolean;
  mapId: MapId;
  name: PokemonName;
  dexId: number;
  xp: number;
  x: number;
  y: number;
}
export interface StaticTrainerEvent extends BaseTimedEvent {
  type: "STATIC_TRAINER";
  mapId: MapId;
  pokemonType: PokemonType;
  xp: number;
  x: number;
  y: number;
}
export interface LureEvent extends BaseTimedEvent {
  type: "LURE";
  lureType: LureType;
}
export interface RepelEvent extends BaseTimedEvent {
  type: "REPEL";
  repelType: RepelType;
}

export interface TroubleMakersEvent extends BaseTimedEvent {
  type: "TROUBLEMAKERS";
  mapId: MapId;
  trainers: OverworldTrainerStump[];
  affiliation: EvilTeam;
}

export interface BlockerEvent extends BaseTimedEvent {
  type: "BLOCKER";
  id: string;
}

export interface SwarmEvent extends BaseTimedEvent {
  type: "SWARM";
  swarmType: SwarmType;
  mapId: MapId;
  pokemon: PokemonName;
  xpMin: number;
  xpMax: number;
}

export type TimedEvent =
  | LostItemEvent
  | StaticEncounterEvent
  | StaticTrainerEvent
  | LureEvent
  | RepelEvent
  | TroubleMakersEvent
  | BlockerEvent
  | SwarmEvent
  | ChestEvent;
