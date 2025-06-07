import { maxBst } from '../../../constants/baseStatRecord';
import { portraitMode } from '../../../constants/gameData';
import { PokemonName } from '../../../constants/pokemonNames';
import { typeColors, typeContrastColors } from '../../../constants/typeColors';
import {
	getHighestStat,
	HIDDEN_STATS_FOR_TOTAL,
} from '../../../functions/getHighestStat';
import { getStats } from '../../../functions/getStats';
import { sumOfIvs } from '../../../functions/sumOfIvs';
import { Nature, natures } from '../../../interfaces/Natures';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { PokemonType } from '../../../interfaces/PokemonType';
import { StatObject } from '../../../interfaces/StatObject';
import { AnimatedBar } from '../../../uiComponents/AnimatedBar/AnimatedBar';
import { Card } from '../../../uiComponents/Card/Card';
import { Chip } from '../../../uiComponents/Chip/Chip';
import { Stack } from '../../../uiComponents/Stack/Stack';

export const HIDDEN_STATS = ['accuracy', 'evasion'];

export const StatDisplay = ({
	ownedPokemon,
	data,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
}) => {
	return (
		<div style={{ maxWidth: '100dvw' }}>
			<Stack mode="column">
				<NatureSection nature={ownedPokemon.nature} />
				<BstSection data={data} ownedPokemon={ownedPokemon} />
				<EVsSection
					type={data.types[0].type.name}
					effortValues={ownedPokemon.effortValues}
				/>
				<IVsSection
					name={ownedPokemon.name}
					type={data.types[0].type.name}
					intrinsicValues={ownedPokemon.intrinsicValues}
				/>
			</Stack>
		</div>
	);
};
const BstSection = ({
	ownedPokemon,
	data,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
}) => {
	return (
		<div
			style={{
				padding: '.5rem',
				border: '1px solid black',
				borderRadius: '1rem',
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
			}}
		>
			<strong
				style={{
					padding: '1rem .5rem',
				}}
			>
				Total Stats:
			</strong>
			<div
				style={{
					padding: '.5rem',
					display: 'grid',
					gap: '1.5rem',
					gridTemplateColumns: portraitMode ? '1fr' : '1fr 1fr 1fr',
					alignItems: 'center',
				}}
			>
				{Object.entries(
					getStats(
						data.stats,
						ownedPokemon.xp,
						ownedPokemon.growthRate,
						ownedPokemon.nature,
						ownedPokemon.effortValues
					)
				)
					.sort()
					.map(([stat, value]) => {
						const highestStat = getHighestStat({ ownedPokemon, data })[1];

						if (!HIDDEN_STATS_FOR_TOTAL.includes(stat)) {
							return (
								<Chip
									key={stat}
									style={{
										width: `calc(100% / ${highestStat} * ${value})`,
										backgroundColor: typeColors[data.types[0].type.name],
										color: typeContrastColors[data.types[0].type.name],
									}}
								>
									<>
										{stat}: {value}
									</>
								</Chip>
							);
						}
					})}
			</div>
			<p>
				Total Base Stats (equal for all {ownedPokemon.name}), compared to the
				strongest Pokemon:
			</p>
			<AnimatedBar
				max={maxBst}
				offset={
					maxBst -
					data.stats.reduce((sum, summand) => {
						if (HIDDEN_STATS.includes(summand.stat.name)) {
							return sum;
						}
						return sum + summand.base_stat;
					}, 0)
				}
			/>
		</div>
	);
};
const EVsSection = ({
	effortValues,
	type,
}: {
	type: PokemonType;
	effortValues: StatObject;
}) => {
	return (
		<div
			style={{
				padding: '.5rem',
				border: '1px solid black',
				borderRadius: '1rem',
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
			}}
		>
			<strong
				style={{
					padding: '1rem .5rem',
				}}
			>
				Effort Values:
			</strong>
			<div
				style={{
					padding: '.5rem',
					display: 'grid',
					gap: '1.5rem',
					gridTemplateColumns: portraitMode ? '1fr' : '1fr 1fr 1fr',
					alignItems: 'center',
				}}
			>
				{Object.entries(effortValues)
					.sort()
					.map(([stat, value]) => {
						const highestStat = 255;

						if (!HIDDEN_STATS.includes(stat)) {
							return (
								<Chip
									key={stat}
									style={{
										width: `calc(100% / ${highestStat} * ${value})`,
										backgroundColor: typeColors[type],
										color: typeContrastColors[type],
									}}
								>
									<>
										{stat}: {value}
									</>
								</Chip>
							);
						}
					})}
			</div>
			<p>
				Increased by battling or items,up to 510, different opponents boost
				different stats
			</p>
			<AnimatedBar
				max={510}
				offset={
					510 -
					Object.entries(effortValues).reduce((sum, summand) => {
						if (HIDDEN_STATS.includes(summand[0])) {
							return sum;
						}
						return sum + summand[1];
					}, 0)
				}
			/>
		</div>
	);
};
const IVsSection = ({
	intrinsicValues,
	type,
	name,
}: {
	type: PokemonType;
	intrinsicValues: StatObject;
	name: PokemonName;
}) => {
	return (
		<div
			style={{
				padding: '.5rem',
				border: '1px solid black',
				borderRadius: '1rem',
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
			}}
		>
			<strong
				style={{
					padding: '1rem .5rem',
				}}
			>
				Individual Values:
			</strong>

			<div
				style={{
					padding: '.5rem',
					display: 'grid',
					gap: '1.5rem',
					gridTemplateColumns: portraitMode ? '1fr' : '1fr 1fr 1fr',
					alignItems: 'center',
				}}
			>
				{Object.entries(intrinsicValues)
					.sort()
					.map(([stat, value]) => {
						const highestStat = 31;

						if (!HIDDEN_STATS.includes(stat)) {
							return (
								<Chip
									key={stat}
									style={{
										width: `calc(100% / ${highestStat} * ${value})`,
										backgroundColor: typeColors[type],
										color: typeContrastColors[type],
									}}
								>
									<>
										{stat}: {value}
									</>
								</Chip>
							);
						}
					})}
			</div>
			<p>Your {name}´s unique values</p>
			<AnimatedBar max={186} offset={186 - sumOfIvs(intrinsicValues)} />
		</div>
	);
};
export const NatureSection = ({ nature }: { nature: Nature }) => {
	const mods = natures[nature];
	return (
		<Card
			actionElements={[]}
			icon={<h3>+/-</h3>}
			content={
				<>
					<strong
						style={{
							display: 'flex',
							gap: '.5rem',
							alignItems: 'center',
						}}
					>
						<span>{nature} Nature: </span>
						<span>{!mods.buff && <p>Neutral Nature</p>}</span>
						<span>{mods.buff && <p>+ 10% {mods.buff}</p>} </span>
						<span>{mods.debuff && <p>- 10% {mods.debuff}</p>}</span>
					</strong>
				</>
			}
		/>
	);
};
