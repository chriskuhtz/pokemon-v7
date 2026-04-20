export const bugCheckList: {
  name: string;
  todos?: string[];
  handled?: boolean;
}[] = [
  { name: "fix moving around corners" },
  { name: "fix npc orientation" },
  { name: "rollout stops stacking when target is defeated" },
  { name: "leech seed benefit doesnt pass to switched in mon" },
  { name: "leech seed doesnt end when leeched is defeated" },
  { name: "fix npcs in front of player problem" },
  {
    name: "Some inaccessible areas in caveW1 are not marked, so procedurally generated occs spawn there",
  },
];
