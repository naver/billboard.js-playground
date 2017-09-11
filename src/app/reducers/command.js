import * as _ from "lodash";
import { combineReducers } from "redux";
import { namespaceToObject, deepCopy, strinifyContainsFunction } from "../util";
import { initCommandConfigure, initDocumentConfigure, changeMemberActivate, deleteTargetKey, changeMemberProperty, getDefaultValue, getValueFromDocument, convertData,getRemovedAttributes } from "../configure";
import { CHANGE_GUI_ACTIVATE, RECENT_CONFIGURE, UPDATE_CODE_INPUT, UPDATE_COMMAND, UPDATE_DATA, UPDATE_GUI, RESET_GUI } from "../actions";


// 커맨드창
let commandState = {
	original: initCommandConfigure,
	text: JSON.stringify(initCommandConfigure)
};

const updateCommandCode = (state, updated, targetKey, originalCode) => {
	const original = deepCopy({}, state.original, updated);
	const text = strinifyContainsFunction(original);

	return {
		original, text
	};
};

const updateCommandState = (state, updated) => {
	const original = deepCopy({}, state.original, updated);
	const text = strinifyContainsFunction(original);

	return {
		original, text
	};
};

const updateResetCommandState = (state, namespace) => {
	const original = deepCopy({}, state.original);
	const deleteTarget = deleteTargetKey(original, namespace);
	const text = strinifyContainsFunction(deleteTarget);

	return {
		original: deepCopy({}, deleteTarget),
		text: text
	};
};

const command = (state = commandState, action) => {
	let returnState;
	let focus = null;

	switch (action.type) {
		case UPDATE_CODE_INPUT : {
			let code = action.value.value;
			eval(`code = ${code}`);
			const conf = namespaceToObject(action.name.split("."), code);
			returnState = updateCommandCode(state, conf, action.name, code);
			focus = action.name;
			break;
		}
		case RESET_GUI : {
			returnState = updateResetCommandState(state, action.name);
			break;
		}
		case UPDATE_GUI : {
			const value = action.value.value;
			const defaultvalue = getDefaultValue(action.name);
			if(value === defaultvalue){
				returnState = updateResetCommandState(state, action.name);
			} else {
				const conf = namespaceToObject(action.name.split("."), action.value.value);
				returnState = updateCommandState(state, conf);
			}
			break;
		}
		case UPDATE_COMMAND :
			returnState = updateCommandState(state, action.value);
			break;
		default :
			returnState = state;
	}

	commandState = returnState;

	// react connect check shallow key
	returnState.lastUpdate = new Date();
	returnState.focus = focus;
	return returnState;
};



// GUI 옵션
let guiState = initDocumentConfigure;
let lastCommandConfigure = {};

const setDefaultGuiState = (state, keys) => {
	let newObj = {};
	_.each(keys, (name) => {
		const newValue = getDefaultValue(name);
		const obj = namespaceToObject(name.split("."), newValue);
		newObj = deepCopy(newObj, obj);
	});

	const newState = updateGuiState(state, newObj);
	return deepCopy({}, newState);
};

const updateGuiState = (state, updated) => {
	const newObj = changeMemberProperty(state, deepCopy({}, updated));
	return deepCopy({}, newObj);
};

const updateGuiActivate = (state, name, value) => {
	const newObj = changeMemberActivate(state, name, value);
	return deepCopy({}, newObj);
};

const gui = (state = guiState, action) => {
	let returnState = {};

	switch (action.type) {
		case RECENT_CONFIGURE : {
			lastCommandConfigure = action.configure;
			returnState = state;
			break;
		}
		case UPDATE_CODE_INPUT : {
			let code = action.value.value;
			eval(`code = ${code}`);
			returnState = updateGuiActivate(state, action.name, code);
			break;
		}
		case CHANGE_GUI_ACTIVATE : {
			returnState = updateGuiActivate(state, action.name, action.value.value);
			break;
		}
		case RESET_GUI : {
			const value = getDefaultValue(action.name);
			const updated = namespaceToObject(action.name.split("."), value);

			returnState = updateGuiState(state, updated);
			break;
		}
		case UPDATE_GUI : {
			const value = namespaceToObject(action.name.split("."), action.value.value);
			returnState = updateGuiState(state, value);
			break;
		}
		case UPDATE_COMMAND :
			const prevState = deepCopy({}, commandState.original);
			const removedCommandKeys = getRemovedAttributes(prevState, action.value);

			returnState = updateGuiState(state, action.value);
			returnState = setDefaultGuiState(returnState, removedCommandKeys)
			break;
		default :
			returnState = state;
	}

	guiState = returnState;

	if (action.value && action.value.root) {
		returnState.lastUpdateRoot = action.value.root;
	}

	// react connect check shallow key
	returnState.lastUpdate = (new Date()).getTime();
	return returnState;
};

export {
	command, gui
};


