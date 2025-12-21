import { HpBar } from '../../../components/HpBar/HpBar';
import { PokemonSprite } from '../../../components/PokemonSprite/PokemonSprite';
import { PrimaryAilmentIcon } from '../../../components/PrimaryAilmentIcon/PrimaryAilmentIcon';
import { isKO } from '../../../functions/isKo';
import { Message } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Card } from '../../../uiComponents/Card/Card';
import { Page } from '../../../uiComponents/Page/Page';
import { Stack } from '../../../uiComponents/Stack/Stack';

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
				<Stack mode="column">
					Who will you send out next:
					{team.map((teamMember) => {
						if (teamMember.status === 'BENCH' && !isKO(teamMember)) {
							return (
								<Card
									onClick={() => {
										addMessage({
											message: `Lets go ${teamMember.data.name}`,
											onRemoval: () => putPokemonOnField(teamMember.id),
										});
									}}
									content={
										<div>
											<h4>
												{teamMember.name}{' '}
												{teamMember.primaryAilment && (
													<PrimaryAilmentIcon
														primaryAilment={teamMember.primaryAilment}
													/>
												)}
											</h4>
											<HpBar
												max={teamMember.stats.hp}
												damage={teamMember.damage}
											/>
										</div>
									}
									actionElements={[]}
									icon={
										<PokemonSprite
											name={teamMember.name}
											config={{
												grayscale: isKO(teamMember),
												shiny: teamMember.shiny,
											}}
										/>
									}
								/>
							);
						}
					})}
				</Stack>
			</Page>
		);
	}

	return <></>;
};
