import * as _ from "lodash";
import { combineReducers } from "redux";
import { namespaceToObject, deepCopy, strinifyContainsFunction, stringToFunction, objectFlatten } from "../util";
import { initCommandConfigure, initDocumentConfigure, changeMemberActivate, deleteTargetKey, changeMemberProperty, getDefaultValue, getValueFromDocument, dataToFormatedData, convertData,getRemovedAttributes, getAttributesFromDocument } from "../configure";
import { HIDE_GUIDE_CARD, SHOW_GUIDE_CARD, CHANGE_GUI_ACTIVATE, REFLECTED_DATA, RECENT_CONFIGURE, UPDATE_CODE_INPUT, UPDATE_COMMAND, UPDATE_CONFIGURE_INFO, UPDATE_DATA, UPDATE_GUI, RESET_GUI } from "../actions";

// 커멘드 상태
let commandState = {
	original: initCommandConfigure,
	text: JSON.stringify(initCommandConfigure),
	chip: objectFlatten(initCommandConfigure)
};

let oldCommand = deepCopy({}, commandState);

const updateCommandData = (state, lastest) => {
	// columns, json, rows
	const formatList = ["columns", "json", "rows"];
	const newState = deepCopy({}, state);
	const format = Object.keys(newState.original.data).filter((key) => {
		return formatList.indexOf(key) > -1;
	})[0];

	newState.original.data[format] = dataToFormatedData(format, lastest);

	const text = strinifyContainsFunction(newState.original);


	return {
		original: newState.original,
		text
	};
};

const updateCommandCode = (state, updated) => {
	const original = deepCopy({}, state.original, updated);
	const text = strinifyContainsFunction(original);

	return {
		original, text
	};
};
const resetCommandState = (updated) => {
	const original = deepCopy({}, updated);
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

const command = (state = commandState, action) => {
	oldCommand = commandState;

	let returnState;
	let focus = null;

	switch (action.type) {
		// data table ui 가 갱신되었을때
		case REFLECTED_DATA : {
			const lastedData = deepCopy({}, action.data);
			returnState = updateCommandData(state, lastedData);
			returnState.fromData = true;
			// react connect check shallow key
			returnState.lastUpdate = new Date()

			break;
		}
		// GUI의 코드 수정 버튼을 클릭했때 옵션의 default 값으로 command 창에 입력된다
		case UPDATE_CODE_INPUT : {
			const func = stringToFunction(action.state.value);
			const updated = namespaceToObject(action.name.split("."), func);

			returnState = updateCommandCode(state, updated);

			// react connect check shallow key
			returnState.lastUpdate = new Date()
			focus = action.name;
			break;
		}

		// GUI의 삭제 버튼을 클릭했을때 default 값으로 변경한다
		case RESET_GUI : {
			returnState = updateResetCommandState(state, action.name);
			// react connect check shallow key
			returnState.lastUpdate = new Date();
			break;
		}

		// GUI 조작후
		case UPDATE_GUI : {
			const value = action.value.value;
			const defaultvalue = getDefaultValue(action.name);

			// 변경한 값이 기존과 같으면 default 값으로 지정
			if (value === defaultvalue) {
				returnState = updateResetCommandState(state, action.name);
			}
			// 새로운 값으로 셋팅
			else {
				const conf = namespaceToObject(action.name.split("."), action.value.value);
				returnState = updateCommandState(state, conf);
			}
			// react connect check shallow key
			returnState.lastUpdate = new Date()
			break;
		}

		// command 텍스트가 입력된 후에 최신 상태로 반영한다
		case UPDATE_COMMAND :
			returnState = resetCommandState(action.value);
			// react connect check shallow key
			returnState.lastUpdate = new Date()
			break;
		default :
			returnState = state;
	}

	commandState = returnState;

	returnState.chip = Object.keys(objectFlatten(returnState.original));

	return returnState;
};

const gui = (state = guiState, action) => {
	let returnState = {};
	let root = action.value && action.value.root ? [action.value.root] : [];

	switch (action.type) {
		case RECENT_CONFIGURE : {
			lastCommandConfigure = action.configure;
			returnState = state;
			break;
		}
		case UPDATE_CODE_INPUT : {
			let code = action.state.value;
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
			const prevState = deepCopy({}, oldCommand.original);
			const removedCommandKeys = getRemovedAttributes(prevState, action.value);

			returnState = updateGuiState(state, action.value);
			returnState = setDefaultGuiState(returnState, removedCommandKeys);

			root = root.concat(_.keys(prevState));
			root = root.concat(_.keys(action.value));
			break;
		default :
			returnState = state;
	}
	guiState = returnState;

	if (root) {
		returnState.lastUpdateRoot = root;
	}

	// react connect check shallow key
	returnState.lastUpdate = (new Date()).getTime();
	return returnState;
};


let drawerState = {
	open : false,
	style:"400px",
	name: "none",
	attributes: getAttributesFromDocument("bindto"),
};
const guide = (state = drawerState, action) => {
	let returnState = {};

	switch (action.type) {
		case RESET_GUI : {
			returnState.open = false;
			returnState.lastUpdate = (new Date()).getTime();
			break;
		}
		case UPDATE_CONFIGURE_INFO : {
			const name = action.name;
			const attributes = getAttributesFromDocument(name);
			returnState = {
				name,
				attributes
			};
			returnState.open = true;
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
			returnState.style = action.style;
			returnState.lastUpdate = (new Date()).getTime();
			break;
		}
		default :
			returnState = state;
	}

	returnState = deepCopy({}, drawerState, returnState);
	drawerState = returnState;

	return returnState;
};


export {
	command, gui, guide
};
