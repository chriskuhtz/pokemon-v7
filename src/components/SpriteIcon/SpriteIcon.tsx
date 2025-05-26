export const SpriteIcon = ({ sprite }: { sprite: string }) => {
	return (
		<div
			style={{
				backgroundImage: `url("/npcs/NPC_${sprite}.png")`,
				height: '64px',
				width: '64px',
			}}
		/>
	);
};
