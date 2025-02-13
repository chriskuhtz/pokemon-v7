import { BattlePokemon } from './BattlePokemon';
import { HealingItemType, PokeballType } from './Item';
import { MoveDto } from './Move';
import { OwnedPokemonMove } from './OwnedPokemon';

export type BattleAttack = OwnedPokemonMove & {
	data: MoveDto;
	type: 'BattleAttack';
	crit?: boolean;
	multiHits?: number;
};
export interface CatchProcessInfo {
	pokemon: BattlePokemon;
	ball: PokeballType;
	type: 'CatchProcessInfo';
}
export type ChargeUp = OwnedPokemonMove & {
	type: 'ChargeUp';
	data: MoveDto;
	crit?: boolean;
};
export interface InBattleItem {
	pokemon: BattlePokemon;
	item: HealingItemType;
	type: 'InBattleItem';
}

export type BattleAction =
	| CatchProcessInfo
	| BattleAttack
	| ChargeUp
	| InBattleItem;
