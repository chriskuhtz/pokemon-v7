import React from 'react';
import { HpBar } from '../../../components/HpBar/HpBar';
import { battleSpriteSize } from '../../../constants/gameData';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const BattlePokemonInfoBox = ({
	pokemon,
	playerSide,
}: {
	pokemon: BattlePokemon;
	playerSide?: boolean;
}) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: playerSide ? 'row-reverse' : 'row',
				gap: '1rem',
				alignItems: 'center',
			}}
		>
			<div>
				<strong>Lvl: {calculateLevelData(pokemon.xp).level}</strong>
				<div style={{ display: 'flex', gap: '.5rem' }}>
					{Object.entries(pokemon.statBoosts).map(([stat, modifier]) => {
						if (modifier === 0) {
							return <React.Fragment key={stat + modifier}></React.Fragment>;
						}
						return (
							<div
								key={stat + modifier}
								style={{
									backgroundColor: 'black',
									color: 'white',
									fontSize: 'small',
									padding: '.25rem',
									borderRadius: '9000px',
								}}
							>
								{stat} {modifier > 0 ? '+' : '-'} {modifier}
							</div>
						);
					})}
				</div>
				<HpBar max={pokemon.stats.hp} damage={pokemon.damage} />
			</div>
			<img
				width={battleSpriteSize}
				height={battleSpriteSize}
				src={getPokemonSprite(pokemon.dexId, playerSide ? 'back' : undefined)}
			/>
		</div>
	);
};
