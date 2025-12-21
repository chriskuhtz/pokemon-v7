import { CSSProperties } from 'react';
import { baseInternalDex } from '../../constants/baseInternalDex';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { PokemonName } from '../../constants/pokemonNames';
import { PokemonType } from '../../interfaces/PokemonType';

export const getPokemonSprite = (
	name: PokemonName,
	config?: {
		back?: boolean;
		shiny?: boolean;
		grayscale?: boolean;
		officalArtwork?: boolean;
		spriteGeneration?: 1;
	}
): string => {
	const id = baseInternalDex[name].dexId;

	if (config?.spriteGeneration === 1) {
		if (config.back) {
			return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/back/${id}.png`;
		}
		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${id}.png`;
	}

	if (id > 905 || config?.officalArtwork) {
		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
			config?.shiny ? `shiny/` : ''
		}${id}.png`;
	}

	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${
		config?.back ? `back/` : ''
	}${config?.shiny ? `shiny/` : ''}${id}.gif`;
};

export interface PokemonSpriteProps {
	name: PokemonName;
	sizeFactor?: number;
	style?: CSSProperties;
	config?: {
		back?: boolean;
		shiny?: boolean;
		grayscale?: boolean;
		officalArtwork?: boolean;
		spriteGeneration?: 1;
	};
	onClick?: () => void;
	className?: string;
}

export const PokemonSprite = ({
	name,
	sizeFactor,
	style,
	onClick,
	className,
	config,
}: PokemonSpriteProps) => {
	return (
		<img
			className={className}
			onClick={onClick}
			onKeyDown={(e) => {
				if (onClick && e.key === 'Enter') {
					onClick();
				}
			}}
			src={getPokemonSprite(name, config)}
			height={battleSpriteSize * (sizeFactor ?? 1)}
			width={battleSpriteSize * (sizeFactor ?? 1)}
			style={{
				...(style ?? {}),
				filter: config?.grayscale ? 'grayscale(1)' : undefined,
			}}
		/>
	);
};

export type AnimationName =
	| 'GROW'
	| 'SHRINK'
	| 'PLAYER_ATTACK'
	| 'OPPONENT_ATTACK'
	| 'FAINT'
	| 'STRUGGLE';
export interface AnimationProps {
	animationName?: AnimationName;
	attackType?: PokemonType;
}

export const AnimatedSprite = (
	props: PokemonSpriteProps & { animation?: AnimationProps }
) => {
	return (
		<div
			style={{
				animationName: props.animation?.animationName,
				animationDuration: '1s',
			}}
		>
			<PokemonSprite {...props} />
		</div>
	);
};
