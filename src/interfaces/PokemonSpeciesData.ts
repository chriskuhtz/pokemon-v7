export interface PokemonSpeciesData {
	flavor_text_entries: [
		{
			flavor_text: string;
			language: {
				name: string;
				url: string;
			};
			version: {
				name: string;
				url: string;
			};
		}
	];
	evolution_chain: {
		url: string;
	};
	base_happiness: number;
	capture_rate: number;
	gender_rate: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
}
