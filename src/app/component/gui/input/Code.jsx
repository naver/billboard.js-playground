import React, { PropTypes } from "react";
import * as _ from "lodash";
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';

import { connect } from "react-redux";
import {
	updateGui, resetGui
} from "../../../actions";
import FontIcon from 'material-ui/FontIcon';
import {red600, green200, blue300, blue500, grey100, grey400, lightBlue100, lightBlue300} from 'material-ui/styles/colors';


const iconSelect = {
	fill: lightBlue300,
};

const icon = {
	fill: grey400
};

const labelSelect = {
	fontSize : "14px"
	//color: lightBlue300,
}

const label = {
	fontSize : "14px",
	color: grey400
}

class CodeInput extends React.Component {
	getRadioInput(valueoptions, name, onChange, value) {
		return (<MuiThemeProvider>
			<RadioButtonGroup name={name} defaultSelected={value} onChange={onChange}>
				{_.map(valueoptions, (v, i) => {
					return (<RadioButton
						iconStyle={
								    value === v ? iconSelect : icon
								}
						labelStyle={
									value === v ? labelSelect : label
								}
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
		const edit = <span className="">edit</span>

		returnValue = (<MuiThemeProvider muiTheme={getMuiTheme()}>
			<div style={{width:"100%", display:"inline-block"}}>
				<TextField
					underlineFocusStyle={{
						borderColor : lightBlue300
					}}
					style={{width:"80%", display:"inline-block"}}
					disabled={true}
					fullWidth={true}
					hintText={value} />
				<IconButton iconClassName="edit_function material-icons"
							tooltipPosition="top-center"
							tooltip="edit in text editor"
							style={{width:"20%", display:"inline-block", textAlign:"right"}}
							children={edit}
				/>
			</div>

		</MuiThemeProvider>);

		return returnValue;
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (e, value) => {
		if(value === ""){
			dispatch(resetGui(ownProps.name.replace(/\:/g, "."), {
				root: ownProps.rootMemberName
			}));
		} else {
			(dispatch(updateGui(ownProps.name.replace(/\:/g, "."), {
				value: value,
				root: ownProps.rootMemberName
			})));
		}
	}
});

const Code = connect(
	null, mapDispatchToProps
)(CodeInput);

export default Code;
