import React from 'react';
import { HpBar } from '../../../components/HpBar/HpBar';
import { LevelBar } from '../../../components/LevelBar/LevelBar';
import { battleSpriteSize } from '../../../constants/gameData';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { PrimaryAilment } from '../../../interfaces/Ailment';
import { StatObject } from '../../../interfaces/StatObject';
import { PrimaryAilmentIcon } from '../../../components/PrimaryAilmentIcon/PrimaryAilmentIcon';

export const BattlePokemonInfoBox = ({
	dexId,
	stats,
	statBoosts,
	xp,
	damage,
	playerSide,
	primaryAilment,
}: {
	dexId: number;
	stats: StatObject;
	statBoosts: StatObject;
	xp: number;
	damage: number;
	playerSide?: boolean;
	primaryAilment?: PrimaryAilment;
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
				<LevelBar xp={xp} />
				<div style={{ display: 'flex', gap: '.5rem' }}>
					<PrimaryAilmentIcon primaryAilment={primaryAilment} />
					{Object.entries(statBoosts).map(([stat, modifier]) => {
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
				<HpBar max={stats.hp} damage={damage} />
			</div>
			<img
				width={battleSpriteSize}
				height={battleSpriteSize}
				src={getPokemonSprite(dexId, playerSide ? 'back' : undefined)}
			/>
		</div>
	);
};
