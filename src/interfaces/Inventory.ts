import { isItem, ItemType } from './Item';

export type Inventory = Record<ItemType, number>;

export const EmptyInventory: Inventory = {
	'master-ball': 0,
	'poke-ball': 0,
	'great-ball': 0,
	'ultra-ball': 0,
	'safari-ball': 0,
	'net-ball': 0,
	'dive-ball': 0,
	'nest-ball': 0,
	'timer-ball': 0,
	'luxury-ball': 0,
	'repeat-ball': 0,
	'dusk-ball': 0,
	'heal-ball': 0,
	'quick-ball': 0,
	'cherish-ball': 0,
	'premier-ball': 0,
	potion: 0,
	repel: 0,
	'max-repel': 0,
	'super-repel': 0,
	antidote: 0,
	'burn-heal': 0,
	awakening: 0,
	'ice-heal': 0,
	'paralyze-heal': 0,
	'full-restore': 0,
	'hyper-potion': 0,
	'max-potion': 0,
	'super-potion': 0,
	'full-heal': 0,
	'max-revive': 0,
	revive: 0,
	'fresh-water': 0,
	'soda-pop': 0,
	lemonade: 0,
	'moomoo-milk': 0,
	'energy-powder': 0,
	'energy-root': 0,
	'heal-powder': 0,
	'revival-herb': 0,
	elixir: 0,
	ether: 0,
	'max-elixir': 0,
	'max-ether': 0,
	'lava-cookie': 0,
	'berry-juice': 0,
	'sacred-ash': 0,
	calcium: 0,
	iron: 0,
	'hp-up': 0,
	protein: 0,
	carbos: 0,
	zinc: 0,
	'rare-candy': 0,
	'pp-max': 0,
	'pp-up': 0,
	'old-gateau': 0,
	'x-accuracy': 0,
	'x-attack': 0,
	'x-defense': 0,
	'x-sp-atk': 0,
	'x-sp-def': 0,
	'x-speed': 0,
	'dire-hit': 0,
	'guard-spec': 0,
	'poke-doll': 0,
	'fluffy-tail': 0,
	'blue-flute': 0,
	'red-flute': 0,
	'yellow-flute': 0,
	'white-flute': 0,
	'black-flute': 0,
	'sun-stone': 0,
	'thunder-stone': 0,
	'fire-stone': 0,
	'water-stone': 0,
	'leaf-stone': 0,
	'moon-stone': 0,
	'dawn-stone': 0,
	'dusk-stone': 0,
	'shiny-stone': 0,
	'ice-stone': 0,
	'escape-rope': 0,
	'metal-coat': 0,
	'black-augurite': 0,
	'shoal-salt': 0,
	'shoal-shell': 0,
	'green-shard': 0,
	'red-shard': 0,
	'blue-shard': 0,
	'yellow-shard': 0,
	'tiny-mushroom': 0,
	'big-mushroom': 0,
	pearl: 0,
	'big-pearl': 0,
	stardust: 0,
	'star-piece': 0,
	nugget: 0,
	'heart-scale': 0,
	honey: 0,
	'damp-mulch': 0,
	'gooey-mulch': 0,
	'growth-mulch': 0,
	'stable-mulch': 0,
	'sitrus-berry': 0,
	'helix-fossil': 0,
	'dome-fossil': 0,
	'old-amber': 0,
	'root-fossil': 0,
	'claw-fossil': 0,
	'skull-fossil': 0,
	'armor-fossil': 0,
	'cover-fossil': 0,
	'plume-fossil': 0,
	'jaw-fossil': 0,
	'sail-fossil': 0,
	'rare-bone': 0,
	'oval-stone': 0,
	'odd-keystone': 0,
	'adamant-orb': 0,
	'lustrous-orb': 0,
	'peat-block': 0,
	'red-apricorn': 0,
	'blue-apricorn': 0,
	'black-apricorn': 0,
	'white-apricorn': 0,
	'pink-apricorn': 0,
	'yellow-apricorn': 0,
	'green-apricorn': 0,
	'cheri-berry': 0,
	'chesto-berry': 0,
	'pecha-berry': 0,
	'rawst-berry': 0,
};
export const generateInventory = (wanted: Partial<Inventory>): Inventory => {
	return joinInventories(EmptyInventory, wanted);
};

export const joinInventories = (
	existing: Inventory,
	update: Partial<Inventory>,
	subtract?: boolean
): Inventory => {
	const joined = { ...existing };

	Object.entries(update).forEach((updateEntry) => {
		const key = updateEntry[0];
		const value = updateEntry[1];

		if (isItem(key)) {
			//amount cant fall under 0
			joined[key] = Math.max(joined[key] + (subtract ? -value : value), 0);
		}
	});

	return joined;
};
