let config = {
	data : {
		columns: [
			["data1", 30, 200, 100, 400, 150, 250],
			["data2", 50, 20, 10, 40, 15, 25],
			["data3", 50, 20, 10, 40, 15, 25]
		]
	}
}

export const changeCheckbox = name => ({
	type: "CHANGE_OPTIONS",
	name,
});

export const updateConfig = config => {
	return {
		type: "UPDATE_CONFIG",
		config,
	};
};

