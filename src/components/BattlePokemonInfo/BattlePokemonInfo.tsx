import { useContext, useMemo } from 'react';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { RiSparkling2Line } from 'react-icons/ri';
import { battleSpriteSize } from '../../constants/gameData';
import { secondTurnMoves } from '../../constants/secondTurnMoves';
import { typeColors } from '../../constants/typeColors';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getPlayerId } from '../../functions/getPlayerId';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Chip } from '../../uiComponents/Chip/Chip';
import { HpBar } from '../HpBar/HpBar';
import { ItemSprite } from '../ItemSprite/ItemSprite';
import { PrimaryAilmentIcon } from '../PrimaryAilmentIcon/PrimaryAilmentIcon';
import { XpBar } from '../XpBar/XpBar';

export const BattlePokemonInfo = ({
	pokemon,
	onClick,
}: {
	pokemon: BattlePokemon;
	onClick?: () => void;
}) => {
	const { level } = calculateLevelData(pokemon.xp);
	const {
		saveFile: { pokedex },
	} = useContext(SaveFileContext);

	const backgroundColor = useMemo(() => {
		if (pokemon.primaryAilment?.type === 'burn') {
			return typeColors['fire'];
		}
		if (pokemon.primaryAilment?.type === 'paralysis') {
			return typeColors['electric'];
		}
		if (pokemon.primaryAilment?.type === 'sleep') {
			return typeColors['normal'];
		}
		if (pokemon.primaryAilment?.type === 'freeze') {
			return typeColors['ice'];
		}
		if (
			pokemon.primaryAilment?.type === 'poison' ||
			pokemon.primaryAilment?.type === 'toxic'
		) {
			return typeColors['poison'];
		}
		return 'black';
	}, [pokemon]);
	return (
		<div
			onClick={onClick}
			role={onClick ? 'button' : undefined}
			tabIndex={onClick ? 0 : undefined}
			onKeyDown={(e) => {
				if (e.key === 'Enter' && onClick) {
					onClick();
				}
			}}
			style={{
				border: 'solid',
				borderWidth: backgroundColor === 'black' ? '1px' : '3px',
				padding: '0 2rem',
				borderRadius: 9000,
				borderColor: backgroundColor,
			}}
			key={pokemon.id}
		>
			<strong style={{ display: 'flex', alignItems: 'center' }}>
				{pokedex[pokemon.name].caughtOnRoutes.length > 0 &&
					pokemon.ownerId !== getPlayerId() && (
						<ItemSprite item={'poke-ball'} sizeFactor={0.5} />
					)}
				{pokemon.shiny && <RiSparkling2Line size={battleSpriteSize / 2} />}
				{pokemon.gender === 'MALE' && <IoMdMale size={battleSpriteSize / 2} />}
				{pokemon.gender === 'FEMALE' && (
					<IoMdFemale size={battleSpriteSize / 2} />
				)}
				<PrimaryAilmentIcon primaryAilment={pokemon.primaryAilment} />
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
