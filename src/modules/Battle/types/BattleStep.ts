export const battleSteps = [
	'UNITIALIZED',
	'OPPONENT_INTRO',
	'PLAYER_INTRO',
	'OPPONENT_EMERGE',
	'PLAYER_EMERGE',
	'HANDLE_PLAYER_END_OF_TURN_ABILITY',
	'HANDLE_OPPONENT_END_OF_TURN_ABILITY',
	'PLAYER_CURE_AILMENTS',
	'OPPONENT_CURE_AILMENTS',
	'CLEAN_MOVE_QUEUE',
	'MOVE_SELECTION',
	'OPPONENT_MOVE_SELECTION',
	'MOVE_HANDLING',
	'EXECUTE_PLAYER_MOVE',
	'EXECUTE_OPPONENT_MOVE',
	'OPPONENT_FLINCHED',
	'PLAYER_FLINCHED',
	'PLAYER_MISSED',
	'OPPONENT_MISSED',
	'PLAYER_UNABLE_TO_ATTACK',
	'OPPONENT_UNABLE_TO_ATTACK',
	'OPPONENT_FAINTING',
	'HANDLE_PLAYER_END_OF_TURN_DAMAGE',
	'HANDLE_OPPONENT_END_OF_TURN_DAMAGE',
	'PLAYER_FAINTING',
	'CATCHING_PROCESS_1',
	'CATCHING_PROCESS_2',
	'CATCHING_PROCESS_3',
	'CATCHING_PROCESS_4',
	'CATCHING_FAILURE',
	'CATCHING_SUCCESS',
	'BATTLE_WON',
	'BATTLE_LOST',
] as const;

export type BattleStep = (typeof battleSteps)[number];

export const possibleNextSteps: Record<BattleStep, BattleStep[]> = {
	UNITIALIZED: ['OPPONENT_INTRO'],
	OPPONENT_INTRO: ['PLAYER_INTRO'],
	PLAYER_INTRO: ['OPPONENT_EMERGE'],
	OPPONENT_EMERGE: ['PLAYER_EMERGE'],
	PLAYER_EMERGE: ['MOVE_SELECTION'],
	CLEAN_MOVE_QUEUE: ['MOVE_SELECTION'],
	MOVE_SELECTION: ['OPPONENT_MOVE_SELECTION'],
	OPPONENT_MOVE_SELECTION: ['MOVE_HANDLING'],
	PLAYER_CURE_AILMENTS: ['EXECUTE_PLAYER_MOVE'],
	OPPONENT_CURE_AILMENTS: ['EXECUTE_OPPONENT_MOVE'],
	PLAYER_FLINCHED: ['HANDLE_PLAYER_END_OF_TURN_ABILITY'],
	HANDLE_PLAYER_END_OF_TURN_ABILITY: ['HANDLE_OPPONENT_END_OF_TURN_ABILITY'],
	HANDLE_OPPONENT_END_OF_TURN_ABILITY: ['HANDLE_PLAYER_END_OF_TURN_DAMAGE'],
	OPPONENT_FLINCHED: ['HANDLE_OPPONENT_END_OF_TURN_ABILITY'],
	MOVE_HANDLING: ['PLAYER_CURE_AILMENTS', 'OPPONENT_CURE_AILMENTS'],
	EXECUTE_PLAYER_MOVE: [
		'PLAYER_UNABLE_TO_ATTACK',
		'PLAYER_MISSED',
		'EXECUTE_PLAYER_MOVE',
		'OPPONENT_FLINCHED',
		'OPPONENT_FAINTING',
		'CATCHING_PROCESS_1',
		'OPPONENT_CURE_AILMENTS',
		'HANDLE_PLAYER_END_OF_TURN_ABILITY',
	],
	EXECUTE_OPPONENT_MOVE: [
		'OPPONENT_UNABLE_TO_ATTACK',
		'PLAYER_CURE_AILMENTS',
		'HANDLE_PLAYER_END_OF_TURN_ABILITY',
		'OPPONENT_MISSED',
		'PLAYER_FAINTING',
		'EXECUTE_OPPONENT_MOVE',
		'PLAYER_FLINCHED',
	],
	PLAYER_MISSED: [
		'HANDLE_PLAYER_END_OF_TURN_ABILITY',
		'OPPONENT_CURE_AILMENTS',
	],
	OPPONENT_MISSED: [
		'PLAYER_CURE_AILMENTS',
		'HANDLE_PLAYER_END_OF_TURN_ABILITY',
	],
	PLAYER_UNABLE_TO_ATTACK: [
		'OPPONENT_CURE_AILMENTS',
		'HANDLE_PLAYER_END_OF_TURN_ABILITY',
	],
	OPPONENT_UNABLE_TO_ATTACK: [
		'PLAYER_CURE_AILMENTS',
		'HANDLE_PLAYER_END_OF_TURN_ABILITY',
	],
	HANDLE_PLAYER_END_OF_TURN_DAMAGE: [
		'HANDLE_OPPONENT_END_OF_TURN_DAMAGE',
		'BATTLE_LOST',
	],
	HANDLE_OPPONENT_END_OF_TURN_DAMAGE: ['BATTLE_WON', 'MOVE_SELECTION'],
	CATCHING_PROCESS_1: ['CATCHING_PROCESS_2', 'CATCHING_FAILURE'],
	CATCHING_PROCESS_2: ['CATCHING_PROCESS_3', 'CATCHING_FAILURE'],
	CATCHING_PROCESS_3: ['CATCHING_PROCESS_4', 'CATCHING_FAILURE'],
	CATCHING_PROCESS_4: ['CATCHING_FAILURE', 'CATCHING_SUCCESS'],
	CATCHING_FAILURE: ['OPPONENT_CURE_AILMENTS'],
	CATCHING_SUCCESS: ['BATTLE_WON'],
	OPPONENT_FAINTING: ['BATTLE_WON'],
	PLAYER_FAINTING: ['BATTLE_LOST'],
	BATTLE_LOST: [],
	BATTLE_WON: [],
};
export const introPath: BattleStep[] = [
	'UNITIALIZED',
	'OPPONENT_INTRO',
	'PLAYER_INTRO',
	'OPPONENT_EMERGE',
	'PLAYER_EMERGE',
	'MOVE_SELECTION',
];
export const beginTurnPath: BattleStep[] = [
	'MOVE_SELECTION',
	'OPPONENT_MOVE_SELECTION',
	'MOVE_HANDLING',
];
export const endTurnPath: BattleStep[] = [
	'HANDLE_PLAYER_END_OF_TURN_ABILITY',
	'HANDLE_OPPONENT_END_OF_TURN_ABILITY',
	'HANDLE_PLAYER_END_OF_TURN_DAMAGE',
	'HANDLE_OPPONENT_END_OF_TURN_DAMAGE',
	'CLEAN_MOVE_QUEUE',
	'MOVE_SELECTION',
];
export const catchingPath: BattleStep[] = [
	'EXECUTE_PLAYER_MOVE',
	'CATCHING_PROCESS_1',
	'CATCHING_PROCESS_2',
	'CATCHING_PROCESS_3',
	'CATCHING_PROCESS_4',
	'CATCHING_SUCCESS',
	'BATTLE_WON',
];
export const playerTurnPath: BattleStep[] = [
	'PLAYER_CURE_AILMENTS',
	'EXECUTE_PLAYER_MOVE',
];
export const opponentTurnPath: BattleStep[] = [
	'OPPONENT_CURE_AILMENTS',
	'EXECUTE_OPPONENT_MOVE',
];
export const catchingFailurePath: BattleStep[] = [
	'CATCHING_FAILURE',
	...opponentTurnPath,
];
export const playerIsFasterPath: BattleStep[] = [
	'MOVE_HANDLING',
	...playerTurnPath,
	...opponentTurnPath,
	...endTurnPath,
];
export const opponentIsFasterPath: BattleStep[] = [
	'MOVE_HANDLING',
	...opponentTurnPath,
	...playerTurnPath,
	...endTurnPath,
];
export const opponentFaintingPath: BattleStep[] = [
	'OPPONENT_FAINTING',
	'BATTLE_WON',
];
export const playerFaintingPath: BattleStep[] = [
	'PLAYER_FAINTING',
	'BATTLE_LOST',
];
