import React, { PropTypes } from "react";
import { connect } from "react-redux";
import {
	updateGui
} from "../../../actions";

class InputNumber extends React.Component {
	render() {
		const { defaultvalue, onChange } = this.props;
		let returnValue;

		if (isNaN(defaultvalue)) {
			returnValue = (<input type="number" placeholder="undefined" onChange={onChange} />);
		} else {
			returnValue = (<input type="number" defaultValue={defaultvalue} onChange={onChange} />);
		}
		return returnValue;
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: e => (dispatch(updateGui(ownProps.name.replace(/\:/g, "."), e.target.value)))
});

const Number = connect(
	null, mapDispatchToProps
)(InputNumber);

export default Number;
