import React, { PropTypes } from "react";
import { connect } from "react-redux";
import theme from "../../../../style/app.css";
import { Checkbox as MDCheckbox } from "react-toolbox/lib/checkbox";
import {
	updateGui
} from "../../../actions";


class InputCheckbox extends React.Component {
	render() {
		const checked = this.props.value ? true : false;

		return (<MDCheckbox
			className="react-toolbox_checkbox"
			theme={theme}
			checked={checked}
			onChange={this.props.onChange}
		/>);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (checked) => {
		dispatch(updateGui(ownProps.name.replace(/\:/g, "."), checked));
	}
});

const Checkbox = connect(
	null, mapDispatchToProps
)(InputCheckbox);

export default Checkbox;
