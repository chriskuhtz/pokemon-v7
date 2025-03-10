import { baseSize } from '../../../constants/gameData';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { isKO } from '../../../functions/isKo';
import { Message } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const RefillHandling = ({
	team,
	teamCanRefill,
	addMessage,
	putPokemonOnField,
	opponentCanRefill,
	opponents,
}: {
	teamCanRefill: boolean;
	team: BattlePokemon[];
	opponents: BattlePokemon[];
	addMessage: (x: Message) => void;
	putPokemonOnField: (id: string) => void;
	opponentCanRefill: boolean;
}) => {
	if (teamCanRefill) {
		return (
			<div
				style={{
					border: '2px solid black',
					margin: '4rem',
					maxHeight: 'calc(100dvh - 8rem)',
					padding: '2rem',
					borderRadius: '1rem',
				}}
			>
				Who will you send out next:
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr',
						rowGap: '1rem',
					}}
				>
					{team.map((teamMember) => {
						if (teamMember.status === 'BENCH' && !isKO(teamMember)) {
							return (
								<img
									style={{
										borderRadius: 9000,
										padding: '1rem',
										filter: isKO(teamMember) ? 'grayscale(1)' : undefined,
									}}
									role="button"
									onClick={() =>
										addMessage({
											message: `Lets go ${teamMember.data.name}`,
											onRemoval: () => putPokemonOnField(teamMember.id),
										})
									}
									tabIndex={0}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											addMessage({
												message: `Lets go ${teamMember.data.name}`,
												onRemoval: () => putPokemonOnField(teamMember.id),
											});
										}
									}}
									key={teamMember.id}
									height={baseSize}
									src={getPokemonSprite(teamMember.dexId)}
								/>
							);
						}
					})}
				</div>
			</div>
		);
	}
	if (opponentCanRefill) {
		return (
			<div>
				Refill Oppos Time:
				{opponents.map((t) => {
					if (t.status === 'BENCH' && !isKO(t)) {
						return (
							<img
								key={t.id}
								src={getPokemonSprite(t.dexId)}
								onClick={() =>
									addMessage({
										message: `Wild ${t.data.name} appears`,
										onRemoval: () => putPokemonOnField(t.id),
									})
								}
							/>
						);
					}
				})}
			</div>
		);
	}
	return <></>;
};
