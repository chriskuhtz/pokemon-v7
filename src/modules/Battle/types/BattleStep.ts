export const battleSteps = [
	'UNITIALIZED',
	'OPPONENT_INTRO',
	'PLAYER_INTRO',
	'OPPONENT_EMERGE',
	'PLAYER_EMERGE',
	'HANDLE_PLAYER_ABILITY',
	'HANDLE_OPPONENT_ABILITY',
	'MOVE_SELECTION',
	'OPPONENT_MOVE_SELECTION',
	'MOVE_HANDLING',
	'EXECUTE_PLAYER_MOVE',
	'EXECUTE_OPPONENT_MOVE',
	'OPPONENT_FLINCHED',
	'PLAYER_FLINCHED',
	'PLAYER_MISSED',
	'OPPONENT_MISSED',
	'OPPONENT_FAINTING',
	'PLAYER_FAINTING',
	'CATCHING_PROCESS_1',
	'CATCHING_PROCESS_2',
	'CATCHING_PROCESS_3',
	'CATCHING_PROCESS_4',
	'CATCHING_FAILURE',
	'CATCHING_SUCCESS',
	'BATTLE_WON',
	'BATTLE_LOST',
	'ERROR',
] as const;

export type BattleStep = (typeof battleSteps)[number];
