import { JournalEntryData } from "../../interfaces/JournalEntryData";
import { mapDisplayNames } from "../../interfaces/mapIds";
import { trickXP } from "../baseConstants";
import { barry } from "./maps/occupants/barry";
import { trainerBlaine } from "./maps/occupants/blaine";
import { trainerBrock } from "./maps/occupants/brock";
import { bruno } from "./maps/occupants/bruno";
import { trainerBugsy } from "./maps/occupants/bugsy";
import { champChris } from "./maps/occupants/champChris";
import { trainerChuck } from "./maps/occupants/chuckLine";
import { trainerClair } from "./maps/occupants/clair";
import { cynthia } from "./maps/occupants/cynthia";
import { trainerErika } from "./maps/occupants/erika";
import { trainerFalkner } from "./maps/occupants/falknerLine";
import { trainerGary } from "./maps/occupants/gary";
import { giovanni } from "./maps/occupants/giovanni";
import { hugh } from "./maps/occupants/hugh";
import { trainerJanine } from "./maps/occupants/janine";
import { trainerJasmine } from "./maps/occupants/jasmine";
import { karen } from "./maps/occupants/karen";
import { koga } from "./maps/occupants/koga";
import { clearingKurt } from "./maps/occupants/kurt";
import { lance } from "./maps/occupants/lance";
import { trainerMisty } from "./maps/occupants/misty";
import { trainerMorty } from "./maps/occupants/mortyLine";
import { n } from "./maps/occupants/n";
import { trainerPryce } from "./maps/occupants/pryce";
import { red } from "./maps/occupants/red";
import { trainerSabrina } from "./maps/occupants/sabrina";
import { silver } from "./maps/occupants/silver";
import { trainerSurge } from "./maps/occupants/surge";
import { trainerWhitney } from "./maps/occupants/whitney";
import { will } from "./maps/occupants/will";

export const trainerJournals: JournalEntryData[] = [
  { trainer: clearingKurt, additionalNotes: ["matches your level"] },
  {
    trainer: trainerErika,
    additionalNotes: [`In ${mapDisplayNames["routeN1"]}`],
  },
  {
    trainer: trainerJanine,
    additionalNotes: [`In ${mapDisplayNames["routeN1E1"]}`],
  },
  {
    trainer: trainerBlaine,
    additionalNotes: [`In ${mapDisplayNames["routeE1"]}`],
  },
  {
    trainer: trainerSurge,
    additionalNotes: [`In ${mapDisplayNames["routeS1"]}`],
  },
  {
    trainer: trainerMisty,
    additionalNotes: [`In ${mapDisplayNames["routeS1E1"]}`],
  },
  {
    trainer: trainerBrock,
    additionalNotes: [`In ${mapDisplayNames["onixCave"]}`],
  },
  {
    trainer: trainerSabrina,
    additionalNotes: [`In ${mapDisplayNames["routeS1W1"]}`],
  },
  {
    trainer: trainerGary,
    additionalNotes: ["matches your level", `In ${mapDisplayNames["routeW1"]}`],
  },
  {
    trainer: trainerFalkner,
    additionalNotes: [
      "matches your level",
      `In ${mapDisplayNames["routeW1"]} after you finish their quest`,
    ],
  },
  {
    trainer: trainerBugsy,
    additionalNotes: [
      "matches your level",
      `In ${mapDisplayNames["routeN1E1"]} after you finish their quest`,
    ],
  },
  {
    trainer: trainerWhitney,
    additionalNotes: [
      "matches your level",
      `In ${mapDisplayNames["murasaki-glades"]} after you finish their quest`,
    ],
  },
  {
    trainer: trainerMorty,
    additionalNotes: [
      "matches your level",
      `In ${mapDisplayNames["caveW1"]} after you finish their quest`,
    ],
  },
  {
    trainer: trainerChuck,
    additionalNotes: [
      "matches your level",
      `In ${mapDisplayNames["routeE1"]} after you finish their quest`,
    ],
  },
  {
    trainer: trainerJasmine,
    additionalNotes: [
      "matches your level",
      `In ${mapDisplayNames["routeS1W1"]} after you finish their quest`,
    ],
  },
  {
    trainer: trainerPryce,
    additionalNotes: [
      "matches your level",
      `In ${mapDisplayNames["caveN1W1"]} after you finish their quest`,
    ],
  },
  {
    trainer: trainerClair,
    additionalNotes: [
      "matches your level",
      `In ${mapDisplayNames["victoryRoad"]} after you finish their quest`,
    ],
  },
  {
    trainer: will,
    additionalNotes: ["Matches your level * .8 after level 66"],
  },
  {
    trainer: koga,
    additionalNotes: ["Matches your level * .85 after level 67"],
  },
  {
    trainer: bruno,
    additionalNotes: ["Matches your level * .9 after level 68"],
  },
  {
    trainer: karen,
    additionalNotes: ["Matches your level * .95 after level 69"],
  },
  { trainer: lance, additionalNotes: ["Matches your level after level 70"] },
  { trainer: giovanni, additionalNotes: ["Matches your level after level 60"] },
  {
    trainer: barry,
    xpOverwrite: 6859,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: barry,
    xpOverwrite: 46655,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: barry,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: silver,
    xpOverwrite: 6859,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: silver,
    xpOverwrite: 46655,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: silver,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: hugh,
    xpOverwrite: 6859,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: hugh,
    xpOverwrite: 46655,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: hugh,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: n,
    xpOverwrite: 6859,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: n,
    xpOverwrite: 46655,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: n,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: red,
    xpOverwrite: 6859,
    additionalNotes: ["Might be a time traveller", "Matches your level"],
  },
  {
    trainer: red,
    xpOverwrite: 46655,
    additionalNotes: ["Might be a time traveller", "Matches your level"],
  },
  {
    trainer: red,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Might be a time traveller",
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: cynthia,
    xpOverwrite: 6859,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: cynthia,
    xpOverwrite: 46655,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: cynthia,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: champChris,
    additionalNotes: ["Matches your level after level 70"],
  },
];
