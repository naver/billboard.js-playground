import * as _ from "lodash";
import * as extractedDocument from "./document.json";
import * as presetDocument from "./preset.json";
import { deepCopy } from "../util";

const keysFromDocument = [];

const memberFlatten = (member) => {
	let newArray = [member];
	if (member.properties) {
		_.each(member.properties, (item) => {
			if(item.properties){
				newArray = newArray.concat(memberFlatten(item));
			} else {
				newArray.push({
					type: item.type,
					defaultvalue: item.defaultvalue,
					value: item.defaultvalue,
					name: item.name,
					description: item.description,
					optional: item.optional,
					activated: true,
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
					activated: true,
				};
				fullProperties = fullProperties.concat([target]);

			} else {
				const ps = memberFlatten({
					value: defaultvalue,
					activated: true,
					defaultvalue,
					properties,
					type,
					name,
					description,
					kind
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
		activated: true,
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

		if(type.names[0].toLowerCase() === "number" && value !== undefined){
			value = value * 1;
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


export const initCommandConfigure = {
	data: {
		columns: [
			["data1", 30, 200, 100, 400, 150, 250],
			["data2", 50, 20, 10, 40, 15, 25],
			["data3", 50, 20, 10, 40, 15, 25]
		]
	}
};

export const initDocumentConfigure = documentToObject(extractedDocument);