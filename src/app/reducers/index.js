import * as _ from "lodash";
import { combineReducers } from "redux";
import { namespaceToObject, deepCopy } from "../util";
import { CHANGE_GUI_ACTIVATE, UPDATE_COMMAND, UPDATE_GUI, RESET_GUI } from "../actions";
import { initCommandConfigure, initDocumentConfigure, changeMemberActivate, deleteTargetKey, changeMemberProperty, getDefaultValue, getValueFromDocument } from "../configure";

// 커맨드창
let commandState = {
	original: initCommandConfigure,
	text: JSON.stringify(initCommandConfigure)
};
// GUI 옵션
let guiState = initDocumentConfigure;

const updateActivatedCommandState = (state, name, value) => {
	if(value === true){
		const defaultValue = getValueFromDocument(guiState, name, "defaultvalue");
		const guiValue = getValueFromDocument(guiState, name, "value");
		if (defaultValue == guiValue) {
			return deepCopy({}, state);
		} else {
			const conf = namespaceToObject(name.split("."), guiValue);
			return  updateCommandState(state, conf);
		}
	} else {
		return updateResetCommandState(state, name);
	}
};

const updateCommandState = (state, updated) => {
	const original = deepCopy({}, state.original, deepCopy({}, updated));
	const text = JSON.stringify(original);

	return {
		original, text
	};
};


const updateResetCommandState = (state, namespace) => {
	const original = deepCopy({}, state.original);
	const deleteTarget = deleteTargetKey(original, namespace);

	return {
		original: deepCopy({}, deleteTarget),
		text: JSON.stringify(deleteTarget)
	};
};

const updateGuiActivate = (state, name, value) => {
	const newObj = changeMemberActivate(state, name, value);
	return deepCopy({}, newObj);
};


const updateGuiState = (state, updated) => {
	const newObj = changeMemberProperty(state, deepCopy({}, updated));
	return deepCopy({}, newObj);
};

const command = (state = commandState, action) => {
	let returnState;

	switch (action.type) {
		case CHANGE_GUI_ACTIVATE : {
			returnState = updateActivatedCommandState(state, action.name, action.value);
			break;
		}
		case RESET_GUI : {
			returnState = updateResetCommandState(state, action.name);
			break;
		}
		case UPDATE_GUI : {
			const conf = namespaceToObject(action.name.split("."), action.value.value);
			returnState = updateCommandState(state, conf);
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
	return returnState;
};

const gui = (state = guiState, action) => {
	let returnState = {};

	switch (action.type) {
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
			returnState = updateGuiState(state, action.value.value);
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

const playgroundApp = combineReducers({
	command, gui
});

export default playgroundApp;
