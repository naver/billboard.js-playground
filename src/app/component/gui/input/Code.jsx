import React, { PropTypes } from "react";
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';

import { connect } from "react-redux";
import {
	updateCodeInput
} from "../../../actions";
import {grey900, grey400, lightBlue300, grey800} from 'material-ui/styles/colors';

class CodeInput extends React.Component {
	render() {
		let { value } = this.props;
		value += "";

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
					hintStyle={{
						color: this.props.activated ? grey900 : grey400
					}}
					hintText={value} />
				<IconButton
					onClick={this.props.onClickCodeEdit}
					iconClassName="material-icons edit_code_property"
					tooltipPosition="top-center"
					tooltip="edit in text editor"
					iconStyle={{ color: grey800 }}
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
			root: ownProps.rootMemberName || ownProps.name
		}));
	}
});

const ConnectedCode = connect(
	null, mapDispatchToProps
)(CodeInput);

export default ConnectedCode;
