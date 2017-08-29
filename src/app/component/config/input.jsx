import React from "react";
import {
	connect
} from "react-redux";
import {
	changeCheckbox
} from "../../actions";

const inputCheck = ({ defaultvalue, onChange }) => {
	return (<input type="checkbox" defaultChecked={defaultvalue} onChange={onChange} />);
};

const string = defaultvalue => (<input type="text" defaultValue={defaultvalue} />);

const number = defaultvalue => (<input type="number" defaultValue={defaultvalue} />);


const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: () => {
		dispatch(changeCheckbox(ownProps.name));
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
