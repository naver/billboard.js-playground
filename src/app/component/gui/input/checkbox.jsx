import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Toggle from 'material-ui/Toggle';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import  * as color from 'material-ui/styles/colors';

import {
	updateGui
} from "../../../actions";

const styles = {
	block: {
		maxWidth: 250,
	},
	toggle: {
		marginBottom: 16,
	},
	thumbOff: {
		backgroundColor: '#ffcccc',
	},
	trackOff: {
		backgroundColor: '#ff9d9d',
	},
	thumbSwitched: {
		backgroundColor: color.lightBlue100,
	},
	trackSwitched: {
		backgroundColor: color.lightBlue300,
	},
	labelStyle: {
		color: 'red',
	},
};

class InputCheckbox extends React.Component {
	render() {
		const checked = this.props.value ? true : false;
		const labelStyle = this.props.value === this.props.defaultvalue ? {
			//color : color.grey400,
			"font-size" : "14px"
		} : {
			//color : color.grey900,
			"font-size" : "14px"
		}

		return (<MuiThemeProvider muiTheme={getMuiTheme()}>
			<div>
				<span style={{display: "inline-block"}}>
					<Toggle
						label={checked ? "true" : "false"}
						labelStyle={labelStyle}
						labelPosition="right"
						toggled={checked}
						onToggle={this.props.onChange}
						thumbSwitchedStyle={styles.thumbSwitched}
						trackSwitchedStyle={styles.trackSwitched}
					/>
				</span>
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
