import { useContext } from 'react';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { replaceRouteName } from '../../functions/replaceRouteName';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { useSwarmRadar } from '../../hooks/useSwarmRadar';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const SwarmRadar = () => {
	const { saveFile } = useContext(SaveFileContext);
	const { scan, activeSwarms } = useSwarmRadar();
	const navigate = useNavigate();
	return (
		<Page
			headline="Swarm Radar"
			goBack={() => navigate('SWARM_RADAR', 'OVERWORLD')}
		>
			<Stack mode="column">
				{!saveFile.currentSwarm && (
					<button onClick={() => scan('WEAK')}>Scan for Swarms</button>
				)}
				{saveFile.campUpgrades['upgraded swarm radar'] &&
					!saveFile.currentStrongSwarm && (
						<button onClick={() => scan('STRONG')}>
							<strong>Scan for stronger Swarms</strong>
						</button>
					)}
				{saveFile.campUpgrades['time distortion radar'] &&
					!saveFile.currentDistortionSwarm && (
						<button onClick={() => scan('DISTORTION')}>
							Scan for Distortions
						</button>
					)}
				{saveFile.campUpgrades['warden certification'] &&
					!saveFile.currentRampagingPokemon && (
						<button onClick={() => scan('RAMPAGE')}>
							Scan for Rampaging Pokemon
						</button>
					)}
				<h3>Active:</h3>
				{activeSwarms.map((a) => (
					<Card
						key={a.leavesAt}
						content={
							a.type === 'WEAK' || a.type === 'STRONG' ? (
								<strong>
									Swarm of {a.pokemon} at {replaceRouteName(a.route)}
								</strong>
							) : (
								<strong>
									{a.type} at {replaceRouteName(a.route)}
								</strong>
							)
						}
						actionElements={[]}
						icon={
							<PokemonSprite
								name={a.pokemon}
								config={{ officalArtwork: true }}
							/>
						}
					/>
				))}
				{saveFile.currentRampagingPokemon && (
					<Card
						key={saveFile.currentRampagingPokemon.id}
						content={
							<strong>
								Rampaging {saveFile.currentRampagingPokemon.name} at{' '}
								{replaceRouteName(saveFile.currentRampagingPokemon.route)}
							</strong>
						}
						actionElements={[]}
						icon={
							<PokemonSprite
								name={saveFile.currentRampagingPokemon.name}
								config={{ officalArtwork: true }}
							/>
						}
					/>
				)}
			</Stack>
		</Page>
	);
};
