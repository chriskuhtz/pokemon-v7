import { BattlePokemonInfo } from '../../../components/BattlePokemonInfo/BattlePokemonInfo';
import { isKO } from '../../../functions/isKo';
import { Message } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Page } from '../../../uiComponents/Page/Page';

export const RefillHandling = ({
	team,
	teamCanRefill,
	addMessage,
	putPokemonOnField,
}: {
	teamCanRefill: boolean;
	team: BattlePokemon[];
	addMessage: (x: Message) => void;
	putPokemonOnField: (id: string) => void;
}) => {
	if (teamCanRefill) {
		return (
			<Page headline="">
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
							gridTemplateColumns: '1fr 1fr',
							rowGap: '1rem',
						}}
					>
						{team.map((teamMember) => {
							if (teamMember.status === 'BENCH' && !isKO(teamMember)) {
								return (
									<BattlePokemonInfo
										onClick={() => {
											addMessage({
												message: `Lets go ${teamMember.data.name}`,
												onRemoval: () => putPokemonOnField(teamMember.id),
											});
										}}
										pokemon={teamMember}
									/>
								);
							}
						})}
					</div>
				</div>
			</Page>
		);
	}

	return <></>;
};
