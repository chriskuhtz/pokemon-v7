import React, { useEffect, useState } from 'react';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { Banner } from '../../uiComponents/Banner/Banner';

export const IntroBanner = ({
	opponent,
	player,
}: {
	opponent: {
		name: string;
		dexId: number;
	};
	player: {
		name: string;
		dexId: number;
	};
}) => {
	const [opponentBannerHandled, setOpponentBannerHandled] = useState(false);
	const [playerBannerHandled, setPlayerBannerHandled] = useState(false);

	useEffect(() => {
		if (opponentBannerHandled) {
			return;
		}
		const t = setTimeout(() => setOpponentBannerHandled(true), 1500);

		return () => clearTimeout(t);
	}, [opponentBannerHandled]);
	useEffect(() => {
		if (!opponentBannerHandled) {
			return;
		}
		const t = setTimeout(() => setPlayerBannerHandled(true), 1500);

		return () => clearTimeout(t);
	}, [opponentBannerHandled]);

	if (!opponentBannerHandled) {
		return (
			<Banner>
				<React.Fragment>
					Encountered a wild {opponent.name}{' '}
					<img src={getPokemonSprite(opponent.dexId)} />
				</React.Fragment>
			</Banner>
		);
	}
	if (!playerBannerHandled) {
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
