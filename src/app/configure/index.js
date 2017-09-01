import * as defaultDocumentOption from "./document.json";
import { namespaceToObject, deepCopy } from "../util";

export const basicStructureKey = ["type", "name", "defaultvalue", "description"];

export const documentToObject = () => {
	let obj = {};
	let copy = {};
	_.map(defaultDocumentOption).forEach((e) => {
		if(e.kind === "member"){
			if(e.name.indexOf(":") > -1){
				const keys = e.name.split(":");
				const target = namespaceToObject(keys.slice(0), {
					type: e.type,
					name: keys.join("."),
					defaultvalue : e.defaultvalue,
					description: e.description
				});

				copy = deepCopy(copy, target);
			} else {
				obj[e.name] = e;
			}
		}
	});

	_.each(copy, (target, key) => {
		obj[key] = objectToProperty(target, key);
		obj[key].kind = "member";
	});

	return obj;
};

export const objectToProperty = (obj, prefix) => {
	const properties = [];
	_.each(obj , (data, key) => {
		const keys = _.keys(data);
		const filtered = _.filter(keys, structure => {
			return basicStructureKey.indexOf(structure) < 0;
		});

		if(filtered.length > 0){
			const child = {};
			const full = (prefix + "." + key);

			_.each(filtered, (prpk) => {
				child[prpk] = data[prpk];
			});
			const props = objectToProperty(child, full);
			properties.push(props);

		} else {
			properties.push(data);
		}
	});

	return {
		properties,
		defaultvalue: "undefined",
		type: {
			names: ["Object"]
		},
		name: prefix,
	};
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

export const initDocumentConfigure = documentToObject();


/*
	name => AAA.bbb
	description => hello world
	optional => true / false
	type { names : ["Number"] }
*/
