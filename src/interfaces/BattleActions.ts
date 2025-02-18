import { MoveName } from '../constants/checkLists/movesCheckList';
import { BattlePokemon } from './BattlePokemon';
import { HealingItemType, PokeballType } from './Item';
import { MoveDto } from './Move';

export type BattleAttack = {
	data: MoveDto;
	name: MoveName;
	type: 'BattleAttack';
	round: number;
	targetId: string;
};
export interface CatchProcessInfo {
	pokemon: BattlePokemon;
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
	targetId: string;
};
export interface InBattleItem {
	pokemon: BattlePokemon;
	item: HealingItemType;
	type: 'InBattleItem';
	round: number;
	targetId: string;
}

export type BattleAction =
	| CatchProcessInfo
	| BattleAttack
	| ChargeUp
	| InBattleItem;
