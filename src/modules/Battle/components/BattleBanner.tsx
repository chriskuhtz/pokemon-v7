import React from 'react';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { Banner } from '../../../uiComponents/Banner/Banner';
import { BattleStep } from '../Battle';
export const BattleBanner = ({
	opponent,
	player,
	battleStep,
	voidSteps,
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
}) => {
	if (voidSteps.includes(battleStep)) {
		return <div></div>;
	}
	if (battleStep === 'OPPONENT_INTRO') {
		return (
			<Banner>
				<React.Fragment>
					Encountered a wild {opponent.name}{' '}
					<img src={getPokemonSprite(opponent.dexId)} />
				</React.Fragment>
			</Banner>
		);
	}
	if (battleStep === 'PLAYER_INTRO') {
		return (
			<Banner>
				<React.Fragment>
					<img src={getPokemonSprite(player.dexId)} /> Let's Go {player.name}
				</React.Fragment>
			</Banner>
		);
	}

	return <></>;
};
