export const UPDATE_GUI = "UPDATE_GUI";
export const UPDATE_COMMAND = "UPDATE_COMMAND";
export const RESET_GUI = "RESET_GUI";
export const CHANGE_GUI_ACTIVATE = "CHANGE_GUI_ACTIVATE";
export const UPDATE_DATA = "UPDATE_DATA";
export const UPDATE_CODE_INPUT = "UPDATE_CODE_INPUT";
export const RECENT_CONFIGURE = "RECENT_CONFIGURE";
export const ADD_KEY_TO_DATA = "ADD_KEY_TO_DATA";
export const ADD_VALUE_TO_DATA = "ADD_VALUE_TO_DATA";
export const REMOVE_VALUE_TO_DATA = "REMOVE_VALUE_TO_DATA";
export const REMOVE_KEY_TO_DATA = "REMOVE_KEY_TO_DATA";
export const REFLECTED_DATA = "REFLECTED_DATA";
export const UPDATE_HEADER = "UPDATE_HEADER";
export const UPDATE_CELL = "UPDATE_CELL";
export const REFLECT_CODE_TO_DATATABLE = "REFLECT_CODE_TO_DATATABLE";
export const UPDATE_CONFIGURE_INFO = "UPDATE_CONFIGURE_INFO";
export const SHOW_GUIDE_CARD = "SHOW_GUIDE_CARD";
export const HIDE_GUIDE_CARD = "HIDE_GUIDE_CARD";

export const hideGuideCard = () => {
	return {
		type: HIDE_GUIDE_CARD
	}

};
export const showGuideCard = (style) => {
	return {
		type: SHOW_GUIDE_CARD,
		style,
	}
}

export const updateConfigureInfo = (name) => {
	return {
		type: UPDATE_CONFIGURE_INFO,
		name
	}
}

export const reflectCommandToDatatable = (code) => {
	return {
		type: REFLECT_CODE_TO_DATATABLE,
		configures: code
	};
};

export const updateHeader = (updateData) => {
	return {
		type: UPDATE_HEADER,
		data: updateData
	};
};

export const updateCell = (updateData) => {
	return {
		type: UPDATE_CELL,
		data: updateData
	};
};

export const reflectedDataToCommand = (latestData) => {
	return {
		type: REFLECTED_DATA,
		data: latestData
	}
}

export const removeValueToData = (index) => {
	return {
		type: REMOVE_VALUE_TO_DATA,
		data: index
	};
};

export const removeKeyToData = (key) => {
	return {
		type: REMOVE_KEY_TO_DATA,
		data: key
	};
};

export const addValueToData = (newData) => {
	return {
		type: ADD_VALUE_TO_DATA,
		data: newData
	};
}
export const addKeyToData = (newData) => {
	return {
		type: ADD_KEY_TO_DATA,
		data: newData
	};
};

export const updateCodeInput = (name, state) => {
	return {
		type: UPDATE_CODE_INPUT,
		name,
		state
	};
};

export const updateData = (name, value, info) => {
	return {
		type: UPDATE_DATA,
		name,
		value,
		info
	};
};
export const recentConfigureUpdate = (configure) => ({
	type: RECENT_CONFIGURE,
	configure
})

export const changeGuiActivate = (name, value) => ({
	type: CHANGE_GUI_ACTIVATE,
	value: value.value,
	root: value.root,
	name
});


export const resetGui = (name, value) => {
	return {
		type: RESET_GUI,
		value,
		name
	};
};
export const updateGui = (name, value) => ({
	type: UPDATE_GUI,
	name,
	value
});

export const updateCommand = value => ({
	type: UPDATE_COMMAND,
	value
});
