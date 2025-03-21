import { CSSProperties } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { nameToIdMap, PokemonName } from '../../constants/pokemonNames';

export const getPokemonSprite = (name: PokemonName, back?: boolean): string => {
	const id = nameToIdMap[name];
	//if (gif) {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${
		back ? `back/` : ''
	}${id}.gif`;
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
}: {
	name: PokemonName;
	sizeFactor?: number;
	style?: CSSProperties;
	back?: boolean;
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
			src={getPokemonSprite(name, back)}
			height={battleSpriteSize * (sizeFactor ?? 1)}
			width={battleSpriteSize * (sizeFactor ?? 1)}
			style={style}
		/>
	);
};
