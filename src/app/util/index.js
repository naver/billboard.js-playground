export const namespaceToObject = (keys, lastValue, obj = {}) => {
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
