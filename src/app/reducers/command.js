import * as _ from "lodash";
import { combineReducers } from "redux";
import { namespaceToObject, deepCopy } from "../util";
import { CHANGE_GUI_ACTIVATE, UPDATE_COMMAND, UPDATE_DATA, UPDATE_GUI, RESET_GUI } from "../actions";
import { initCommandConfigure, initDocumentConfigure, changeMemberActivate, deleteTargetKey, changeMemberProperty, getDefaultValue, getValueFromDocument, convertData } from "../configure";

// 커맨드창
let commandState = {
	original: initCommandConfigure,
	text: JSON.stringify(initCommandConfigure)
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

export default command;