import React, { PropTypes } from "react";
import { connect } from "react-redux";
import {
	updateGui
} from "../../../actions";

class InputCheckbox extends React.Component {
	render() {
		const { value, onChange } = this.props;
		let returnValue;

		if (value) {
			returnValue = (<input type="checkbox" checked onChange={onChange} />);
		} else {
			returnValue = (<input type="checkbox" onChange={onChange} />);
		}

		return returnValue;
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: e => (dispatch(updateGui(ownProps.name.replace(/\:/g, "."), e.target.checked)))
});

const Checkbox = connect(
	null, mapDispatchToProps
)(InputCheckbox);

export default Checkbox;
