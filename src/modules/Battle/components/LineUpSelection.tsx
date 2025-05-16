import { useCallback, useContext, useMemo } from 'react';
import {
	getPokemonSprite,
	PokemonSprite,
} from '../../../components/PokemonSprite/PokemonSprite';
import { Sprite } from '../../../components/Sprite/Sprite';
import { typeColors } from '../../../constants/typeColors';
import { determineRunawaySuccess } from '../../../functions/determineRunAwaySuccess';
import { getItemUrl } from '../../../functions/getItemUrl';
import { hexToRgb } from '../../../functions/hexToRGB';
import { isKO } from '../../../functions/isKo';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { TrainerInfo } from '../../../interfaces/Challenger';
import { IconSolarSystem } from '../../../uiComponents/IconSolarSystem/IconSolarSystem';

export const LineUpSelection = ({
	leave,
	opponents,
	team,
	fightersPerSide,
	toggleSelected,
	selectedTeam,
	startBattle,
	trainer,
}: {
	leave: () => void;
	opponents: BattlePokemon[];
	team: BattlePokemon[];
	fightersPerSide: number;
	selectedTeam: string[];
	toggleSelected: (id: string) => void;
	startBattle: () => void;
	trainer?: TrainerInfo;
}) => {
	const {
		saveFile: { pokedex, location },
	} = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);
	const battleButtonMessage = useMemo(() => {
		if (selectedTeam.length < fightersPerSide)
			return `select ${fightersPerSide - selectedTeam.length} more`;

		if (selectedTeam.length > fightersPerSide)
			return `select ${fightersPerSide - selectedTeam.length} less`;

		return 'Battle';
	}, [fightersPerSide, selectedTeam.length]);

	const tryToLeave = useCallback(() => {
		const canEscape = determineRunawaySuccess(team, opponents);

		if (canEscape) {
			addMessage({
				message: `escaped successfully`,
				needsNoConfirmation: true,
				onRemoval: () => leave(),
			});
		} else {
			addMessage({
				message: `could not escape, battle starts`,
				onRemoval: () => startBattle(),
			});
		}
	}, [addMessage, leave, opponents, startBattle, team]);

	const oppColor = useMemo(() => {
		const type = opponents.at(0)?.data.types.at(0)?.type.name ?? 'grass';

		return hexToRgb(typeColors[type], 0.5);
	}, [opponents]);
	const playerColor = useMemo(() => {
		const type = team.at(0)?.data.types.at(0)?.type.name ?? 'bug';

		return hexToRgb(typeColors[type], 0.5);
	}, [team]);

	return (
		<div style={{ background: 'white' }}>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gridTemplateRows: '1fr 1fr',
					height: '100dvh',
					justifyItems: 'center',
					alignItems: 'center',
					background: `linear-gradient(
					218deg,
					${oppColor} 0%,
					${playerColor} 100%
				)`,
				}}
			>
				<div
					style={{
						border: '2px solid black',
						borderRadius: '.5rem',
						padding: '0 1rem',
					}}
				>
					{trainer ? (
						<h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
							{' '}
							VS {trainer.name}{' '}
							{trainer.profilePicture ? (
								<img src={trainer.profilePicture} />
							) : (
								<Sprite
									canvasKey={trainer.name}
									id={trainer.sprite}
									rotating={false}
								/>
							)}
						</h2>
					) : (
						<h2>VS Wild Pokemon</h2>
					)}
					<h2>
						Its {fightersPerSide} v {fightersPerSide}
					</h2>
				</div>

				<div
					style={{
						display: 'grid',
						alignItems: 'center',
						gap: '1rem',
						gridTemplateColumns: '1fr 1fr 1fr',
					}}
				>
					{opponents.map((opponent) => (
						<IconSolarSystem
							key={opponent.id}
							sun={{
								url: trainer
									? getItemUrl('poke-ball')
									: getPokemonSprite(opponent.name, { shiny: opponent.shiny }),
							}}
							secondPlanetUrl={
								pokedex[opponent.name].caughtOnRoutes.includes(
									location.mapId
								) && !trainer
									? getItemUrl('poke-ball')
									: undefined
							}
						/>
					))}
				</div>
				<div
					style={{
						display: 'grid',
						alignItems: 'center',
						justifyContent: 'center',
						gridTemplateColumns: '1fr 1fr 1fr',
						columnGap: '2rem',
						rowGap: '.5rem',
					}}
				>
					{team
						.filter((t) => !isKO(t))
						.map((teamMember) => (
							<div
								role="button"
								onClick={() => toggleSelected(teamMember.id)}
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										toggleSelected(teamMember.id);
									}
								}}
								key={teamMember.id}
								style={{
									border: selectedTeam.includes(teamMember.id)
										? '2px solid black'
										: undefined,
									borderRadius: 9000,
									aspectRatio: '1/1',
									padding: '1rem',
								}}
							>
								<PokemonSprite
									config={{
										shiny: teamMember.shiny,
										back: true,
										grayscale: isKO(teamMember),
									}}
									name={teamMember.name}
								/>
							</div>
						))}
				</div>

				<div style={{ display: 'flex', gap: '1rem' }}>
					<button
						autoFocus
						onClick={startBattle}
						disabled={selectedTeam.length !== fightersPerSide}
					>
						{battleButtonMessage}
					</button>
					{!trainer && <button onClick={tryToLeave}>Try to escape</button>}
				</div>
			</div>
		</div>
	);
};
