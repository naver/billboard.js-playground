import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Toggle from 'material-ui/Toggle';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
	updateGui
} from "../../../actions";


class InputCheckbox extends React.Component {
	render() {
		const checked = this.props.value ? true : false;

		return (<MuiThemeProvider muiTheme={getMuiTheme()}>
			<div>
				<Toggle
					toggled={checked}
					onToggle={this.props.onChange}
				/>
			</div>
		</MuiThemeProvider>);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (e,  checked) => {
		dispatch(updateGui(ownProps.name.replace(/\:/g, "."), checked));
	}
});

const FilteredCheckbox = connect(
	null, mapDispatchToProps
)(InputCheckbox);

export default FilteredCheckbox;
