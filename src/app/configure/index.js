import * as rawDocument from "./resources/document";
import * as presetDocument from "./resources/preset";
import { deepCopy, typeValid } from "../util";
import * as template from "./resources/template";
const keysFromDocument = [];

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

const fillDefaultAttributes = (target, root) => {
	target.attributes = target.attributes || getDefaultAttributes(root);
	if(target.properties){
		_.each(target.properties, (obj, key) => {
			target.properties[key] = fillDefaultAttributes(obj, `${root}.${key}`);
		});
	}
	return target;
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


const documentToObject = (defaultDocumentOption) => {
	let fullProperties = [];

	_.each(defaultDocumentOption, ({ id, examples, name, type, kind, defaultvalue, description, properties, optional }) => {
		if (kind === "member") {
			if (name.indexOf(":") > -1) {
				const target = {
					type: type,
					defaultvalue: defaultvalue,
					value: defaultvalue,
					docid: name,
					name: name.replace(/\:/g, "."),
					description: description,
					optional: optional,
					activated: false,
					examples,
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
					examples,
					docid: name,
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

const getFormattedDocument = () => {
	return documentToObject(rawDocument);
};

const formattedDocument = getFormattedDocument();
const initConfigure = template.line1;

export {
	rawDocument as documentFromJSDoc,
	presetDocument as formattedCustomDocumnet,
	formattedDocument,
	initConfigure
};
