import { Stack } from "../../uiComponents/Stack/Stack";

interface ChangelogEntryData {
  version: string;
  listOfChanges: string[];
}

const changelogData: ChangelogEntryData[] = [
  {
    version: "0.56",
    listOfChanges: ["Recovery Tool", "fixes and balances from playtesting"],
  },
  {
    version: "0.55",
    listOfChanges: [
      "New Area",
      "new type of apricorn",
      "new quest",
      "new trainers",
      "wild encounter groups of more than 2",
      "fixes and balances from playtesting",
    ],
  },
  {
    version: "0.54",
    listOfChanges: [
      "Some Settings can now only be editted at the start of the game",
      "fixes and balances from playtesting",
    ],
  },
  {
    version: "0.53",
    listOfChanges: [
      "Bag Limit in Overworld Icons",
      "New Setting: random Encounters",
      "New Setting: random Evolutions",
      "fixes and balances from playtesting",
    ],
  },
  { version: "0.52", listOfChanges: ["fixes from playtesting"] },
  {
    version: "0.51",
    listOfChanges: [
      "Feedback and fixes for labyrinth mode",
      "Apply Items from Team Overview",
    ],
  },
  {
    version: "0.50",
    listOfChanges: [
      "Feedback and fixes for labyrinth mode",
      "Labyrinth level 2",
    ],
  },
  {
    version: "0.49",
    listOfChanges: ["Ideas and Fixes", "First version of labyrinth mode"],
  },
  { version: "0.48", listOfChanges: ["Balancing and Fixes"] },
  {
    version: "0.47",
    listOfChanges: [
      "Caught Water Pokemon live in the water, not on land",
      "Camp Upgrade: Battle Journalist",
      "Balancing and Fixes",
    ],
  },
  {
    version: "0.46",
    listOfChanges: [
      "follower pokemon",
      "UI Improvements",
      "All 16 Gym Leaders",
    ],
  },
  {
    version: "0.45",
    listOfChanges: [
      "Pokemon League Challenge",
      "Redesigned Camp",
      "Balancing",
      "New Attacks",
    ],
  },
  {
    version: "0.44",
    listOfChanges: ["Ux Improvements", "Fixes", "New Attacks"],
  },
  {
    version: "0.43",
    listOfChanges: [
      "Victory Road",
      "Badges",
      "Balancing for misty",
      "New Attacks",
    ],
  },
  {
    version: "0.42",
    listOfChanges: [
      "Ev Training mode",
      "Remove imported challenger button",
      "New Attacks",
    ],
  },
  {
    version: "0.41",
    listOfChanges: [
      "Snapshot Battles against Friends",
      "New Camp Upgrade",
      "New Gym Leaders",
      "Moves can only be changed at the Move Tutor",
      "New Attacks",
    ],
  },
  {
    version: "0.40",
    listOfChanges: ["Fixes and Balancing", "New Quests", "New Attacks"],
  },
  {
    version: "0.39",
    listOfChanges: [
      "Evil Teams leave after 3 Hours",
      "Evil Teams level scale with you",
      "Balancing and Fixes",
      "New Attacks",
    ],
  },
  {
    version: "0.38",
    listOfChanges: [
      "Internal Dex",
      "New evil team",
      "New Features",
      "Balancing and Fixes",
      "New Attacks",
    ],
  },
  {
    version: "0.37",
    listOfChanges: ["New Features", "Balancing and Fixes", "New Attacks"],
  },
  {
    version: "0.36",
    listOfChanges: [
      "New Camp Upgrades",
      "New evil teams",
      "Balancing and Fixes",
      "New Attacks",
    ],
  },
  {
    version: "0.35",
    listOfChanges: [
      "New camp upgrades",
      "New Travelling Trainers",
      "New Attacks",
    ],
  },
  {
    version: "0.34",
    listOfChanges: [
      "Catch Streaks",
      "New Travelling Trainer",
      "fixes, balancing and improvements",
      "New Abilities and Attacks",
    ],
  },
  {
    version: "0.33",
    listOfChanges: [
      "Quest Categories",
      "New Travelling Trainer",
      "fixes, balancing and improvements",
      "New Abilities and Attacks",
    ],
  },
  {
    version: "0.32",
    listOfChanges: [
      "New Training field mode",
      "fixes, balancing and improvements",
      "New Abilities and Attacks",
    ],
  },
  {
    version: "0.31",
    listOfChanges: [
      "New Travelling Trainer",
      "fixes and improvements",
      "New Abilities and Attacks",
    ],
  },
  {
    version: "0.30",
    listOfChanges: ["fixes and improvements", "New Abilities and Attacks"],
  },
  {
    version: "0.29",
    listOfChanges: [
      "New Travelling Trainer",
      "New Upgrades",
      "Balancing",
      "UI Improvements",
      "New Abilities and Attacks",
    ],
  },
  {
    version: "0.28",
    listOfChanges: ["New Abilities and Attacks"],
  },
  {
    version: "0.27",
    listOfChanges: [
      "Favorites System",
      "New Quests",
      "Catchboosts as quest rewards",
      "New Abilities and Attacks",
    ],
  },
  { version: "0.26", listOfChanges: ["New Sorting options"] },
  {
    version: "0.25",
    listOfChanges: [
      "New Quests",
      "New Camp Upgrades",
      "UI Improvements",
      "New Abilities and Attacks",
    ],
  },
  {
    version: "0.24",
    listOfChanges: [
      "Performance Improvements",
      "UI Improvements",
      "Wild Apricorn Trees",
      "Rocket Camp Raid",
      "New Quests",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.23",
    listOfChanges: ["New Abilities and Attacks"],
  },
  {
    version: "0.22",
    listOfChanges: [
      "Fixed Random Abilities",
      "Fixed Challenge Field Ranks",
      "Terrain Items",
      "New Quest line",
      "All Items with battle effects finished",
      "New Abilities and Attacks",
    ],
  },
  {
    version: "0.21",
    listOfChanges: [
      "Balls are no longer wasted if the target isnt there anymore",
      "Cant select last Pokeball twice anymore",
      "Fix Cooking Ingredient Requirements",
      "Travelling Merchant",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.20",
    listOfChanges: [
      "Battle Terrain Abilities",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.19",
    listOfChanges: [
      "Make first Route Pokemon a little weaker",
      "Giovanni",
      "Lures at vileplume shop",
      "Item Info Button in Bag",
      "New Cooking Recipes",
      "No Key Items as Randomized Held Items",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.18",
    listOfChanges: [
      "Move Info Button",
      "Ability Info Button",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.17",
    listOfChanges: [
      "Movement Buttons can be hidden",
      "Make Starter Quest work for randomized starters",
      "Fixed Uppercase/Lowercase inputs",
      "Better Pokeball indicator",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.16",
    listOfChanges: [
      "Team Rocket",
      "Improved Campupgrade screen",
      "Various minor fixes",
    ],
  },
  {
    version: "0.15",
    listOfChanges: [
      "Infinite Repel that can be toggled",
      "Better Storage Sorting",
      "New Training Field Trainer",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.14",
    listOfChanges: [
      "New fossils",
      "New historian quest",
      "New static pokemon",
      "Various minor fixes",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.13",
    listOfChanges: [
      "New sorting options for pokemon",
      "Various minor fixes",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.12",
    listOfChanges: [
      "Pokeball Amount Indicator",
      "Training field 5",
      "New Abilities, Items and Attacks",
    ],
  },
  { version: "0.11", listOfChanges: ["New Mulches"] },
  {
    version: "0.10",
    listOfChanges: ["Challenge Field", "New Abilities, Items and Attacks"],
  },
  {
    version: "0.9",
    listOfChanges: [
      "Kanto Gym Leaders appear for special battles",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.8",
    listOfChanges: [
      "Opponents set up screens",
      "New Abilities, Items and Attacks",
    ],
  },
  {
    version: "0.7",
    listOfChanges: [
      "Repair Hyper Beam",
      "Take all/Store all by clicking on arrow",
    ],
  },
  {
    version: "0.6",
    listOfChanges: ["Better Iv and Ev display", "Fix Multihit PP Usage"],
  },
  {
    version: "0.5",
    listOfChanges: ["Fixed Ability: Moody", "Fixed Setting: Random Abilities"],
  },
  {
    version: "0.4",
    listOfChanges: [
      "Improved Amoongus Trades",
      "Setting: Random Held Items",
      "Setting: Random Abilities",
      "Setting: Random Learnable Moves",
      "Opponent decisions consider weather & effects",
      "Fixed Weather Display and Message",
      "CampUpgrade: Historian",
      "New Abilities, Items and Attacks",
    ],
  },
];

export const newestChangeLog = changelogData.at(0)?.version ?? "0";

const ChangelogEntry = ({
  version,
  listOfChanges,
}: ChangelogEntryData): JSX.Element => {
  return (
    <>
      <h3>{version}:</h3>
      <ol style={{ lineHeight: "1.5rem" }}>
        {listOfChanges.map((change, index) => (
          <li key={index}>{change}</li>
        ))}
      </ol>
    </>
  );
};

export const ChangeLog = () => {
  return (
    <Stack alignItems="center" mode="column">
      <h3>Whats new:</h3>
      {changelogData.map((entry) => (
        <ChangelogEntry
          key={entry.version}
          version={entry.version}
          listOfChanges={entry.listOfChanges}
        />
      ))}
    </Stack>
  );
};
