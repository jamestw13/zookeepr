const fs = require('fs');
const {filterByQuery, findById, createNewZookeeper, validateZookeeper} = require('../lib/zookeepers.js');
const {zookeepers} = require('../data/zookeepers.json');

jest.mock('fs');

test('creates an zookeeper object', () => {
	const zookeeper = createNewZookeeper({name: 'JimBob', id: 'applesauce'}, zookeepers);

	expect(zookeeper.name).toBe('JimBob');
	expect(zookeeper.id).toBe('applesauce');
});

test('filters by query', () => {
	const startingZookeepers = [
		{
			id: '3',
			name: 'Erica',
			favoriteAnimal: 'gorilla',
			age: 21,
		},
		{
			id: '4',
			name: 'Noel',
			favoriteAnimal: 'bear',
			age: 30,
		},
	];

	const updatedZookeepers = filterByQuery({favoriteAnimal: 'gorilla'}, startingZookeepers);
	expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
	const startingZookeepers = [
		{
			id: '3',
			name: 'Erica',
			favoriteAnimal: 'gorilla',
			age: 21,
		},
		{
			id: '4',
			name: 'Noel',
			favoriteAnimal: 'bear',
			age: 30,
		},
	];

	const result = findById('3', startingZookeepers);

	expect(result.name).toBe('Erica');
});

test('validates age', () => {
	const zookeeper = {
		id: '3',
		name: 'Erica',
		favoriteAnimal: 'gorilla',
		age: 21,
	};

	const invalidZookeeper = {
		id: '4',
		name: 'Noel',
		favoriteAnimal: 'bear',
		age: 'finf',
	};

	const result = validateZookeeper(zookeeper);
	const result2 = validateZookeeper(invalidZookeeper);

	expect(result).toBe(true);
	expect(result2).toBe(false);
});
