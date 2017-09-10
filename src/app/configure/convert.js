const isUndefined = v => typeof v === "undefined";
const findValueInJson = (object, path) => {
	if (object[path] !== undefined) {
		return object[path];
	}

	const convertedPath = path.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties (replace [] with .)
	const pathArray = convertedPath.replace(/^\./, "").split("."); // strip a leading dot
	let target = object;

	for (const k of pathArray) {
		if (k in target) {
			target = target[k];
		} else {
			target = undefined;
			break;
		}
	}
	return target;
};


export const convertColumnsToData = (columns) => {
	const newRows = [];
	let i;
	let j;
	let key;

	for (i = 0; i < columns.length; i++) {
		key = columns[i][0];
		for (j = 1; j < columns[i].length; j++) {
			if (isUndefined(newRows[j - 1])) {
				newRows[j - 1] = {};
			}
			if (isUndefined(columns[i][j])) {
				throw new Error(`Source data is missing a component at (${i}, ${j})!`);
			}
			newRows[j - 1][key] = columns[i][j];
		}
	}
	return newRows;
}

export const convertJsonToData = (json, keys) => {
	const newRows = [];
	let targetKeys;
	let data;

	if (keys) { // when keys specified, json would be an array that includes objects
		if (keys.x) {
			targetKeys = keys.value.concat(keys.x);
			this.config.data_x = keys.x;
		} else {
			targetKeys = keys.value;
		}
		newRows.push(targetKeys);

		json.forEach(o => {
			const newRow = [];
			let v;

			for (const key of targetKeys) {
				// convert undefined to null because undefined data will be removed in convertDataToTargets()
				v = findValueInJson(o, key);
				if (isUndefined(v)) {
					v = null;
				}
				newRow.push(v);
			}
			newRows.push(newRow);
		});
		data = convertRowsToData(newRows);
	} else {
		Object.keys(json).forEach(key => {
			const tmp = json[key].concat();

			tmp.unshift(key);
			newRows.push(tmp);
		});
		data = convertColumnsToData(newRows);
	}
	return data;
};

export const convertRowsToData = (rows) => {
	const keys = rows[0];
	const newRows = [];
	let newRow = {};
	let i;
	let j;

	for (i = 1; i < rows.length; i++) {
		newRow = {};
		for (j = 0; j < rows[i].length; j++) {
			if (isUndefined(rows[i][j])) {
				throw new Error(`Source data is missing a component at (${i}, ${j})!`);
			}
			newRow[keys[j]] = rows[i][j];
		}
		newRows.push(newRow);
	}

	return newRows;
}