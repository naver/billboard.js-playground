import * as _ from "lodash";
import { combineReducers } from "redux";
import { namespaceToObject, deepCopy } from "../util";
import { CHANGE_GUI_ACTIVATE, UPDATE_COMMAND, UPDATE_DATA, UPDATE_GUI, RESET_GUI } from "../actions";
import { initCommandConfigure, initDocumentConfigure, changeMemberActivate, deleteTargetKey, changeMemberProperty, getDefaultValue, getValueFromDocument, convertData } from "../configure";

//import gui from "./gui";
//import command from "./command";
import {command, gui} from "./command";
import data from "./data";

const playgroundApp = combineReducers({
	command, gui, data
});

export default playgroundApp;
