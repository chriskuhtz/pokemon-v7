import { OverworldTrainer } from "./Occupant";

export interface JournalEntryData {
  trainer: OverworldTrainer;
  xpOverwrite?: number;
  additionalNotes?: string[];
}
