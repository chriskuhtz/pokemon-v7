import { RiSparkling2Line } from 'react-icons/ri';
import { battleSpriteSize } from '../../constants/gameData';
import { secondTurnMoves } from '../../constants/secondTurnMoves';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPlayerId } from '../../functions/getPlayerId';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Chip } from '../../uiComponents/Chip/Chip';
import { HpBar } from '../HpBar/HpBar';
import { PrimaryAilmentIcon } from '../PrimaryAilmentIcon/PrimaryAilmentIcon';
import { XpBar } from '../XpBar/XpBar';

export const BattlePokemonInfo = ({ pokemon }: { pokemon: BattlePokemon }) => {
	const { level } = calculateLevelData(pokemon.xp);
	return (
		<div
			style={{
				border: '1px solid black',
				padding: '0 2rem',
				borderRadius: 9000,
			}}
			key={pokemon.id}
		>
			<strong style={{ display: 'flex', alignItems: 'center' }}>
				{pokemon.caughtBefore && pokemon.ownerId !== getPlayerId() && (
					<img
						height={battleSpriteSize / 2}
						width={battleSpriteSize / 2}
						src={getItemUrl('poke-ball')}
					/>
				)}
				{pokemon.shiny && <RiSparkling2Line size={battleSpriteSize / 2} />}{' '}
				{pokemon.data.name} | Lvl {level}{' '}
			</strong>
			{Object.entries(pokemon.statBoosts).map(([stat, boost]) => {
				if (boost !== 0) {
					return (
						<Chip key={stat}>
							<>
								{stat} {boost > 0 ? '+' : ''}
								{boost}
							</>
						</Chip>
					);
				}
			})}
			<PrimaryAilmentIcon primaryAilment={pokemon.primaryAilment} />
			{pokemon.moveQueue.length > 0 &&
				pokemon.moveQueue[0].type === 'BattleAttack' &&
				secondTurnMoves.includes(pokemon.moveQueue[0].name) && (
					<Chip>
						<span>Charged Up: {pokemon.moveQueue[0].name}</span>
					</Chip>
				)}
			{pokemon.secondaryAilments.map((s) => (
				<Chip>
					<span>{s.type}</span>
				</Chip>
			))}
			<HpBar max={pokemon.stats.hp} damage={pokemon.damage} />
			{pokemon.ownerId === getPlayerId() && <XpBar xp={pokemon.xp} />}
		</div>
	);
};
