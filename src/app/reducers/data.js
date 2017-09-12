import * as _ from "lodash";
import { deepCopy } from "../util";
import { UPDATE_COMMAND, REFLECT_CODE_TO_DATATABLE, UPDATE_HEADER, UPDATE_CELL, REMOVE_VALUE_TO_DATA, REMOVE_KEY_TO_DATA, ADD_VALUE_TO_DATA, ADD_KEY_TO_DATA } from "../actions";
import { initCommandConfigure, convertData } from "../configure";

// header, body
let dataState = convertData(initCommandConfigure.data);

const redrawAllData = (state, configure) => {
	const newState = convertData(configure.data);

	return newState;
};

const removeValueToDataTable = (state, newData) => {
	const newState = deepCopy({}, state);
	newState.body.splice(newData, 1);

	return newState;
};

const removeKeyToDataTable = (state, newData) => {
	const newState = deepCopy({}, state);

	newState.body.forEach((target) => {
		delete target[newData];
	});
	newState.header = _.remove(newState.header, function(name) {
		return name !== newData;
	});

	return newState;
};

const addValueToDataTable = (state, newData) => {
	const newState = deepCopy({}, state);
	newState.body.push(newData);

	return newState;
};

const addKeyToDataTable = (state, newData) => {
	const newState = deepCopy({}, state);

	newState.header.push(newData.name);
	newData.value.forEach((value, index) => {
		newState.body[index][newData.name] = value;
	});
	return newState;
};

const updateTableHeader = (state, { value, column }) => {
	const newState = deepCopy({}, state);
	const prevHeader = state.header[column];
	const newBody = newState.body.map((data) => {
		data[value] = data[prevHeader];
		delete data[prevHeader];
		return data;
	});
	newState.header[column] = value;
	newState.body = newBody;

	return newState;
};

const updateTableCell = (state, {row, header, value}) => {
	const newState = deepCopy({}, state);
	const newValue = !isNaN(value) && value !== "" ? Number(value) : value;

	newState.body[row][header] = newValue;

	return newState;
};

const data = (state = dataState, action) => {
	let returnState;


	switch (action.type) {
		case UPDATE_COMMAND : {
			returnState = redrawAllData(state, action.value);
			returnState.lastUpdate = new Date();

			break;
		}
		case REFLECT_CODE_TO_DATATABLE : {
			returnState = redrawAllData(state, action.configures);
			returnState.lastUpdate = new Date();

			break;
		}
		case UPDATE_CELL : {
			returnState = updateTableCell(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}
		case UPDATE_HEADER : {
			returnState = updateTableHeader(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}
		case REMOVE_VALUE_TO_DATA : {
			returnState = removeValueToDataTable(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}
		case REMOVE_KEY_TO_DATA : {
			returnState = removeKeyToDataTable(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}
		case ADD_VALUE_TO_DATA : {
			returnState = addValueToDataTable(state, action.data);
			returnState.lastUpdate = new Date();

			break;
		}
		case ADD_KEY_TO_DATA : {
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

export default data;
