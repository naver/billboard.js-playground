import { combineReducers } from "redux";
import { namespaceToObject, deepCopy } from "../util";
import { UPDATE_COMMAND, UPDATE_GUI } from "../actions";
import { initCommandConfigure, initDocumentConfigure } from "../configure";

let commandState = {
	original: initCommandConfigure,
	text: JSON.stringify(initCommandConfigure)
};
let guiState = initDocumentConfigure;


const updateOriginal = (state, updated) => {
	const original = deepCopy({}, state.original, updated);
	const text = JSON.stringify(original);

	return {
		original, text
	};
};

const changeMemberProperty = (member, target, root) => {
	const key = _.keys(target)[0];
	const filter = root + "." + key;
	let updatedProperty;
	let updatedIdx;

	_.each(member.properties, (property,  idx) => {
		if(property.name == filter){
			if(property.properties){
				updatedProperty = changeMemberProperty(property, target[key], filter);
			} else {
				property.defaultvalue = target[key];
				updatedProperty = property;
				updatedIdx = idx;

				member.properties[updatedIdx] = updatedProperty;
			}
		}
	});

	return member;
};


const updateGuiState = (state, updated) => {
	const newObj = {};

	_.each(updated, (value, key) => {
		if(key !== "data"){
			const member = state[key];
			newObj[key] = changeMemberProperty(member, value, key);
		}
	});

	return newObj;
};

const command = (state = commandState, action) => {
	let returnState;

	switch (action.type) {
		case UPDATE_GUI : {
			const conf = namespaceToObject(action.name.split("."), action.value);
			returnState = updateOriginal(state, conf);
			break;
		}
		case UPDATE_COMMAND :
			returnState = updateOriginal(state, action.value);
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
		case UPDATE_GUI : {
			const value = namespaceToObject(action.name.split("."), action.value);
			returnState = updateGuiState(state, value);
			break;
		}
		case UPDATE_COMMAND :
			returnState = updateGuiState(state, action.value);
			break;
		default :
			returnState = state;
	}

	returnState.lastUpdate = new Date();
	return returnState;
};

const playgroundApp = combineReducers({
	command, gui
});

export default playgroundApp;
