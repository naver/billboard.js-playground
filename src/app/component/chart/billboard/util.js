// http://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
const deepCopy = (target, ...sources) => {
	const isObject = (item) =>{
		return (item && typeof item === 'object' && !Array.isArray(item));
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

const UTIL = {
	deepCopy: deepCopy
};

export {
	deepCopy
};
export default UTIL;