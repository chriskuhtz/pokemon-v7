import { useMemo, useState } from 'react';
import { getOpponentPokemon } from '../../functions/getOpponentPokemon';
import { getPlayerPokemon } from '../../functions/getPlayerPokemon';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { BattlePokemon } from '../../interfaces/BattlePokemon';

export const BattleField = ({
	leave,
	initOpponents,
	initTeam,
	fightersPerSide,
}: {
	leave: () => void;
	initOpponents: BattlePokemon[];
	initTeam: BattlePokemon[];
	fightersPerSide: number;
}) => {
	const [pokemon, setPokemon] = useState<BattlePokemon[]>([
		...initOpponents,
		...initTeam,
	]);

	const opponents = useMemo(() => getOpponentPokemon(pokemon), [pokemon]);
	const team = useMemo(() => getPlayerPokemon(pokemon), [pokemon]);

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateRows: '2fr 2fr 1fr',
				height: '100dvh',
			}}
		>
			<div>
				{opponents.map((t) => (
					<img key={t.id} src={getPokemonSprite(t.dexId)} />
				))}
			</div>
			<div>
				{team.map((t) => (
					<img key={t.id} src={getPokemonSprite(t.dexId)} />
				))}
			</div>
			<div style={{ border: '1px solid black' }}>YAYAYA</div>
		</div>
	);
};
