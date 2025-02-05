import React from 'react';
import { battleSpriteSize } from '../../../constants/gameData';
import { determineTypeFactor } from '../../../functions/determineTypeFactor';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { Banner } from '../../../uiComponents/Banner/Banner';
import { BattlePokemon } from '../hooks/useBattlePokemon';
import { BattleMove } from '../hooks/useBattleSteps';
import { BattleStep } from '../types/BattleStep';
export const BattleBanner = ({
	opponent,
	player,
	battleStep,
	voidSteps,
	nextMove,
}: {
	opponent: BattlePokemon;
	player: BattlePokemon;
	battleStep: BattleStep;
	voidSteps: BattleStep[];
	nextMove: BattleMove | undefined;
}) => {
	if (voidSteps.includes(battleStep)) {
		return <div></div>;
	}
	if (battleStep === 'OPPONENT_INTRO') {
		return (
			<Banner>
				<React.Fragment>
					Encountered a wild {opponent.data.name}{' '}
					<img
						height={battleSpriteSize}
						width={battleSpriteSize}
						src={getPokemonSprite(opponent.dexId)}
					/>
				</React.Fragment>
			</Banner>
		);
	}
	if (battleStep === 'PLAYER_INTRO') {
		return (
			<Banner>
				<React.Fragment>
					<img
						height={battleSpriteSize}
						width={battleSpriteSize}
						src={getPokemonSprite(player.dexId)}
					/>{' '}
					Let's Go {player.data.name}
				</React.Fragment>
			</Banner>
		);
	}
	if (
		battleStep === 'EXECUTE_PLAYER_MOVE' &&
		nextMove?.type === 'BattleAttack' &&
		opponent
	) {
		return (
			<Banner>
				{' '}
				<img
					height={battleSpriteSize}
					width={battleSpriteSize}
					src={getPokemonSprite(player.dexId)}
				/>
				<div>
					<h3>
						{player.data.name} used {nextMove.name} against {opponent.data.name}
					</h3>
					{determineTypeFactor(opponent, nextMove) > 1 && (
						<h5>It is very effective</h5>
					)}
					{determineTypeFactor(opponent, nextMove) < 1 &&
						determineTypeFactor(opponent, nextMove) !== 0 && (
							<h5>It is not very effective</h5>
						)}
					{determineTypeFactor(opponent, nextMove) === 0 && (
						<h5>It has no effect</h5>
					)}
				</div>
			</Banner>
		);
	}
	if (
		battleStep === 'EXECUTE_OPPONENT_MOVE' &&
		nextMove?.type === 'BattleAttack'
	) {
		return (
			<Banner>
				<div>
					<h3>
						{opponent.data.name} used {nextMove.name} against {player.data.name}
					</h3>
					{determineTypeFactor(player, nextMove) > 1 && (
						<h5>It is very effective</h5>
					)}
					{determineTypeFactor(player, nextMove) < 1 &&
						determineTypeFactor(player, nextMove) !== 0 && (
							<h5>It is not very effective</h5>
						)}
					{determineTypeFactor(player, nextMove) === 0 && (
						<h5>It has no effect</h5>
					)}
				</div>

				<img
					height={battleSpriteSize}
					width={battleSpriteSize}
					src={getPokemonSprite(opponent.dexId)}
				/>
			</Banner>
		);
	}
	if (
		battleStep === 'CATCHING_PROCESS_1' &&
		nextMove?.type === 'CatchProcessInfo'
	) {
		return (
			<Banner>
				You throw a {nextMove.ball} at the wild {opponent.data.name}
				<img
					style={{ padding: '1rem 0' }}
					width={battleSpriteSize / 2}
					height={battleSpriteSize / 2}
					src={getItemUrl(nextMove.ball)}
				/>
			</Banner>
		);
	}

	if (battleStep === 'CATCHING_SUCCESS') {
		return (
			<Banner>
				<h2>The wild {opponent.data.name} was caught!</h2>
			</Banner>
		);
	}
	if (battleStep === 'PLAYER_FAINTING') {
		return (
			<Banner>
				{' '}
				<img
					height={battleSpriteSize}
					width={battleSpriteSize}
					src={getPokemonSprite(player.dexId)}
					style={{ filter: 'grayScale(1)' }}
				/>
				{player.data.name} fainted
			</Banner>
		);
	}
	if (battleStep === 'OPPONENT_FAINTING') {
		return (
			<Banner>
				{opponent.data.name} fainted
				<img
					height={battleSpriteSize}
					width={battleSpriteSize}
					src={getPokemonSprite(opponent.dexId)}
					style={{ filter: 'grayScale(1)' }}
				/>
			</Banner>
		);
	}
	if (battleStep === 'BATTLE_WON') {
		return (
			<Banner>
				<h2>You won the Battle</h2>
			</Banner>
		);
	}
	if (battleStep === 'BATTLE_LOST') {
		return (
			<Banner>
				<h2>You lost the Battle</h2>
			</Banner>
		);
	}
	if (battleStep === 'ERROR') {
		return (
			<Banner>
				<h2>An Error occured :/</h2>
			</Banner>
		);
	}

	return <></>;
};
