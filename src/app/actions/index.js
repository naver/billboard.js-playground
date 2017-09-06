export const UPDATE_GUI = "UPDATE_GUI";
export const UPDATE_COMMAND = "UPDATE_COMMAND";
export const RESET_GUI = "RESET_GUI";

export const resetGui = (name) => ({
	type: RESET_GUI,
	name
});
export const updateGui = (name, value) => ({
	type: UPDATE_GUI,
	name,
	value
});

export const updateCommand = value => ({
	type: UPDATE_COMMAND,
	value
});
