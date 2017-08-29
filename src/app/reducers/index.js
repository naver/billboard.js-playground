import { combineReducers } from "redux";

const configInitState = {
	data: {
		columns: [
			['data1', 30, 200, 100, 400, 150, 250],
			['data2', 50, 20, 10, 40, 15, 25],
			['data3', 50, 20, 10, 40, 15, 25]
		]
	}
};

const options = (state = configInitState, action) => {
	switch (action.type) {
		case "CHANGE_OPTIONS" :
			return {
				name: action.name
			};
		default :
			return state;
	}
};

const playgroundApp = combineReducers({
	options
});

export default playgroundApp;
