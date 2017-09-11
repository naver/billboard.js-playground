import * as _ from "lodash";
import * as extractedDocument from "./document.json";
import * as presetDocument from "./preset.json";
import { deepCopy, objectFlatten } from "../util";
import { convertColumnsToData, convertRowsToData, convertJsonToData } from "./convert"

const keysFromDocument = [];

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
				});
			}
		});
	}

	return newArray;
};

const documentToObject = (defaultDocumentOption) => {
	let fullProperties = [];

	_.each(defaultDocumentOption, ({ name, type, kind, defaultvalue, description, properties, optional }) => {
		if (kind === "member") {
			if (name.indexOf(":") > -1) {
				const target = {
					type: type,
					defaultvalue: defaultvalue,
					value: defaultvalue,
					name: name.replace(/\:/g, "."),
					description: description,
					optional: optional,
					activated: false,
				};

				fullProperties = fullProperties.concat([target]);
			} else {
				const ps = memberFlatten({
					value: defaultvalue,
					defaultvalue,
					properties,
					type,
					name,
					description,
					kind,
					activated: false,
				});
				fullProperties = fullProperties.concat(ps);
			}
		}
	});

	let member = {};

	_.each(fullProperties, (p) => {
		const keys = p.name.split(".");
		let copy = {
			attributes: p
		};
		_.each(keys.reverse(), (key) => {
			const newCopy = {
				properties: {}
			};

			newCopy.properties[key] = copy;
			copy = newCopy;
		});
		member = deepCopy(member, copy);
		keysFromDocument.push(p.name);
	});

	const newObj = {};
	_.each(Object.keys(member.properties), (memberKey) => {
		let target = member.properties[memberKey];
		target.kind = "member";
		target = fillDefaultAttributes(target, memberKey);
		newObj[memberKey] = deepCopy({}, target, presetDocument[memberKey]);
	});

	return newObj;
};

export const getValueFromDocument = (doc, namespace, targetAttribute) => {
	const path = namespace.replace(/\./g, ".properties.");
	const attirbutes = _.get(doc, path).attributes;

	return attirbutes[targetAttribute];
};

export const getDefaultValue = (namespace) => {
	const path = namespace.replace(/\./g, ".properties.");
	const doc = initDocumentConfigure;
	const attirbutes = _.get(doc, path).attributes;

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


export const changeMemberProperty = (original, object) => {
	const fkeys = objectToKeys(object);

	_.each(fkeys, (keyPath) => {
		const targetPath = keyPath.replace(/\./g, ".properties.") + ".attributes";
		const type = _.get(original, targetPath + ".type");
		let value = _.get(object, keyPath);
		let changed = _.get(original, targetPath + ".defaultvalue") !== value;

		_.update(original, targetPath + ".activated", () => {
			return changed;
		});

		if(type.names[0].toLowerCase() === "number" && value !== undefined){
			value = value * 1;
		}

		if(typeof value === "function") {
			value = value.toString();
		}

		_.update(original, targetPath + ".value", () => {
			return value;
		});
	});

	return original;
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

const hasProperty = (name) => {
	const keys = name.split(".");
	let configure = initDocumentConfigure;
	let attr = {};

	_.each(keys, (key) => {
		if(configure !== undefined){
			const cof = configure[key] || {};

			attr = cof.attributes;
			configure = cof.properties;
		} else {
			attr = undefined;
		}
	});

	return !!attr;
};

const objectToKeys = (obj, root = "") => {
	const keys = _.keys(obj);
	const arr = [];

	if(keys.length > 0){
		_.each(keys, key => {
			const parent = root == "" ? key : root + "." + key;
			if(hasProperty(parent)){
				arr.push(objectToKeys(obj[key], parent));
			} else {
				arr.indexOf(root) < 0 && arr.push(root);
			}
		});
	} else {
		arr.push(root);
	}

	return _.flatten(arr);
};

export const getRemovedAttributes = (prevState, newState) => {

	const prev = objectFlatten(prevState);
	const cur = objectFlatten(newState);
	const prevKeys = _.keys(prev);

	const newKeys = _.difference(_.keys(prev), _.keys(cur));

	//const newKeys = _.filter(_.keys(cur), (key) => {
	//	const idx = prevKeys.indexOf(key);
	//	if(idx < 0) {
	//		return key
	//	}
	//});

	return newKeys;
};

export const initCommandConfigure = {
	data: {
		columns: [
			["data1", 30, 200, 100, 400, 150],
			["data2", 50, 20, 10, 40, 15],
			["data3", 50, 20, 10, 40, 15],
			["data4", 30, 200, 130, 400, 30],
			["data5", 50, 20, 10, 40, 415]
		]
	}
};


//export const initCommandConfigure = {
//	data : {
//		rows: [
//			["A", "B", "C"],
//			[90, 120, 300],
//			[40, 160, 240],
//			[50, 200, 290],
//			[120, 160, 230],
//			[80, 130, 300],
//			[90, 220, 320]
//		]
//	}
//};
//

//export const initCommandConfigure = {
//	data : {
//		json: [
//			{name: "www.site1.com", upload: 200, download: 200, total: 400},
//			{name: "www.site2.com", upload: 100, download: 300, total: 400},
//			{name: "www.site3.com", upload: 300, download: 200, total: 500},
//			{name: "www.site4.com", upload: 400, download: 100, total: 500}
//		],
//		keys: {
//			// x: "name", // it's possible to specify 'x' when category axis
//			value: ["upload", "download"]
//		}
//	}
//}

export const initDocumentConfigure = documentToObject(extractedDocument);
