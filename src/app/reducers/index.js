import { combineReducers } from "redux";
import { namespaceToObject, deepCopy } from "../util";
import { CHANGE_OPTIONS, CHANGE_USER_OPTIONS } from "../actions";
import * as defaultDocumentOption from "../document.json";

const userState = {
	data: {
		columns: [
			["data1", 30, 200, 100, 400, 150, 250],
			["data2", 50, 20, 10, 40, 15, 25],
			["data3", 50, 20, 10, 40, 15, 25]
		]
	}
};

// name => AAA.bbb
// description => hello world
// optional => true / false
// type { names : ["Number"] }
const documentToObject = () => {
	let obj = {};

	_.map(defaultDocumentOption).forEach((e) => {
		if(e.kind === "member"){
			if(e.name.indexOf(":") > -1){
				// todo
			} else {
				obj[e.name] = e;
			}
		}
	});
	return defaultDocumentOption;
};
const option = documentToObject();

const filteredState = (name, value) => {
	const conf = namespaceToObject(name.split("."), value);

	return Object.assign({}, userState, conf, {
		optionText: JSON.stringify(conf)
	});
};

const textToUserObjectState = (str) => {
	let conf;
	try {
		conf = JSON.parse(str);
		return Object.assign({}, userState, conf, {
			optionText : JSON.stringify(conf)
		});
	} catch(e){
		return {
			optionText : str
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

const options = (state = userState, action) => {
	let returnState;
	switch (action.type) {
		case CHANGE_OPTIONS :
			returnState = filteredState(action.name, action.value);
			break;
		case CHANGE_USER_OPTIONS :
			returnState = textToUserObjectState(action.value);
			break;
		default :
			returnState = Object.assign({}, state, {
				optionText: JSON.stringify(state)
			});
	}

	return returnState;
};

const document = (state = option, action) => {
	let returnState;

	switch (action.type) {
		case CHANGE_USER_OPTIONS :
			returnState = textToDocumentObjectState(action.value) || state;
			break;
		default :
			returnState = state;
	}
	return returnState;
};

const playgroundApp = combineReducers({
	options, document
});

export default playgroundApp;
