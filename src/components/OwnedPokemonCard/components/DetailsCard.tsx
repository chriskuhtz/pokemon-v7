import { useContext } from 'react';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { getStats } from '../../../functions/getStats';
import { getTypeNames } from '../../../functions/getTypeNames';
import { replaceRouteName } from '../../../functions/replaceRouteName';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { Card } from '../../../uiComponents/Card/Card';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { AbilityInfoButton } from '../../AbilityInfoButton/AbilityInfoButton';
import { HappinessIcon } from '../../HappinessIcon/HappinessIcon';
import { HpBar } from '../../HpBar/HpBar';
import { PrimaryAilmentIcon } from '../../PrimaryAilmentIcon/PrimaryAilmentIcon';
import { XpBar } from '../../XpBar/XpBar';

export const DetailsCard = ({
	ownedPokemon,
	data,
	setNickName,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	setNickName: (x: string | undefined) => void;
}) => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const typeNames = getTypeNames({ ...ownedPokemon, data });
	const { level } = calculateLevelData(
		ownedPokemon.xp,
		ownedPokemon.growthRate
	);
	return (
		<Card
			icon={undefined}
			content={
				<Stack mode="column">
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginBottom: 16,
							paddingRight: 16,
						}}
					>
						<HappinessIcon value={ownedPokemon.happiness} />
					</div>

					<HpBar
						max={
							getStats(
								data.stats,
								ownedPokemon.xp,
								ownedPokemon.growthRate,
								ownedPokemon.nature,
								ownedPokemon.effortValues,
								saveFile.settings
							).hp
						}
						damage={ownedPokemon.damage}
					/>
					<XpBar xp={ownedPokemon.xp} growthRate={ownedPokemon.growthRate} />
					<h4>
						Lvl {level} {data.name}{' '}
						<PrimaryAilmentIcon primaryAilment={ownedPokemon.primaryAilment} />
					</h4>

					<input
						placeholder="Nickname"
						value={ownedPokemon.nickname}
						onChange={(e) => setNickName(e.target.value)}
					/>
					<h4 style={{ display: 'flex', alignItems: 'center' }}>
						ability: {ownedPokemon.ability}{' '}
						<AbilityInfoButton small abilityName={ownedPokemon.ability} />
					</h4>
					<h4>type: {typeNames.join('/')} </h4>

					{ownedPokemon.weightModifier && (
						<h4>rel. Weight: {ownedPokemon.weightModifier.toFixed(2)}</h4>
					)}
					{ownedPokemon.heightModifier && (
						<h4>rel. Height: {ownedPokemon.heightModifier.toFixed(2)}</h4>
					)}
					<h4>Gender: {ownedPokemon.gender}</h4>
					<h4>Caught at: {replaceRouteName(ownedPokemon.caughtOnMap)}</h4>
					<h4>{ownedPokemon.starter ? 'Your first Pokemon' : ''}</h4>

					{saveFile.settings?.releasePokemonInTeamOverview && (
						<button
							onClick={() => {
								patchSaveFileReducer({
									pokemon: saveFile.pokemon.filter(
										(p) => p.id !== ownedPokemon?.id
									),
								});
							}}
						>
							Release this Pokemon
						</button>
					)}
				</Stack>
			}
			actionElements={[]}
		></Card>
	);
};
