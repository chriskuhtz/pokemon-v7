import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { MoveName } from '../../../constants/checkLists/movesCheckList';
import { battleSpriteSize, portraitMode } from '../../../constants/gameData';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { getHeldItem } from '../../../functions/getHeldItem';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getStats } from '../../../functions/getStats';
import { getTypeNames } from '../../../functions/getTypeNames';
import { isOwnedPokemonKO } from '../../../functions/isKo';
import { replaceRouteName } from '../../../functions/replaceRouteName';
import { EvolutionReducerPayload } from '../../../hooks/useSaveFile';
import { Inventory } from '../../../interfaces/Inventory';
import { isKeyItem, ItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { IconSolarSystem } from '../../../uiComponents/IconSolarSystem/IconSolarSystem';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { AbilityInfoButton } from '../../AbilityInfoButton/AbilityInfoButton';
import { HappinessIcon } from '../../HappinessIcon/HappinessIcon';
import { HpBar } from '../../HpBar/HpBar';
import { ItemSelectionListModal } from '../../ItemSelectionListModal/ItemSelectionListModal';
import { getPokemonSprite } from '../../PokemonSprite/PokemonSprite';
import { PrimaryAilmentIcon } from '../../PrimaryAilmentIcon/PrimaryAilmentIcon';
import { XpBar } from '../../XpBar/XpBar';
import { EvoInfo } from './EvoInfo';
import { MovesDisplay } from './MovesDisplay';
import { NickNameModal } from './NickNameModal';
import { StatDisplay } from './StatDisplay';

export const OwnedPokemonCardContent = ({
	ownedPokemon,
	data,
	takeHeldItem,
	giveHeldItem,
	inventory,
	setMoves,
	setNickName,
	evolve,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	giveHeldItem: (newItem: ItemType) => void;
	takeHeldItem: () => void;
	inventory: Inventory;
	setMoves: (id: string, moves: MoveName[]) => void;
	setNickName: (x: string | undefined) => void;
	evolve: (x: EvolutionReducerPayload) => void;
}) => {
	const [heldItemMenuOpen, setHeldItemMenuOpen] = useState<boolean>(false);
	const [nickNameMenuOpen, setNickNameMenuOpen] = useState<boolean>(false);

	const typeNames = getTypeNames({ ...ownedPokemon, data });
	const { level } = calculateLevelData(
		ownedPokemon.xp,
		ownedPokemon.growthRate
	);

	const heldItem = getHeldItem(ownedPokemon);

	return (
		<React.Fragment>
			<NickNameModal
				open={nickNameMenuOpen}
				close={() => setNickNameMenuOpen(false)}
				nickname={ownedPokemon.nickname}
				setNickName={setNickName}
			/>
			<ItemSelectionListModal
				selected={heldItem ? [heldItem] : []}
				open={heldItemMenuOpen}
				close={() => setHeldItemMenuOpen(false)}
				options={
					[
						getHeldItem(ownedPokemon),
						...Object.entries(inventory)
							.filter(([item, amount]) => !isKeyItem(item) && amount > 0)
							.map(([item]) => item),
					].filter((s) => s !== undefined) as ItemType[]
				}
				min={1}
				max={1}
				toggle={(item) => {
					if (getHeldItem(ownedPokemon)) {
						takeHeldItem();
					}
					if (item !== getHeldItem(ownedPokemon)) {
						giveHeldItem(item as ItemType);
					}

					setHeldItemMenuOpen(false);
				}}
			/>
			<Stack mode="column">
				<div
					style={{
						paddingLeft: portraitMode ? 0 : '.5rem',
						display: 'grid',
						gap: portraitMode ? '.5rem' : '1.5rem',
						gridTemplateColumns: portraitMode ? '1fr' : '1fr 4fr 3fr 1fr',
						alignItems: 'center',
						justifyItems: 'center',
						marginBottom: portraitMode ? '3rem' : 0,
					}}
				>
					<IconSolarSystem
						sun={{
							url: getPokemonSprite(ownedPokemon.name, {
								shiny: ownedPokemon.shiny,
							}),
							styles: isOwnedPokemonKO(ownedPokemon)
								? { filter: 'grayscale(1)' }
								: undefined,
						}}
						firstPlanet={`/typeIcons/${typeNames[0]}.png`}
						secondPlanetUrl={
							typeNames.length > 1
								? `/typeIcons/${typeNames[1]}.png`
								: undefined
						}
						thirdPlanetUrl={getItemUrl(ownedPokemon.ball)}
						fourthPlanetUrl={heldItem ? getItemUrl(heldItem) : undefined}
					/>
					<div>
						<HpBar
							max={
								getStats(
									data.stats,
									ownedPokemon.xp,
									ownedPokemon.growthRate,
									ownedPokemon.nature,
									ownedPokemon.effortValues
								).hp
							}
							damage={ownedPokemon.damage}
						/>
						<XpBar xp={ownedPokemon.xp} growthRate={ownedPokemon.growthRate} />

						<PrimaryAilmentIcon primaryAilment={ownedPokemon.primaryAilment} />

						<h5 style={{ display: 'flex', gap: '.5rem' }}>
							Held Item: {heldItem ?? '-'}{' '}
							<MdEdit
								size={battleSpriteSize / 2}
								onClick={() => setHeldItemMenuOpen(true)}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => {
									e.stopPropagation();
									if (e.key === 'Enter') {
										setHeldItemMenuOpen(true);
									}
								}}
							/>
						</h5>
					</div>

					<div>
						<h4>
							Lvl {level} {ownedPokemon.nickname ?? data.name}/{data.name}{' '}
							<MdEdit
								role="button"
								tabIndex={0}
								size={battleSpriteSize / 2}
								onClick={() => setNickNameMenuOpen(true)}
								onKeyDown={(e) => {
									e.stopPropagation();
									if (e.key === 'Enter') {
										setNickNameMenuOpen(true);
									}
								}}
							/>
						</h4>
						<h5 style={{ display: 'flex', alignItems: 'center' }}>
							ability: {ownedPokemon.ability}{' '}
							<AbilityInfoButton small abilityName={ownedPokemon.ability} />
						</h5>
						<h5>type: {typeNames.join('/')} </h5>

						{ownedPokemon.weightModifier && (
							<h5>rel. Weight: {ownedPokemon.weightModifier.toFixed(2)}</h5>
						)}
						{ownedPokemon.heightModifier && (
							<h5>rel. Height: {ownedPokemon.heightModifier.toFixed(2)}</h5>
						)}
						<h5>Gender: {ownedPokemon.gender}</h5>
						<h5>Caught at: {replaceRouteName(ownedPokemon.caughtOnMap)}</h5>
						<h5>{ownedPokemon.starter ? 'Your first Pokemon' : ''}</h5>
					</div>
					<div>
						<HappinessIcon value={ownedPokemon.happiness} />
					</div>
				</div>
				<MovesDisplay
					ownedPokemon={ownedPokemon}
					setMoves={setMoves}
					onlyCurrent
				/>
				<StatDisplay ownedPokemon={ownedPokemon} data={data} />{' '}
				<EvoInfo
					ownedPokemon={ownedPokemon}
					data={data}
					inventory={inventory}
					evolve={evolve}
				/>
			</Stack>
		</React.Fragment>
	);
};
