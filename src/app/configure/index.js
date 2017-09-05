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
				newArray.push(item);
			}
		});
	}

	return newArray;
};

const documentToObject = (defaultDocumentOption) => {
	let fullProperties = [];

	_.each(defaultDocumentOption, ({ name, type, kind, defaultvalue, description, properties }) => {
		if (kind === "member") {
			if (name.indexOf(":") > -1) {
				const target = {
					value: defaultvalue,
					name: name.replace(/\:/g, "."),
					defaultvalue,
					type,
					description
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
		name,
		value: undefined,
		defaultvalue: undefined,
		type: {
			names: ["Object"]
		}
	};
};

export const changeMemberProperty = (original, object) => {
	const fkeys = objectToKeys(object);

	_.each(fkeys, (keyPath) => {
		const targetPath = keyPath.replace(/\./g, ".properties.") + ".attributes";
		const type = _.get(original, targetPath + ".type");
		let value = _.get(object, keyPath);

		if(type.names[0].toLowerCase() === "number"){
			value = value * 1;
		}

		_.update(original, targetPath + ".value", () => {
			return value;
		});
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
