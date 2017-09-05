import {
	each as ldEach,
	keys as ldKeys,
	filter as ldFilter,
} from "lodash";
import * as _ from "lodash";
import * as extractedDocument from "./document.json";
import { namespaceToObject, deepCopy } from "../util";

const defaultAttributes = ["type", "name", "defaultvalue", "description"];

/*

from
{
	a : {
		b : "value1",
		c : "value2"
	}
}
to
{
	a : {
		name : "a",
		type : ["Object"],
		defaultValue : undefined,
		properties : [{
			name : "b",
			defaultValue : "value1",
			type : {
				names : ["String"]
			}
		}, {
			 name : "c",
			 defaultValue : "value2",
			 type : {
				 names : ["String"]
		 	 }
	 	}]
	}
}
*/
export const objectToPropertyStructure = (obj, prefix) => {
	const properties = [];

	ldEach(obj, (data, key) => {
		const keys = ldKeys(data);
		const unmergedKeys = ldFilter(keys, structure => defaultAttributes.indexOf(structure) < 0);

		if (unmergedKeys.length > 0) {
			const unmergedProperties = {};
			const fullName = `${prefix}.${key}`;
			ldEach(unmergedKeys, propertyKey => (unmergedProperties[propertyKey] = data[propertyKey]));

			const property = objectToPropertyStructure(unmergedProperties, fullName);
			properties.push(property);
		} else {
			properties.push(data);
		}
	});

	return {
		properties,
		defaultValue: "undefined",
		type: {
			names: ["Object"]
		},
		name: prefix
	};
};

const memberFlatten = (member) => {
	let newArray = [member];
	if(member.properties){
		ldEach(member.properties, (item) => {
			if(item.properties){
				newArray = newArray.concat(memberFlatten(item));
			} else {
				newArray.push(item);
			}
		});
	}


	return newArray;
};

/*
 billboard.js API 문서에서 추출한 json 파일을 내부 구조에 맞춰 변경한다
 name => AAA.bbb
 description => hello world
 optional => true / false
 type { names : ["Number"] }
 */
export const documentToObject = (defaultDocumentOption) => {
	let fullProperties = [];

	ldEach(defaultDocumentOption, ({ name, type, kind, defaultvalue, description, properties }) => {
		if (kind === "member") {
			if (name.indexOf(":") > -1) {
				const target = {
					defaultvalue,
					name: name.replace(/\:/g, "."),
					type,
					description
				};
				fullProperties = fullProperties.concat([target]);
			} else {
				const ps = memberFlatten({
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

	ldEach(fullProperties, (p) => {
		const keys = p.name.split(".");
		let copy = {
			attributes: p
		};
		ldEach(keys.reverse(), (key) => {
			const newCopy = {
				properties: {}
			};

			newCopy.properties[key] = copy;
			copy = newCopy;
		});
		member = deepCopy(member, copy);
	});

	const newObj = {};
	ldEach(Object.keys(member.properties), (memberKey) => {
		let target = member.properties[memberKey];
		target.kind = "member";
		target = fillDefaultAttributes(target, memberKey);
		newObj[memberKey] = target;
	});

	return newObj;
};

const fillDefaultAttributes = (target, root) => {
	target.attributes = target.attributes || getDefaultAttributes(root);
	if(target.properties){
		ldEach(target.properties, (obj, key) => {
			target.properties[key] = fillDefaultAttributes(obj, `${root}.${key}`);
		});
	}
	return target;
};

const getDefaultAttributes = (name) => {
	return {
		name,
		defaultvalue: undefined,
		type: {
			names: ["Object"]
		}
	};
};

export const changeMemberProperty = (original, object) => {
	object.data && (delete object.data);
	const fkeys = objectToKeys(object);

	ldEach(fkeys, (keyPath) => {
		const value = _.get(object, keyPath);
		const targetPath = keyPath.replace(/\./g, ".properties.") + ".attributes.defaultvalue";
		_.update(original, targetPath, () => {
			return value;
		});
	});

	return original;
};
const getKey = (obj) =>{
	return _.keys(obj)[0];
};


export const initCommandConfigure = {
	data: {
		columns: [
			["data1", 30, 200, 100, 400, 150, 250],
			["data2", 50, 20, 10, 40, 15, 25],
			["data3", 50, 20, 10, 40, 15, 25]
		]
	},
};


const flattenKey = (object, root) => {
	const key = getKey(object);
	const newTarget = object[key];

	if(typeof newTarget == "object"){
		return flattenKey(newTarget, root + "." + key);
	} else {
		return root + "." + key;
	}
};

const objectToKeys = (obj, root = "") => {
	const keys = _.keys(obj);
	const arr = [];

	if(keys.length > 0){
		ldEach(keys, key => {
			arr.push(objectToKeys(obj[key], root == "" ? key : root + "." + key));
		});
	} else {
		arr.push(root);
	}

	return _.flatten(arr);
};

export const initDocumentConfigure = documentToObject(extractedDocument);
