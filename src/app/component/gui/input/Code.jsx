import React, { PropTypes } from "react";
import * as _ from "lodash";
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';

import { connect } from "react-redux";
import {
	updateGui, resetGui, updateCodeInput
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
	render() {
		const { value } = this.props;

		return <MuiThemeProvider muiTheme={getMuiTheme()}>
			<div style={{width:"100%", display:"inline-block"}}>
				<TextField
					name={this.props.name}
					underlineFocusStyle={{
						borderColor : lightBlue300
					}}
					style={{width:"80%", display:"inline-block"}}
					disabled={true}
					fullWidth={true}
					hintText={value} />
				<IconButton
					onClick={this.props.onClickCodeEdit}
					iconClassName="edit_function material-icons"
					tooltipPosition="top-center"
					tooltip="edit in text editor"
					style={{width:"20%", display:"inline-block", textAlign:"right"}}
					children={<span className="">edit</span>}
				/>
			</div>

		</MuiThemeProvider>;
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onClickCodeEdit: (e, value) => {
		dispatch(updateCodeInput(ownProps.name.replace(/\:/g, "."), {
			value: ownProps.defaultvalue,
			root: ownProps.rootMemberName || ownProps.name
		}));
	}
});

const ConnectedCode = connect(
	null, mapDispatchToProps
)(CodeInput);

export default ConnectedCode;
