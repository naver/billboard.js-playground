import React from "react";

const checkbox = defaultvalue => (<input type="checkbox" defaultChecked={defaultvalue} />);

const string = defaultvalue => (<input type="text" defaultValue={defaultvalue} />);

const number = defaultvalue => (<input type="number" defaultValue={defaultvalue} />);

export {
	checkbox,
	string,
	number,
};
