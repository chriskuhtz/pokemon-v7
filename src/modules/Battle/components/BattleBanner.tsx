import { PokemonIconBanner } from '../../../components/PokemonIconBanner/PokemonIconBanner';
import { battleSpriteSize } from '../../../constants/gameData';
import { secondTurnMoves } from '../../../constants/secondTurnMoves';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattleAction } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Banner } from '../../../uiComponents/Banner/Banner';
import { BattleStep } from '../types/BattleStep';
import { MoveExecutionBanner } from './MoveExecutionBanner';
import { MoveMissedBanner } from './MoveMissedBanner';

export const BattleBanner = ({
	opponent,
	player,
	battleStep,
	voidSteps,
	nextMove,
}: {
	opponent: BattlePokemon;
	player: BattlePokemon;
	battleStep: BattleStep;
	voidSteps: BattleStep[];
	nextMove: BattleAction | undefined;
}) => {
	if (voidSteps.includes(battleStep)) {
		return <div></div>;
	}
	if (battleStep === 'OPPONENT_INTRO') {
		return (
			<PokemonIconBanner
				message={`Encountered a wild ${opponent.data.name}`}
				pokemon={opponent}
			/>
		);
	}
	if (battleStep === 'PLAYER_INTRO') {
		return (
			<PokemonIconBanner
				flexDirection="row-reverse"
				message={`Let's Go ${player.data.name}`}
				pokemon={player}
			/>
		);
	}

	if (battleStep === 'EXECUTE_PLAYER_MOVE' && nextMove?.type === 'ChargeUp') {
		if (secondTurnMoves.includes(nextMove.name)) {
			const message = () => {
				if (nextMove.name === 'fly') {
					return <span>{player.data.name} flew up high</span>;
				}
				return (
					<span>
						{player.data.name} is charging up {nextMove.name}
					</span>
				);
			};
			return (
				<Banner flexDirection={'row'}>
					<img
						height={battleSpriteSize}
						width={battleSpriteSize}
						src={getPokemonSprite(player.dexId)}
					/>
					<h3>{message()}</h3>
				</Banner>
			);
		}
	}
	if (battleStep === 'EXECUTE_OPPONENT_MOVE' && nextMove?.type === 'ChargeUp') {
		if (secondTurnMoves.includes(nextMove.name)) {
			const message = () => {
				if (nextMove.name === 'fly') {
					return <span>{opponent.data.name} flew up high</span>;
				}
				return (
					<span>
						{opponent.data.name} is charging up {nextMove.name}
					</span>
				);
			};
			return (
				<Banner flexDirection={'row-reverse'}>
					<img
						height={battleSpriteSize}
						width={battleSpriteSize}
						src={getPokemonSprite(opponent.dexId)}
					/>
					<h3>{message()}</h3>
				</Banner>
			);
		}
	}

	if (
		battleStep === 'EXECUTE_PLAYER_MOVE' &&
		nextMove?.type === 'BattleAttack' &&
		opponent
	) {
		return (
			<MoveExecutionBanner
				target={opponent}
				attacker={player}
				attack={nextMove}
				spriteFirst={true}
			/>
		);
	}
	if (
		battleStep === 'EXECUTE_OPPONENT_MOVE' &&
		nextMove?.type === 'BattleAttack'
	) {
		return (
			<MoveExecutionBanner
				attacker={opponent}
				target={player}
				attack={nextMove}
			/>
		);
	}
	if (battleStep === 'OPPONENT_FLINCHED') {
		return (
			<PokemonIconBanner
				message={`${opponent.data.name} flinched`}
				pokemon={opponent}
			/>
		);
	}
	if (battleStep === 'PLAYER_FLINCHED') {
		return (
			<PokemonIconBanner
				message={`${player.data.name} flinched`}
				pokemon={player}
				flexDirection="row-reverse"
			/>
		);
	}

	if (battleStep === 'OPPONENT_UNABLE_TO_ATTACK') {
		const ailmentMessage = () => {
			if (opponent.primaryAilment?.type === 'freeze') {
				return 'is frozen solid';
			}
			if (opponent.primaryAilment?.type === 'paralysis') {
				return 'is fully paralyzed';
			}
			return 'why did you show this';
		};
		return (
			<PokemonIconBanner
				message={`${opponent.data.name} ${ailmentMessage()}`}
				pokemon={opponent}
			/>
		);
	}
	if (battleStep === 'PLAYER_UNABLE_TO_ATTACK') {
		const ailmentMessage = () => {
			if (player.primaryAilment?.type === 'freeze') {
				return 'is frozen solid';
			}
			if (player.primaryAilment?.type === 'paralysis') {
				return 'is fully paralyzed';
			}
			return 'why did you show this';
		};
		return (
			<PokemonIconBanner
				message={`${player.data.name} ${ailmentMessage()}`}
				pokemon={player}
				flexDirection="row-reverse"
			/>
		);
	}
	if (battleStep === 'OPPONENT_MISSED') {
		return <MoveMissedBanner attacker={opponent} />;
	}
	if (battleStep === 'PLAYER_MISSED') {
		return <MoveMissedBanner attacker={player} />;
	}
	if (
		battleStep === 'EXECUTE_PLAYER_MOVE' &&
		nextMove?.type === 'InBattleItem'
	) {
		return (
			<Banner>
				You used a {nextMove.item} to heal {player.data.name}
				<img
					style={{ padding: '1rem 0' }}
					width={battleSpriteSize / 2}
					height={battleSpriteSize / 2}
					src={getItemUrl(nextMove.item)}
				/>
			</Banner>
		);
	}
	if (
		battleStep === 'CATCHING_PROCESS_1' &&
		nextMove?.type === 'CatchProcessInfo'
	) {
		return (
			<Banner>
				You throw a {nextMove.ball} at the wild {opponent.data.name}
				<img
					style={{ padding: '1rem 0' }}
					width={battleSpriteSize / 2}
					height={battleSpriteSize / 2}
					src={getItemUrl(nextMove.ball)}
				/>
			</Banner>
		);
	}
	if (battleStep === 'CATCHING_SUCCESS') {
		return (
			<Banner>
				<h2>The wild {opponent.data.name} was caught!</h2>
			</Banner>
		);
	}
	if (battleStep === 'CATCHING_FAILURE') {
		return (
			<Banner>
				<h2> {opponent.data.name} broke free!</h2>
			</Banner>
		);
	}
	if (battleStep === 'PLAYER_FAINTING') {
		return (
			<Banner>
				{' '}
				<img
					height={battleSpriteSize}
					width={battleSpriteSize}
					src={getPokemonSprite(player.dexId)}
					style={{ filter: 'grayScale(1)' }}
				/>
				{player.data.name} fainted
			</Banner>
		);
	}
	if (battleStep === 'OPPONENT_FAINTING') {
		return (
			<Banner>
				{opponent.data.name} fainted
				<img
					height={battleSpriteSize}
					width={battleSpriteSize}
					src={getPokemonSprite(opponent.dexId)}
					style={{ filter: 'grayScale(1)' }}
				/>
			</Banner>
		);
	}
	if (battleStep === 'BATTLE_WON') {
		return (
			<Banner>
				<h2>You won the Battle</h2>
			</Banner>
		);
	}
	if (battleStep === 'BATTLE_LOST') {
		return (
			<Banner>
				<h2>You lost the Battle</h2>
			</Banner>
		);
	}

	return <></>;
};
