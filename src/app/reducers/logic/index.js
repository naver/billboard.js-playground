import {
	namespaceToObject,
	deepCopy,
	strinifyContainsFunction,
	stringToFunction,
	objectFlatten
} from "../../util";
import {
	formattedDocument as initDocument
} from "../../configure";
import {
	convertColumnsToData
} from "./convert";
import * as _ from "lodash";

const dataToFormatedData = (format, data) => {
	if (format === "columns") {
		const mapper = {};
		const columns = [];

		data.header.forEach(function(key, index){
			mapper[key] = index;
			columns.push([key]);
		});

		data.body.forEach(function(data, index){
			_.each(data, (value, key) => {
				columns[mapper[key]][index+1] = value;
			});
		});

		return columns;
	}
};

export const convertData = (data) => {
	let converted;
	if (data.columns) {
		converted = convertColumnsToData(data.columns);
	} else if (data.rows) {
		converted = convertRowsToData(data.rows);
	} else if (data.json){
		converted = convertJsonToData(data.json, {
			value: _.keys(data.json[0])
		});
	}
	return {
		header: _.keys(converted[0]),
		body: converted
	};
};



export const resetDataState = (state, newState) => {
	return deepCopy({}, newState);
};

export const removeValueToDataState = (state, newData) => {
	const newState = deepCopy({}, state);
	newState.body.splice(newData, 1);

	return newState;
};

export const removeKeyToDataState = (state, newData) => {
	const newState = deepCopy({}, state);

	newState.body.forEach((target) => {
		delete target[newData];
	});
	newState.header = _.remove(newState.header, function(name) {
		return name !== newData;
	});

	return newState;
};


export const addValueToDataTable = (state, newData) => {
	const newState = deepCopy({}, state);
	newState.body.push(newData);

	return newState;
};

export const addKeyToDataTable = (state, newData) => {
	const newState = deepCopy({}, state);

	newState.header.push(newData.name);
	newData.value.forEach((value, index) => {
		newState.body[index][newData.name] = value;
	});
	return newState;
};

export const updateDataKeyState = (state, { value, column }) => {
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

export const updateDataValueState = (state, {row, header, value}) => {
	const newState = deepCopy({}, state);
	const newValue = !isNaN(value) && value !== "" ? Number(value) : value;

	newState.body[row][header] = newValue;

	return newState;
};




export const updateCommandData = (state, lastest) => {
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



export const updateCommandCode = (state, name) => {
	const textFunc = getDefaultValue(name);
	const objFunc = stringToFunction(textFunc);
	const updated = namespaceToObject(name, objFunc);

	const original = deepCopy({}, state.original, updated);
	const text = strinifyContainsFunction(original);

	return {
		original, text
	};
};


export const resetCommandState = (updated) => {
	const original = deepCopy({}, updated);
	const text = strinifyContainsFunction(original);

	return {
		original, text
	};
};

export const updateCommandState = (state, updated) => {
	const original = deepCopy({}, state.original, updated);
	const text = strinifyContainsFunction(original);

	return {
		original, text
	};
};

export const deleteTargetCommandState = (state, namespace) => {
	const original = deepCopy({}, state.original);
	const deleteTarget = deleteTargetKey(original, namespace);
	const text = strinifyContainsFunction(deleteTarget);

	return {
		original: deepCopy({}, deleteTarget),
		text: text
	};
};

export const updateCommandByGUI = (state, name, value) => {
	const latest = namespaceToObject(name, value);
	const defaultvalue = getDefaultValue(name);

	return (value === defaultvalue) ? deleteTargetCommandState(state, name) :
		updateCommandState(state, latest);
}


export const updateGuiState = (state, updated) => {
	const newObj = changeMemberProperty(state, deepCopy({}, updated));
	return deepCopy({}, newObj);
};


export const changeDefaultGuiState = (state, keys) => {
	let newObj = {};
	_.each(keys, (name) => {
		const newValue = getDefaultValue(name);
		const obj = namespaceToObject(name, newValue);
		newObj = deepCopy(newObj, obj);
	});

	const newState = changeMemberProperty(state, deepCopy({}, newObj));
	return deepCopy({}, newState);
};


export const updateGuiActivate = (state, name) => {
	const path = `${name.replace(/\./g, ".properties.")}.attributes.activated`;
	_.update(state, path, () => {
		return true;
	});
	return deepCopy({}, state);
};



const typeValid = (types, value) => {
	if(value === undefined || value === "undefined"){
		return undefined;
	}

	if(types.indexOf("number") > -1) {
		if(isNaN(value)){
			//console.log("TODO => " + value);
			return value;
		} else {
			return value*1;
		}
	}

	if(types.indexOf("array") > -1){
		const array = JSON.parse(value+="");
		return array;
	}

	if(types.indexOf("function") > -1){
		return value;
	}

	if(types.indexOf("boolean") > -1){
		return value;
	}

	if(types.indexOf("string") > -1){
		return value;
	}

	if(types.indexOf("object") > -1){
		return value;
	}

	return value;

};

const memberFlatten = (member) => {
	let newArray = [member];
	if (member.properties) {
		_.each(member.properties, (item) => {
			if(item.properties){
				newArray = newArray.concat(memberFlatten(item));
			} else {
				const value = typeValid(item.type.names.map(type => (type.toLowerCase())), item.defaultvalue);
				newArray.push({
					type: item.type,
					defaultvalue: value,
					value: value,
					name: item.name,
					description: item.description,
					optional: item.optional,
					activated: false,
					examples: item.examples,
					docid: item.name,
				});
			}
		});
	}

	return newArray;
};



export const getValueFromDocument = (doc, namespace, targetAttribute) => {
	const path = namespace.replace(/\./g, ".properties.");
	const attirbutes = _.get(doc, path).attributes;

	return attirbutes[targetAttribute];
};

export const getRemovedToDefault = (prev, cur) => {
	const pkeys = Object.keys(objectFlatten(prev));
	const ckeys = Object.keys(objectFlatten(cur));
	const nkeys = _.difference(pkeys, ckeys);

	let newObj = {};
	_.each(nkeys, (name) => {
		const newValue = getDefaultValue(name);
		const obj = namespaceToObject(name, newValue);
		newObj = deepCopy(newObj, obj);
	});

	return newObj;
};

export const getDefaultValue = (namespace) => {
	const document = initDocument;
	const path = namespace.replace(/\./g, ".properties.");
	const attirbutes = _.get(document, path).attributes;

	return attirbutes.defaultvalue;
};

const fillDefaultAttributes = (target, root) => {
	target.attributes = target.attributes || getDefaultAttributes(root);
	if(target.properties){
		_.each(target.properties, (obj, key) => {
			target.properties[key] = fillDefaultAttributes(obj, `${root}.${key}`);
		});
	}
	return target;
};

const getDefaultAttributes = (name) => {
	return {
		description: "",
		optional: true,
		activated: false,
		name,
		value: undefined,
		defaultvalue: undefined,
		type: {
			names: ["Object"]
		},
	};
};


export const changeMemberActivate = (original, name, value) => {
	const fkeys = [name];

	_.each(fkeys, (keyPath) => {
		const targetPath = keyPath.replace(/\./g, ".properties.") + ".attributes";
		const type = _.get(original, targetPath + ".type");

		_.update(original, targetPath + ".activated", () => {
			return value;
		});
	});

	return original;
};


const typeConverting = (types, value) => {
	return value;
};

const isSameValue = (a, b) => {
	return a+"" == b+"";
};

export const changeMemberProperty = (document, latest) => {
	const flatten = objectFlatten(latest);
	const keys = Object.keys(flatten);

	_.each(keys, (keyPath) => {
		const path = `${keyPath.replace(/\./g, ".properties.")}.attributes`;
		const attributes = _.get(document, path);
		const latestValue = flatten[keyPath];
		const isUpdate = !isSameValue(latestValue, attributes.defaultvalue);

		_.update(document, `${path}.value`, () => {
			return typeConverting(attributes.type.names, latestValue);
		});

		_.update(document, `${path}.activated`, () => {
			return isUpdate;
		});
	});

	return document;

	//_.each(fkeys, (keyPath) => {
	//	const targetPath = keyPath.replace(/\./g, ".properties.") + ".attributes";
	//	const type = _.get(original, targetPath + ".type");
	//	let value = _.get(object, keyPath);
	//	let changed = _.get(original, targetPath + ".defaultvalue") !== value;
	//
	//	_.update(original, targetPath + ".activated", () => {
	//		return changed;
	//	});
	//
	//	if(type && type.names && type.names[0] && type.names[0].toLowerCase() === "number" && value !== undefined){
	//		value = value * 1;
	//	}
	//
	//	if(typeof value === "function") {
	//		value = value.toString();
	//	}
	//
	//	_.update(original, targetPath + ".value", () => {
	//		return value;
	//	});
	//});
	//return original;
};

export const deleteTargetKey = (original, targetkey) => {
	const keys = targetkey.split(".").reverse();
	let path = targetkey.replace("." + keys[0], "");
	let prevPath = path;

	_.unset(original, targetkey);

	_.each(keys.slice(1), (key) => {
		const target = _.get(original, path);
		if(target && Object.keys(target).length < 1){
			_.unset(original, path);
		}
		prevPath = path;
		path = path.replace("." + key, "");
	});

	return original;
};
export const getAttributesFromDocument = (name) => {
	const init = initDocument;
	const path = name.replace(/\./g, ".properties.") + ".attributes";
	return _.get(init, path);
};


const canOptional = (keys, name) => {
	const datas = ["data.columns", "data.rows", "data.json", "data.url"];
	if(datas.indexOf(name) < 0){
		return true;
	}
	let flag = 0;
	_.each(keys, (key) => {
		datas.indexOf(key) > -1 ? flag++ : flag;
	});

};

const dataSetConfig = ["data.columns", "data.rows", "data.json", "data.url"];
const hasOneMoreDataset = (keys) => {
	return (dataSetConfig.length - _.difference(dataSetConfig, keys).length > 1);
};

export const getChip = (keys) => {
	const collection = [];
	const hasMoreDataSet = hasOneMoreDataset(keys);

	_.each(keys, (name) => {
		const target = getAttributesFromDocument(name);
		if(dataSetConfig.indexOf(name) > -1 && !hasMoreDataSet){
			collection.push({
				name,
				optional: false
			});
		} else {
			collection.push({
				name,
				optional: target.optional === undefined ? true : target.optional,
			});
		}

	});

	return collection;
};
