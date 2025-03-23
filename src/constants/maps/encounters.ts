import { TimeOfDay } from '../../functions/getTimeOfDay';
import { OverworldEncounter } from '../../interfaces/OverworldMap';

export type EncounterMap = Record<TimeOfDay | 'BASE', OverworldEncounter[]>;
