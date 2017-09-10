export const UPDATE_GUI = "UPDATE_GUI";
export const UPDATE_COMMAND = "UPDATE_COMMAND";
export const RESET_GUI = "RESET_GUI";
export const CHANGE_GUI_ACTIVATE = "CHANGE_GUI_ACTIVATE";
export const UPDATE_DATA = "UPDATE_DATA";

export const updateData = (name, value, info) => {
	return {
		type: UPDATE_DATA,
		name,
		value,
		info
	};
};

export const changeGuiActivate = (name, value) => ({
	type: CHANGE_GUI_ACTIVATE,
	value: value.value,
	root: value.root,
	name
});


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
