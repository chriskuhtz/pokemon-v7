import { CSSProperties } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { nameToIdMap, PokemonName } from '../../constants/pokemonNames';

export const getPokemonSprite = (
	name: PokemonName,
	config: { back?: boolean; shiny?: boolean }
): string => {
	const id = nameToIdMap[name];
	//if (gif) {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${
		config.back ? `back/` : ''
	}${config.shiny ? `shiny/` : ''}${id}.gif`;
	// }
	// if (mode === 'back') {
	// 	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
	// }
	// return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const PokemonSprite = ({
	name,
	sizeFactor,
	style,
	back,
	onClick,
	className,
	shiny,
}: {
	name: PokemonName;
	sizeFactor?: number;
	style?: CSSProperties;
	back?: boolean;
	shiny?: boolean;
	onClick?: () => void;
	className?: string;
}) => {
	return (
		<img
			className={className}
			onClick={onClick}
			onKeyDown={(e) => {
				if (onClick && e.key === 'Enter') {
					onClick();
				}
			}}
			src={getPokemonSprite(name, { back: back, shiny: shiny })}
			height={battleSpriteSize * (sizeFactor ?? 1)}
			width={battleSpriteSize * (sizeFactor ?? 1)}
			style={style}
		/>
	);
};
