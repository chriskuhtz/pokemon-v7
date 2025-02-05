import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { receiveNewPokemonFunction } from './receiveNewPokemonFunction';

describe('should handle receiving new pokemon', () => {
	it('should add a pokemon to the team if there is space', () => {
		const id = 'test';
		const newMon: Omit<OwnedPokemon, 'onTeam'> = {
			id,
			dexId: 30,
			ball: 'cherish-ball',
			ownerId: '',
			firstMove: { name: 'pound', usedPP: 0 },
			nature: 'adamant',
			damage: 0,
			level: 5,
			ability: 'stench',
		};

		const existingPokemon: OwnedPokemon[] = [];

		const res = receiveNewPokemonFunction(newMon, existingPokemon);

		expect(res.find((p) => p.id === id && p.onTeam)).toBeTruthy();
	});
	it('should add a pokemon to the team if there is space', () => {
		const id = 'test';
		const newMon: Omit<OwnedPokemon, 'onTeam'> = {
			id,
			dexId: 30,
			ball: 'cherish-ball',
			ownerId: '',
			firstMove: { name: 'pound', usedPP: 0 },
			nature: 'adamant',
			damage: 0,
			level: 5,
			ability: 'stench',
		};

		const existingPokemon: OwnedPokemon[] = [
			{ ...newMon, id: '1', onTeam: true },
			{ ...newMon, id: '1', onTeam: true },
			{ ...newMon, id: '1', onTeam: true },
			{ ...newMon, id: '1', onTeam: true },
			{ ...newMon, id: '1', onTeam: true },
			{ ...newMon, id: '1', onTeam: true },
		];

		const res = receiveNewPokemonFunction(newMon, existingPokemon);

		expect(res.find((p) => p.id === id && p.onTeam)).toBeFalsy();
	});
});
