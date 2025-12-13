import React, { useContext, useMemo } from 'react';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { RiSparkling2Line } from 'react-icons/ri';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { secondTurnMoves } from '../../constants/groupedMoves';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getPrimaryAilmentColor } from '../../functions/getPrimaryAilmentColor';
import { LocationContext } from '../../hooks/LocationProvider';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Chip } from '../../uiComponents/Chip/Chip';
import { HpBar } from '../HpBar/HpBar';
import { ItemSprite } from '../ItemSprite/ItemSprite';
import { PrimaryAilmentIcon } from '../PrimaryAilmentIcon/PrimaryAilmentIcon';
import { XpBar } from '../XpBar/XpBar';

export const BattlePokemonInfo = ({ pokemon }: { pokemon: BattlePokemon }) => {
	const {
		saveFile: { playerId },
	} = useContext(SaveFileContext);
	const { level } = calculateLevelData(pokemon.xp, pokemon.growthRate);
	const {
		saveFile: { pokedex },
	} = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);

	const backgroundColor = useMemo(
		() => getPrimaryAilmentColor(pokemon.primaryAilment?.type),
		[pokemon]
	);

	if (pokemon.status === 'CAUGHT') {
		return <React.Fragment key={pokemon.id}></React.Fragment>;
	}
	return (
		<div
			style={{
				border: 'solid',
				borderWidth: backgroundColor === 'black' ? '0px' : '3px',
				borderColor: backgroundColor,
				display: 'flex',
				flexWrap: 'wrap',
				gap: '0.25rem',
				padding: '.25rem',
				borderRadius: '.25rem',
				backgroundColor: 'rgba(255,255,255,.8)',
			}}
			key={pokemon.id}
		>
			<strong style={{ display: 'flex', alignItems: 'center' }}>
				<PrimaryAilmentIcon primaryAilment={pokemon.primaryAilment} />
				{pokemon.data.name} | Lvl {level}{' '}
			</strong>
			{pokedex[pokemon.name].caughtOnRoutes.includes(location.mapId) &&
				pokemon.ownerId !== playerId && (
					<ItemSprite item={'poke-ball'} sizeFactor={0.5} />
				)}
			{pokemon.shiny && <RiSparkling2Line size={battleSpriteSize / 2} />}
			{pokemon.gender === 'MALE' && <IoMdMale size={battleSpriteSize / 2} />}
			{pokemon.gender === 'FEMALE' && (
				<IoMdFemale size={battleSpriteSize / 2} />
			)}
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
				<Chip key={pokemon.id + s.type}>
					<span>{s.type}</span>
				</Chip>
			))}
			{pokemon.protected && (
				<Chip>
					<span>Protected</span>
				</Chip>
			)}{' '}
			{pokemon.endured && (
				<Chip>
					<span>endured</span>
				</Chip>
			)}{' '}
			{pokemon.helpingHanded && (
				<Chip>
					<span>helping Hand</span>
				</Chip>
			)}
			<HpBar max={pokemon.stats.hp} damage={pokemon.damage} />
			{pokemon.ownerId === playerId && (
				<XpBar xp={pokemon.xp} growthRate={pokemon.growthRate} />
			)}
		</div>
	);
};
