import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { Message } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const RefillHandling = ({
	team,
	teamCanRefill,
	addMessage,
	putPokemonOnField,
	latestMessage,
	opponentCanRefill,
	opponents,
}: {
	teamCanRefill: boolean;
	team: BattlePokemon[];
	opponents: BattlePokemon[];
	addMessage: (x: Message) => void;
	putPokemonOnField: (id: string) => void;
	latestMessage: Message | undefined;
	opponentCanRefill: boolean;
}) => {
	if (teamCanRefill) {
		return (
			<div>
				Refill Time:
				{team.map((t) => {
					if (t.status === 'BENCH') {
						return (
							<img
								key={t.id}
								src={getPokemonSprite(t.dexId)}
								onClick={() =>
									addMessage({
										message: `Lets go ${t.data.name}`,
										onRemoval: () => putPokemonOnField(t.id),
									})
								}
							/>
						);
					}
				})}
				{latestMessage && <Banner>{latestMessage.message} </Banner>}
			</div>
		);
	}
	if (opponentCanRefill) {
		return (
			<div>
				Refill Oppos Time:
				{opponents.map((t) => {
					if (t.status === 'BENCH') {
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
				{latestMessage && <Banner>{latestMessage.message} </Banner>}
			</div>
		);
	}
	return <></>;
};
