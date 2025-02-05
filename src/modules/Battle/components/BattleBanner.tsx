import React from 'react';
import { battleSpriteSize } from '../../../constants/gameData';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { Banner } from '../../../uiComponents/Banner/Banner';
import { BattleStep } from '../Battle';
import { BattleMove } from '../hooks/useBattleSteps';
export const BattleBanner = ({
	opponent,
	player,
	battleStep,
	voidSteps,
	nextMove,
}: {
	opponent: {
		name: string;
		dexId: number;
	};
	player: {
		name: string;
		dexId: number;
	};
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
					Encountered a wild {opponent.name}{' '}
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
					Let's Go {player.name}
				</React.Fragment>
			</Banner>
		);
	}
	if (
		battleStep === 'EXECUTE_PLAYER_MOVE' &&
		nextMove?.type === 'BattleAttack'
	) {
		return (
			<Banner>
				{' '}
				<img
					height={battleSpriteSize}
					width={battleSpriteSize}
					src={getPokemonSprite(player.dexId)}
				/>
				{player.name} used {nextMove.name} against {opponent.name}
			</Banner>
		);
	}
	if (
		battleStep === 'EXECUTE_OPPONENT_MOVE' &&
		nextMove?.type === 'BattleAttack'
	) {
		return (
			<Banner>
				{opponent.name} used {nextMove.name} against {player.name}
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
				You throw a {nextMove.ball} at the wild {opponent.name}
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
				<h2>The wild {opponent.name} was caught!</h2>
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
