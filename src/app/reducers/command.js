import * as _ from "lodash";
import { combineReducers } from "redux";
import { namespaceToObject, deepCopy, strinifyContainsFunction } from "../util";
import { UPDATE_CODE_INPUT, CHANGE_GUI_ACTIVATE, UPDATE_COMMAND, UPDATE_DATA, UPDATE_GUI, RESET_GUI } from "../actions";
import { initCommandConfigure, initDocumentConfigure, changeMemberActivate, deleteTargetKey, changeMemberProperty, getDefaultValue, getValueFromDocument, convertData } from "../configure";

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
	}
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
	returnState.focus = focus;
	return returnState;
};

export default command;
