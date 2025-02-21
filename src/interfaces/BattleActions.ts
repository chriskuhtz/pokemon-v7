import { MoveName } from '../constants/checkLists/movesCheckList';
import {
	HealingItemType,
	PokeballType,
	PPRestoringItemType,
	XItemType,
} from './Item';
import { MoveDto } from './Move';

export type BattleAttack = {
	data: MoveDto;
	name: MoveName;
	type: 'BattleAttack';
	round: number;
	targetId: string;
	multiHits: number;
};
export interface CatchProcessInfo {
	ball: PokeballType;
	type: 'CatchProcessInfo';
	round: number;
	targetId: string;
}
export type ChargeUp = {
	type: 'ChargeUp';
	data: MoveDto;
	name: MoveName;
	round: number;
};
export interface InBattleItem {
	item: HealingItemType | PPRestoringItemType | XItemType;
	type: 'InBattleItem';
	round: number;
	targetId: string;
	moveToRestore?: MoveName;
}

export interface RunAway {
	type: 'RunAway';
	round: number;
}

export type BattleAction =
	| CatchProcessInfo
	| BattleAttack
	| ChargeUp
	| InBattleItem
	| RunAway;
