import React from "react";
import {
	connect
} from "react-redux";
import {
	updateGui
} from "../../actions";

const inputCheck = ({ defaultvalue, onChange }) => {
	return (<input type="checkbox" defaultChecked={defaultvalue} onChange={onChange} />);
};

const string = defaultvalue => (<input type="text" defaultValue={defaultvalue} />);

const number = defaultvalue => (<input type="number" defaultValue={defaultvalue} />);


const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: e => {
		const name = ownProps.name.replace(/\:/g, ".");

		dispatch(updateGui(name, e.target.checked));
	},
});

const checkbox = connect(
	null, mapDispatchToProps
)(inputCheck);


export {
	checkbox,
	string,
	number,
};
