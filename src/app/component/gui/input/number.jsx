import React, { PropTypes } from "react";
import { connect } from "react-redux";
import {
	updateGui
} from "../../../actions";

class InputNumber extends React.Component {
	render() {
		const { value, onChange } = this.props;
		let returnValue;

		if (isNaN(value)) {
			returnValue = (<input type="number" placeholder="undefined" onChange={onChange} />);
		} else {
			returnValue = (<input type="number" defaultValue={value} onChange={onChange} />);
		}
		return returnValue;
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: e => (dispatch(updateGui(ownProps.name.replace(/\:/g, "."), e.target.value*1)))
});

const Number = connect(
	null, mapDispatchToProps
)(InputNumber);

export default Number;
