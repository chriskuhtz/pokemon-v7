import React from 'react';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { PokeballType } from '../../../interfaces/Item';
import { Banner } from '../../../uiComponents/Banner/Banner';
import { BattleStep } from '../Battle';
import { battleSpriteSize } from '../../../constants/gameData';
export const BattleBanner = ({
	opponent,
	player,
	battleStep,
	voidSteps,
	catchProcessBall,
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
	catchProcessBall?: PokeballType;
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
	if (battleStep === 'CATCHING_PROCESS_1' && catchProcessBall) {
		return (
			<Banner>
				You throw a {catchProcessBall} at the wild {opponent.name}
				<img
					style={{ padding: '1rem 0' }}
					width={battleSpriteSize / 2}
					height={battleSpriteSize / 2}
					src={getItemUrl(catchProcessBall)}
				/>
			</Banner>
		);
	}
	if (battleStep === 'CATCHING_SUCCESS' && catchProcessBall) {
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

	return <></>;
};
