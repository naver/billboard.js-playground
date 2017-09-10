import * as _ from "lodash";
import { combineReducers } from "redux";
import { namespaceToObject, deepCopy } from "../util";
import { CHANGE_GUI_ACTIVATE, UPDATE_COMMAND, UPDATE_DATA, UPDATE_GUI, RESET_GUI } from "../actions";
import { initCommandConfigure, initDocumentConfigure, changeMemberActivate, deleteTargetKey, changeMemberProperty, getDefaultValue, getValueFromDocument, convertData } from "../configure";

// header, body
let dataState = convertData(initCommandConfigure.data);

const updateDataTable = (state, name, value, rc) => {
	const newState = deepCopy({}, state);

	if(name === "header"){
		newState.header[rc.column] = value;
	} else {
		newState.body[rc.row][rc.column] = value;
	}

	return newState;
};

const data = (state = dataState, action) => {
	let returnState;

	switch (action.type) {
		case UPDATE_DATA : {
			returnState = updateDataTable(state, action.name, action.value, action.info);
			break;
		}
		default :
			returnState = deepCopy({}, state);
	}

	dataState = returnState;
	returnState.lastUpdate = new Date();
	return returnState;
};

export default data;
