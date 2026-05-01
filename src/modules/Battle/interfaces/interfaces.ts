import { MoveName } from "../../../constants/movesCheckList";
import { ItemType } from "../../../interfaces/Item";

export type ActionType =
  | MoveName
  | ItemType
  | "RUN_AWAY"
  | "LOAFING"
  | "SWITCH";
export interface ChooseActionPayload {
  userId: string;
  actionName: ActionType;
  targetId: string;
  moveToRestore?: MoveName;
}

export interface BattleFieldEffect {
  type:
    | "mist"
    | "pressure"
    | "light-screen"
    | "reflect"
    | "plus"
    | "minus"
    | "spider-web"
    | "arena-trap"
    | "shadow-tag"
    | "magnet-pull"
    | "spikes"
    | "toxic-spikes"
    | "flower-gift"
    | "bad-dreams"
    | "unnerve"
    | "safeguard"
    | "friend-guard"
    | "victory-star"
    | "aroma-veil"
    | "flower-veil"
    | "sweet-veil"
    | "dark-aura"
    | "aura-break"
    | "fairy-aura"
    | "tailwind"
    | "battery"
    | "power-spot"
    | "steely-spirit"
    | "pastel-veil"
    | "sticky-web"
    | "aurora-veil"
    | "lucky-chant"
    | "stealth-rock";
  ownerId: string;
  applicatorId?: string;
  duration: number;
}
