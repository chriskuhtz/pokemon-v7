export const getHistorianMessage = (): string[] => {
	if (new Date().getDay() % 2 === 1) {
		return [
			'Legends say, The Bird of Fire might appear',
			'at night, in a cave nearby',
			'If a Trainer carries its mineral essence with him',
			'come back tomorrow for a different tale',
		];
	}
	return [
		'Legends say, The Bird of Thunder might appear',
		'at dawn, on an island nearby',
		'If a Trainer carries its mineral essence with him',
		'come back tomorrow for a different tale',
	];
};
