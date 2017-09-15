export const namespaceToObject = (ns, lastValue, obj = {}) => {
	const keys = ns.split(".");
	obj[keys.pop()] = lastValue;

	keys.reverse().forEach(key => {
		const newObj = {};
		newObj[key] = obj;
		obj = newObj;
	});

	return obj;
};

export const deepCopy = (target, ...sources) => {
	const isObject = (item) =>{
		return (item && typeof item === "object" && !Array.isArray(item));
	};

	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				deepCopy(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}

	return deepCopy(target, ...sources);
};

export const stringToFunction = (str) =>{
	let code = str;
	eval(`code = ${code}`);
	return code;
}

export const objectFlatten = (obj) => {
	var flattenObject = function(ob) {
		var toReturn = {};

		for (var i in ob) {
			if (!ob.hasOwnProperty(i)) continue;

			if ((typeof ob[i]) == 'object' && !Array.isArray(ob[i])) {
				var flatObject = flattenObject(ob[i]);
				for (var x in flatObject) {
					if (!flatObject.hasOwnProperty(x)) continue;

					toReturn[i + '.' + x] = flatObject[x];
				}
			} else {
				toReturn[i] = ob[i];
			}
		}
		return toReturn;
	};


	return flattenObject(obj);
};


export const hasProperty = (name) => {
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


export const objectToKeys = (obj, root = "") => {
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


export const strinifyContainsFunction = (obj) => {
	function replacer(key, value) {
		if(typeof value == "function"){
			return `___codestart${value}codeend___`;
		}
		return value;
	}
	var text = JSON.stringify(obj, replacer);
	text = text.replace(/\"\_\_\_codestart/g, "").replace(/codeend\_\_\_\"/g, "");

	return text;
}


export const typeValid = (types, value) => {
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