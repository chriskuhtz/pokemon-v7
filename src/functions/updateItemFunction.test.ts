import { generateInventory } from '../interfaces/Inventory';
import { updateItemFunction } from './updateItemFunction';

describe('update an item', () => {
	it('should change amount of item by given amount', () => {
		const og = generateInventory({ 'master-ball': 2 });

		const res = updateItemFunction('master-ball', -1, og);

		expect(res['master-ball']).toBe(1);
	});
	it('should not reduce below 0', () => {
		const og = generateInventory({ 'master-ball': 1 });

		const res = updateItemFunction('master-ball', -10, og);

		expect(res['master-ball']).toBe(0);
	});
	it('should not change other items', () => {
		const og = generateInventory({ 'master-ball': 1, protein: 1 });

		const res = updateItemFunction('master-ball', -10, og);

		expect(res['master-ball']).toBe(0);
		expect(res['protein']).toBe(1);
	});
});
