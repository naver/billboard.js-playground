import { combineReducers } from "redux";
import * as _ from "lodash";
import {
	namespaceToObject,
	deepCopy,
	objectFlatten
} from "../util";

import {
	formattedDocument as initDocument,
	initConfigure
} from "../configure";

import {
	HIDE_GUIDE_CARD,
	SHOW_GUIDE_CARD,
	UPDATE_GUI,
	RESET_GUI,
	REFLECTED_DATA,
	UPDATE_CODE_INPUT,
	UPDATE_COMMAND,
	UPDATE_CONFIGURE_INFO,
	UPDATE_TABLE_KEY,
	UPDATE_TABLE_VALUE,
	REMOVE_VALUE_FROM_TABLE,
	REMOVE_KEY_FROM_TABLE,
	ADD_VALUE_FROM_TABLE,
	ADD_KEY_FROM_TABLE
} from "../actions";

import {
	getDefaultValue,
	updateGuiState,
	changeDefaultGuiState,
	updateGuiActivate,
	resetDataState,
	getChip,
	removeValueToDataState,
	removeKeyToDataState,
	addValueToDataTable,
	addKeyToDataTable,
	updateDataKeyState,
	updateDataValueState,
	updateCommandByGUI,
	getRemovedToDefault,
	updateCommandData,
	updateCommandCode,
	resetCommandState,
	updateCommandState,
	deleteTargetCommandState,
	getAttributesFromDocument,
	convertData
} from "./logic";


/**		state variable		**/
let guiState = initDocument;
let dataState = convertData(initConfigure.data);
let commandState = {
	original: initConfigure,
	text: JSON.stringify(initConfigure),
	chip: getChip(Object.keys(objectFlatten(initConfigure)))
};
let guideState = {
	open: false,
	name: null,
	attributes: getAttributesFromDocument("bindto")
};


/**	gui action handler **/
const gui = (state = guiState, action) => {
	let returnState = {};

	switch (action.type) {
		case UPDATE_GUI : {
			const latest = namespaceToObject(action.name, action.updated.value);

			returnState = updateGuiState(state, latest);

			returnState.lastUpdateRoot = [action.name.split(".")[0]];
			returnState.lastUpdate = (new Date()).getTime();

			break;
		}
		case RESET_GUI : {
			const value = getDefaultValue(action.name);
			const latest = namespaceToObject(action.name, value);

			returnState = updateGuiState(state, latest);

			returnState.lastUpdateRoot = [action.name.split(".")[0]];
			returnState.lastUpdate = (new Date()).getTime();

			break;
		}

		case UPDATE_CODE_INPUT : {
			returnState = updateGuiActivate(state, action.name);

			returnState.lastUpdateRoot = [action.name.split(".")[0]];
			returnState.lastUpdate = (new Date()).getTime();

			break;
		}

		case UPDATE_COMMAND : {
			const prev = action.updated.prev;
			const current = action.updated.value;
			const resets = getRemovedToDefault(prev, current);

			returnState = updateGuiState(state, current);
			returnState = updateGuiState(returnState, resets);

			returnState.lastUpdateRoot = Object.keys(current).concat(Object.keys(resets));
			returnState.lastUpdate = (new Date()).getTime();

			break;
		}
		default :
			returnState = state;
	}

	guiState = returnState;
	return returnState;
};

const command = (state = commandState, action) => {
	let returnState;

	switch (action.type) {
		case UPDATE_GUI : {
			returnState = updateCommandByGUI(state, action.name, action.updated.value);
			returnState.chip = getChip(Object.keys(objectFlatten(returnState.original)));
			returnState.lastUpdate = new Date();
			break;
		}

		case RESET_GUI : {
			returnState = deleteTargetCommandState(state, action.name);
			returnState.chip = getChip(Object.keys(objectFlatten(returnState.original)));
			returnState.lastUpdate = new Date();
			break;
		}

		case UPDATE_CODE_INPUT : {
			returnState = updateCommandCode(state, action.name);
			returnState.chip = getChip(Object.keys(objectFlatten(returnState.original)));
			returnState.lastUpdate = new Date();
			break;
		}

		case UPDATE_COMMAND : {
			returnState = resetCommandState(action.updated.value);
			returnState.chip = getChip(Object.keys(objectFlatten(returnState.original)));
			returnState.lastUpdate = new Date();
			break;
		}

		case REFLECTED_DATA : {
			const lastedData = deepCopy({}, action.data);
			returnState = updateCommandData(state, lastedData);
			returnState.chip = getChip(Object.keys(objectFlatten(returnState.original)));
			returnState.fromData = true;
			returnState.lastUpdate = new Date()
			break;
		}

		default :
			returnState = state;
	}


	commandState = returnState;

	return returnState;
};


const data = (state = dataState, action) => {
	let returnState;

	switch (action.type) {
		case UPDATE_COMMAND : {
			const newData = convertData(action.updated.value.data);
			returnState = resetDataState(state, newData);
			returnState.lastUpdate = new Date();

			break;
		}
		case UPDATE_TABLE_VALUE : {
			returnState = updateDataValueState(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}
		case UPDATE_TABLE_KEY : {
			returnState = updateDataKeyState(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}
		case REMOVE_VALUE_FROM_TABLE : {
			returnState = removeValueToDataState(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}
		case REMOVE_KEY_FROM_TABLE : {
			returnState = removeKeyToDataState(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}
		case ADD_VALUE_FROM_TABLE : {
			returnState = addValueToDataTable(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}
		case ADD_KEY_FROM_TABLE : {
			returnState = addKeyToDataTable(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}

		default :
			returnState = state;
	}

	dataState = returnState;

	return returnState;
};

const guide = (state = guideState, action) => {
	let returnState = {};

	switch (action.type) {
		case UPDATE_CONFIGURE_INFO : {
			const name = action.name;
			const attributes = getAttributesFromDocument(name);
			returnState = {
				name,
				attributes
			};
			returnState.lastUpdate = (new Date()).getTime();
			break;
		}
		case HIDE_GUIDE_CARD : {
			returnState.open = false;
			returnState.lastUpdate = (new Date()).getTime();
			break;
		}
		case SHOW_GUIDE_CARD : {
			returnState.open = true;
			returnState.lastUpdate = (new Date()).getTime();
			break;
		}
		default :
			returnState = state;
	}

	returnState = deepCopy({}, guideState, returnState);
	guideState = returnState;

	return returnState;
};

const playgroundApp = combineReducers({
	gui, command, data, guide
});

export default playgroundApp;
