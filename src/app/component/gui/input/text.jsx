import React, { PropTypes } from "react";
import * as _ from "lodash";
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { connect } from "react-redux";
import {
	updateGui, resetGui
} from "../../../actions";
import FontIcon from 'material-ui/FontIcon';
import {blue500, red600, greenA200} from 'material-ui/styles/colors';

class InputText extends React.Component {
	getRadioInput(valueoptions, name, onChange, value) {
		return (<MuiThemeProvider>
					<RadioButtonGroup name={name} defaultSelected={value} onChange={onChange}>
						{_.map(valueoptions, (v, i) => {
							return (<RadioButton
								key={i}
								value={v}
								label={v}
							/>);
						})}
				</RadioButtonGroup>
		</MuiThemeProvider>);
	}

	render() {
		const { value, onChange, valueoptions , name } = this.props;
		let returnValue;

		if (valueoptions) {
			returnValue = this.getRadioInput(valueoptions, name, onChange, value);
		} else {
			if (value === undefined || value  === "undefined") {
				// <input type="text" placeholder="undefined" onChange={onChange} />
				returnValue = (<MuiThemeProvider muiTheme={getMuiTheme()}>
					<TextField
						style={{width:"100%", display:"inline-block"}}
						fullWidth={true}
						hintText="undefined" />
				</MuiThemeProvider>);
			} else {
				returnValue = (<MuiThemeProvider muiTheme={getMuiTheme()}>
					<TextField
						style={{width:"100%", display:"inline-block"}}
						fullWidth={true}
						hintText={value} />
				</MuiThemeProvider>);
			}
		}

		return returnValue;
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (e, value) => {
		if(value === ""){
			dispatch(resetGui(ownProps.name.replace(/\:/g, ".")));
		} else {
			(dispatch(updateGui(ownProps.name.replace(/\:/g, "."), value)));
		}
	}
});

const Text = connect(
	null, mapDispatchToProps
)(InputText);

export default Text;
