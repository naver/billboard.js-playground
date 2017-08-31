import { combineReducers } from "redux";
import { namespaceToObject } from "../util";
import { UPDATE_COMMAND, UPDATE_GUI } from "../actions";
import { initCommandConfigure, initDocumentConfigure } from "../configure";


const commandState = {
	original: initCommandConfigure,
	text: JSON.stringify(initCommandConfigure)
};
const guiState = initDocumentConfigure;


const filteredState = (name, value) => {
	const conf = namespaceToObject(name.split("."), value);

	return Object.assign({}, commandState, conf, {
		text: JSON.stringify(conf)
	});
};

const textToUserObjectState = (str) => {
	let conf;
	try {
		conf = JSON.parse(str);
		return Object.assign({}, commandState, conf, {
			text: JSON.stringify(conf)
		});
	} catch(e){
		return {
			text: str
		};
	}
};

const textToDocumentObjectState = (str) => {
	let conf;
	try {
		conf = JSON.parse(str);
		delete conf.data
	} catch(e){
		return;
	}
};


const command = (state = commandState, action) => {
	let returnState;

	switch (action.type) {
		//case UPDATE_GUI :
		//	returnState = filteredState(action.name, action.value);
		//	break;
		case UPDATE_COMMAND :
			returnState = textToUserObjectState(action.value);
			break;
		default :
			returnState = state;
	}

	return returnState;
};

const gui = (state = guiState, action) => {
	let returnState;

	switch (action.type) {
		case UPDATE_COMMAND :
			returnState = textToDocumentObjectState(action.value) || state;
			break;
		default :
			returnState = state;
	}
	return returnState;
};

const playgroundApp = combineReducers({
	command, gui
});

export default playgroundApp;
