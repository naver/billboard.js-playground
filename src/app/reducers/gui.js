import * as _ from "lodash";
import { combineReducers } from "redux";
import { namespaceToObject, deepCopy } from "../util";
import { CHANGE_GUI_ACTIVATE, UPDATE_CODE_INPUT, UPDATE_COMMAND, UPDATE_DATA, UPDATE_GUI, RESET_GUI } from "../actions";
import { initCommandConfigure, initDocumentConfigure, changeMemberActivate, deleteTargetKey, changeMemberProperty, getDefaultValue, getValueFromDocument, convertData } from "../configure";

// GUI 옵션
let guiState = initDocumentConfigure;

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
			returnState = updateGuiState(state, action.value);
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


export default gui;